// Infrastructure: Prisma-based ChoreRepository implementation
import { ChoreRepository } from '../../domain/interfaces/ChoreRepository';
import { Chore, ChoreProps } from '../../domain/value-objects/Chore';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

export class PrismaChoreRepository implements ChoreRepository {
  async findByFamily(familyId: string): Promise<Chore[]> {
    const records = await prisma.chore.findMany({ where: { familyId: parseInt(familyId) } });
    return records.map(r => new Chore({
      id: r.id.toString(),
      name: r.name,
      description: r.description ?? undefined,
      dueDate: r.dueDate,
      schedule: r.schedule as any,
      value: r.value
    }));
  }

  async save(chore: Chore): Promise<void> {
    const props: ChoreProps = {
      id: chore.id,
      name: chore.name,
      description: chore.description,
      dueDate: chore.dueDate,
      schedule: chore.schedule,
      value: chore.value
    };
    // TODO: pass actual familyId here
    await prisma.chore.create({ data: {
      id: parseInt(props.id),
      name: props.name,
      description: props.description,
      dueDate: props.dueDate,
      schedule: props.schedule,
      value: props.value,
      familyId: 0
    } });
  }

  async delete(choreId: string): Promise<void> {
    await prisma.chore.delete({ where: { id: parseInt(choreId) } });
  }
}
