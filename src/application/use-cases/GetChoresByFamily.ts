// Use Case: Retrieve chores by family
import { Chore } from '../../domain/value-objects/Chore';
import { ChoreRepository } from '../../domain/interfaces/ChoreRepository';

export class GetChoresByFamily {
  constructor(private repo: ChoreRepository) {}

  async execute(familyId: string): Promise<Chore[]> {
    return this.repo.findByFamily(familyId);
  }
}
