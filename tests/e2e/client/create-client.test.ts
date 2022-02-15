import request from 'supertest';
import faker from 'faker';

import server from '../../../src/shared/http/server';
import Database from '../../../src/shared/database';

const EMAIL_DUPLICATE = faker.internet.email();
const CPF_DUPLICATE = '12345678977';
const PHONE_DUPLICATE = faker.phone.phoneNumber();

describe('Testes para criação de um usuário', () => {
  let conn: Database;

  beforeEach(async () => {
    conn = new Database();
    await conn.init();
  });

  afterEach(async () => {
    await conn.disconnect();
  })

  it('Deveria criar um usuário', async () => {
    const requestBody = {
      name: 'Bruno Tests',
      email: EMAIL_DUPLICATE,
      password: 'senha1',
      confirmPassword: 'senha1',
      cpf: CPF_DUPLICATE,
      cellphone: '12923456756',
      city: 1,
    };

    const { statusCode, body } = await request(server).post('/api/app/clients').send(requestBody)

    expect(statusCode).toBe(201);
    expect(typeof body.result.userId).toBe('number');
  });

  it('Deveria falhar ao tentar criar um usuário com email repetido', async () => {
    const requestBody = {
      name: 'Bruno Tests 2',
      email: EMAIL_DUPLICATE,
      password: 'senha1',
      confirmPassword: 'senha1',
      cpf: '12345678377',
      cellphone: '12943456756',
      city: 1,
    };

    const { statusCode, body } = await request(server).post('/api/app/clients').send(requestBody)

    expect(statusCode).toBe(400);
    expect(body.type).toBe('internal');
    expect(body.message).toBe('Já existe um usuário cadastrado com esses dados');
  });

  it('Deveria falhar ao tentar criar um usuário com cpf repetido', async () => {
    const requestBody = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: 'senha1',
      confirmPassword: 'senha1',
      cpf: CPF_DUPLICATE,
      cellphone: PHONE_DUPLICATE,
      city: 1,
    };

    const { statusCode, body } = await request(server).post('/api/app/clients').send(requestBody)

    expect(statusCode).toBe(400);
    expect(body.type).toBe('internal');
    expect(body.message).toBe('Já existe um usuário cadastrado com esses dados');
  });

  it('Deveria falhar ao tentar criar um usuário com telefone repetido', async () => {
    const requestBody = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: 'senha1',
      confirmPassword: 'senha1',
      cpf: CPF_DUPLICATE,
      cellphone: PHONE_DUPLICATE,
      city: 1,
    };

    const { statusCode, body } = await request(server).post('/api/app/clients').send(requestBody)

    expect(statusCode).toBe(400);
    expect(body.type).toBe('internal');
    expect(body.message).toBe('Já existe um usuário cadastrado com esses dados');
  });

  it.skip('Deveria falhar ao tentar criar um usuário com cpf invalido', async (done) => {
    done();
  });

  it('Deveria falhar ao tentar criar um usuário com email invalido', async () => {
    const requestBody = {
      name: faker.name.firstName(),
      email: 'emialinvalido',
      password: 'senha1',
      confirmPassword: 'senha1',
      cpf: '12345678944',
      cellphone: faker.phone.phoneNumber(),
      city: 1,
    };

    const { statusCode, body } = await request(server).post('/api/app/clients').send(requestBody)

    expect(statusCode).toBe(400);
    expect(body.type).toBe('validate');
    expect(body.message).toBe('Erro de validação!');
  });

  it('Deveria falhar ao tentar criar um usuário faltando campos obrigatórios', async () => {
    const requestBody = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      cpf: '12345678944',
      cellphone: faker.phone.phoneNumber(),
      city: 1,
    };

    const { statusCode, body } = await request(server).post('/api/app/clients').send(requestBody)

    expect(statusCode).toBe(400);
    expect(body.type).toBe('validate');
    expect(body.message).toBe('Erro de validação!');
  });
});
