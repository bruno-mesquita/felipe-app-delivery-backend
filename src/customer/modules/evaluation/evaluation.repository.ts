import Evaluation from '@core/evaluation';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Evaluation)
export class EvaluationRepository extends Repository<Evaluation> {}
