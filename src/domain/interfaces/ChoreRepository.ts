// Domain Interface: Chore Repository
import { Chore } from '../value-objects/Chore';

export interface ChoreRepository {
  findByFamily(familyId: string): Promise<Chore[]>;
  save(chore: Chore): Promise<void>;
  delete(choreId: string): Promise<void>;
}
