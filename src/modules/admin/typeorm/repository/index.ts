/**
 * @fileoverview Repositorio do Admin
 *
 * @author Bruno Mesquita
 */

import { EntityRepository, Repository } from 'typeorm';

import Admin from '../entity';

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {}

export default AdminRepository;
