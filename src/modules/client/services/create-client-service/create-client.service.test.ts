/**
 * @fileoverview Casos de testes para a criação do cliente
 *
 * @author Bruno Mesquita
 */

import connection from '@shared/utils/typeorm-helpers';

import CreateUserService from './create-client.service';

import ClientRepository from '../../typeorm/repository';

describe('Testes para o serviço de criação de usuário', () => {
  beforeAll(async () => {
    await connection.create();

    /* await conn.getCustomRepository(ClientRepository).insert({
      name: 'Jonatas',
      email: 'jonatas@gmail.com',
      cpf: '34355343433',
      cellphone: '12345472514',
      password: 'senhaforte',
    }); */
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it('Deveria criar um usuário', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',
      email: 'bruno@gmail.com',
      cellphone: '12981315901',
      confirmPassword: 'senhaforte',
      password: 'senhaforte',
      cpf: '00000000000',
    });

    expect(result.err).toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com a senha de confirmação diferente da senha', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'bruno@gmail.com',

      cellphone: '12981315901',

      confirmPassword: 'senhafraca',

      password: 'senhaforte',

      cpf: '00000000000',
    });

    expect(result.err).not.toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com um email invalido', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'brunogmail.com',

      cellphone: '12981315901',

      confirmPassword: 'senhaforte',

      password: 'senhaforte',

      cpf: '00000000000',
    });

    expect(result.err).not.toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com um telefone invalido', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'bruno@gmail.com',

      cellphone: '129813159016',

      confirmPassword: 'senhaforte',

      password: 'senhaforte',

      cpf: '00000000000',
    });

    expect(result.err).not.toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com um cpf invalido', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'bruno@gmail.com',

      cellphone: '12981315901',

      confirmPassword: 'senhaforte',

      password: 'senhaforte',

      cpf: '000000000002',
    });

    expect(result.err).not.toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com um cpf já existente no banco de dados', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'bruno@gmail.com',

      cellphone: '12981315901',

      confirmPassword: 'senhaforte',

      password: 'senhaforte',

      cpf: '34355343433',
    });

    expect(result.err).not.toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com um email já existente no banco de dados', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'jonatas@gmail.com',

      cellphone: '12981315901',

      confirmPassword: 'senhafraca',

      password: 'senhaforte',

      cpf: '00000000000',
    });

    expect(result.err).not.toBe(null);

    done();
  });

  it.skip('Deveria falhar ao tentar criar um usuário com um número de telefone inexistente', async (done) => {
    const createUserService = new CreateUserService();

    const result = await createUserService.execute({
      name: 'Bruno',

      email: 'bruno@gmail.com',

      cellphone: '1200000000',

      confirmPassword: 'senhafraca',

      password: 'senhaforte',

      cpf: '00000000000',
    });

    expect(result.err).not.toBe(null);

    done();
  });
});
