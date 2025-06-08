import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';
import '../../utils/otel';
import { tracer } from '../../utils/otel';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const span = tracer.startSpan('API Request: Family');
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  try {
    if (req.method === 'POST') {
      const { name, members, chores } = req.body;
      try {
        logger.info(`Family members during creation: ${JSON.stringify(members)}`);
        const newFamily = await prisma.family.create({
          data: {
            name,
            shortCode: undefined, // Ensure Prisma auto-generates this field
            members: {
              create: members.map((member) => ({
                name: member.name,
                role: member.role,
                phone: member.phone,
              })),
            },
          },
        });
        logger.info(`Family created: ${JSON.stringify(newFamily)}`);
        res.status(201).json(newFamily);
      } catch (error) {
        logger.error(`Error creating family: ${error.message}`, { error });
        res.status(500).json({ error: 'Failed to create family' });
      }
    } else if (req.method === 'GET') {
      const { familyId, type, memberId } = req.query;
      
      if (type === 'balances') {
        try {
          logger.info(`Fetching balances for familyId: ${familyId}`);
          const members = await prisma.member.findMany({
            where: { familyId: Number(familyId) },
            include: {
              transactions: true,
            },
          });

          logger.info(`Found ${members.length} members for family ${familyId}`);
          
          const balances = members.map((member) => {
            const transactionTotal = member.transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
            const totalBalance = member.choreBank + transactionTotal;
            logger.info(`Member ${member.name} has choreBank: ${member.choreBank}, transactions total: ${transactionTotal}, final balance: ${totalBalance}`);
            return {
              memberId: member.id,
              name: member.name,
              balance: totalBalance,
            };
          });

          logger.info(`Returning balances: ${JSON.stringify(balances)}`);
          res.status(200).json(balances);
          return; // Explicit return to prevent fallthrough
        } catch (error) {
          logger.error(`Error fetching balances: ${error.message}`, { error });
          res.status(500).json({ error: 'Failed to fetch balances' });
          return;
        }
      } else if (type === 'member-transactions') {
        try {
          const transactions = await prisma.choreBankTransaction.findMany({
            where: { memberId: Number(memberId) },
            orderBy: { createdAt: 'desc' },
          });

          res.status(200).json(transactions);
          return; // Explicit return to prevent fallthrough
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch member transactions' });
          return;
        }
      } else {
        // Default GET - fetch family with members
        try {
          const family = await prisma.family.findUnique({
            where: { id: Number(familyId) },
            include: {
              members: {
                include: {
                  chores: true,
                },
              },
            },
          });
          
          if (!family) {
            logger.warn(`Family not found with id: ${familyId}`);
            res.status(404).json({ error: 'Family not found' });
            return;
          }
          
          logger.info(`Family fetched: ${JSON.stringify(family)}`);
          logger.info(`Family members during fetch: ${JSON.stringify(family.members)}`);
          res.status(200).json(family);
        } catch (error) {
          logger.error(`Error fetching families: ${error.message}`);
          res.status(500).json({ error: 'Failed to fetch families' });
        }
      }
    } else if (req.method === 'PUT') {
      const { memberId, recurringExpenses, familyId, newMember } = req.body;
      
      if (familyId && newMember) {
        // Adding a new member to family
        try {
          logger.info(`Adding member to familyId: ${familyId}, newMember: ${newMember}`);
          const updatedFamily = await prisma.family.update({
            where: { id: Number(familyId) },
            data: {
              members: {
                create: {
                  name: newMember,
                  role: 'member', // Default role
                  phone: '', // Default phone
                },
              },
            },
            include: {
              members: true,
            },
          });
          res.status(200).json(updatedFamily);
        } catch (error) {
          logger.error(`Error adding member: ${error.message}`, { error });
          res.status(500).json({ error: 'Failed to add member' });
        }
      } else if (memberId && typeof recurringExpenses !== 'undefined') {
        // Updating recurring expenses for a member
        try {
          const updatedMember = await prisma.member.update({
            where: { id: memberId },
            data: {
              recurringExpenses,
            },
          });
          res.status(200).json(updatedMember);
        } catch (error) {
          res.status(500).json({ error: 'Failed to update recurring expenses' });
        }
      } else {
        res.status(400).json({ error: 'Invalid PUT request parameters' });
      }
    } else if (req.method === 'POST' && req.body.type === 'transaction') {
      const { memberId, amount, description } = req.body;
      try {
        const transaction = await prisma.choreBankTransaction.create({
          data: {
            member: { connect: { id: memberId } },
            amount,
            description,
            startDate: new Date(), // Provide a default startDate
            interval: 'one-time',  // Provide a default interval
          },
        });

        await prisma.member.update({
          where: { id: memberId },
          data: {
            choreBank: {
              increment: amount,
            },
          },
        });

        res.status(201).json(transaction);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
      }
    } else if (req.method === 'GET' && req.query.type === 'transactions') {
      const { memberId } = req.query;
      try {
        const transactions = await prisma.choreBankTransaction.findMany({
          where: { memberId: Number(memberId) },
          orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(transactions);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
      }
    } else if (req.method === 'POST' && req.body.type === 'recurring-expenses') {
      const { memberId } = req.body;
      try {
        const member = await prisma.member.findUnique({
          where: { id: memberId },
          select: { recurringExpenses: true },
        });

        if (!member) {
          res.status(404).json({ error: 'Member not found' });
          return;
        }

        const deductionAmount = member.recurringExpenses || 0;

        if (deductionAmount > 0) {
          const transaction = await prisma.choreBankTransaction.create({
            data: {
              member: { connect: { id: memberId } },
              amount: -deductionAmount,
              description: 'Monthly recurring expenses',
              startDate: new Date(), // Default to current date for recurring expenses
              interval: 'monthly', // Default interval for recurring expenses
            },
          });

          await prisma.member.update({
            where: { id: memberId },
            data: {
              choreBank: {
                decrement: deductionAmount,
              },
            },
          });

          res.status(201).json(transaction);
        } else {
          res.status(400).json({ error: 'No recurring expenses to deduct' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to process recurring expenses' });
      }
    } else if (req.method === 'POST' && req.body.type === 'one-time-entry') {
      const { memberId, amount, description } = req.body;
      try {
        const transaction = await prisma.choreBankTransaction.create({
          data: {
            member: { connect: { id: memberId } },
            amount,
            description,
            startDate: new Date(), // Default to current date
            interval: 'one-time', // Default interval for one-time transactions
          },
        });

        await prisma.member.update({
          where: { id: memberId },
          data: {
            choreBank: {
              increment: amount,
            },
          },
        });

        res.status(201).json(transaction);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create one-time entry' });
      }
    } else if (req.method === 'POST' && req.body.type === 'recurring-transaction') {
      const { memberId, amount, description, startDate, interval } = req.body;
      try {
        const start = new Date(startDate);
        const now = new Date();
        const transactions: Array<{ memberId: number; amount: number; description: string; startDate: Date; interval: string; createdAt: Date }> = [];

        let currentDate = start;
        while (currentDate <= now) {
          transactions.push({
            memberId: Number(memberId),
            amount: Number(amount),
            description,
            startDate: start,
            interval,
            createdAt: currentDate,
          });

          if (interval === 'daily') {
            currentDate.setDate(currentDate.getDate() + 1);
          } else if (interval === 'weekly') {
            currentDate.setDate(currentDate.getDate() + 7);
          } else if (interval === 'monthly') {
            currentDate.setMonth(currentDate.getMonth() + 1);
          }
        }

        for (const transaction of transactions) {
          await prisma.choreBankTransaction.create({
            data: {
              member: { connect: { id: transaction.memberId } },
              amount: transaction.amount,
              description: transaction.description,
              startDate: transaction.startDate,
              interval: transaction.interval,
              createdAt: transaction.createdAt,
            },
          });
        }

        const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
        await prisma.member.update({
          where: { id: Number(memberId) },
          data: {
            choreBank: {
              increment: totalAmount,
            },
          },
        });

        res.status(201).json({ message: 'Recurring transaction created successfully', transactions });
      } catch (error) {
        res.status(500).json({ error: 'Failed to create recurring transaction' });
      }
    } else if (req.method === 'DELETE') {
      const { familyId, memberId } = req.body;
      try {
        logger.info(`Removing member ${memberId} from familyId: ${familyId}`);
        
        // First delete the member
        await prisma.member.delete({
          where: { id: Number(memberId) },
        });
        
        // Then fetch and return the updated family
        const updatedFamily = await prisma.family.findUnique({
          where: { id: Number(familyId) },
          include: {
            members: true,
          },
        });
        
        res.status(200).json(updatedFamily);
      } catch (error) {
        logger.error(`Error removing member: ${error.message}`, { error });
        res.status(500).json({ error: 'Failed to remove member' });
      }
    } else {
      logger.warn(`Method not allowed: ${req.method}`);
      res.status(405).json({ message: 'Method Not Allowed' });
    }
    span.end();
  } catch (error) {
    span.recordException(error);
    span.end();
    throw error;
  }
}