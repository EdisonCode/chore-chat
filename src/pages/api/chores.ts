import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { tracer } from '../../utils/otel';
import logger from '../../utils/logger';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const span = tracer.startSpan('API Request: Chores');
  try {
    if (req.method === 'POST') {
      const { name, description, dueDate, memberId, value } = req.body;

      if (!name || !dueDate || !req.body.familyId) {
        res.status(400).json({ error: 'Missing required fields: name, dueDate, or familyId' });
        return;
      }

      try {
        console.log('Data for chore creation:', {
          name,
          description,
          dueDate: new Date(dueDate),
          schedule: req.body.schedule || '',
          value: value || 0,
          members: req.body.memberIds?.map((id) => ({ id })) || [],
          family: { connect: { id: req.body.familyId } },
        });

        const newChore = await prisma.chore.create({
          data: {
            name,
            description,
            dueDate: new Date(dueDate),
            schedule: req.body.schedule || '',
            value: value || 0,
            members: {
              connect: req.body.memberIds?.map((id) => ({ id })) || [],
            },
            family: { connect: { id: req.body.familyId } },
          },
        });
        res.status(201).json(newChore);
      } catch (error) {
        console.error('Error creating chore:', error);
        res.status(500).json({ error: 'Failed to create chore', details: error.message });
      }
    } else if (req.method === 'GET') {
      try {
        const chores = await prisma.chore.findMany({
          where: { familyId: Number(req.query.familyId) },
        });
        res.status(200).json(chores);
      } catch (error) {
        logger.error(`Error fetching chores: ${error.message}`, { error });
        res.status(500).json({ error: 'Failed to fetch chores' });
      }
    } else if (req.method === 'PUT') {
      const { id, name, description, dueDate, memberId, value, completed } = req.body;
      try {
        const updatedChore = await prisma.chore.update({
          where: { id },
          data: {
            name,
            description,
            dueDate: new Date(dueDate),
            value,
            completed,
          },
        });

        if (completed) {
          await prisma.member.update({
            where: { id: memberId },
            data: {
              earnedAmount: {
                increment: value,
              },
            },
          });
        }

        res.status(200).json(updatedChore);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update chore' });
      }
    } else if (req.method === 'DELETE') {
      const { id } = req.body;
      try {
        await prisma.chore.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete chore' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
    span.end();
  } catch (error) {
    span.recordException(error);
    span.end();
    throw error;
  }
}
