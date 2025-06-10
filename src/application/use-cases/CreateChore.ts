// Use Case: Create a new chore
import { Chore } from '../../domain/value-objects/Chore';
import { ChoreRepository } from '../../domain/interfaces/ChoreRepository';

export class CreateChore {
  constructor(private repo: ChoreRepository) {}

  async execute(input: {
    familyId: string;
    name: string;
    description?: string;
    dueDate: Date;
    schedule: 'one-time' | 'daily' | 'weekly' | 'monthly';
    value: number;
  }): Promise<Chore> {
    const chore = new Chore({
      id: crypto.randomUUID(),
      ...input
    });
    await this.repo.save(chore);
    return chore;
  }
}
