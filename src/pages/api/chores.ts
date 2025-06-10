import prisma from '../../infrastructure/repositories/PrismaChoreRepository'; // keep for potential fallback
import type { NextApiRequest, NextApiResponse } from 'next';
import { tracer } from '../../utils/otel';
import logger from '../../utils/logger';
import { createChoreUC, getChoresByFamilyUC } from '../../infrastructure/di';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const span = tracer.startSpan('API Request: Chores');
  try {
    if (req.method === 'POST') {
      const { name, description, dueDate, memberId, value, familyId, schedule } = req.body;

      if (!name || !dueDate || !familyId) {
        res.status(400).json({ error: 'Missing required fields: name, dueDate, or familyId' });
        return;
      }

      try {
        const chore = await createChoreUC.execute({
          familyId: String(familyId),
          name,
          description,
          dueDate: new Date(dueDate),
          schedule: schedule || 'one-time',
          value: value || 0,
        });
        res.status(201).json({
          id: chore.id,
          name: chore.name,
          description: chore.description,
          dueDate: chore.dueDate,
          schedule: chore.schedule,
          value: chore.value,
        });
      } catch (error) {
        logger.error(`Error creating chore: ${error.message}`, { error });
        res.status(500).json({ error: 'Failed to create chore', details: error.message });
      }
    } else if (req.method === 'GET') {
      try {
        const chores = await getChoresByFamilyUC.execute(String(req.query.familyId));
        res.status(200).json(chores.map(ch => ({
          id: ch.id,
          name: ch.name,
          description: ch.description,
          dueDate: ch.dueDate,
          schedule: ch.schedule,
          value: ch.value,
        })));
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
        await prisma.chore.delete({ where: { id } });
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
