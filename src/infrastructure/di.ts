// Dependency Injection Container
import { PrismaChoreRepository } from './repositories/PrismaChoreRepository';
import { CreateChore } from '../application/use-cases/CreateChore';
import { GetChoresByFamily } from '../application/use-cases/GetChoresByFamily';

const choreRepo = new PrismaChoreRepository();
const createChoreUC = new CreateChore(choreRepo);
const getChoresByFamilyUC = new GetChoresByFamily(choreRepo);

export {
  choreRepo,
  createChoreUC,
  getChoresByFamilyUC,
};
