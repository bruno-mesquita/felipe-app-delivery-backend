/**
 * @fileoverview Casos de testes do serviço de atualização de senha
 *
 * @author Bruno Mesquita
 */

import connection from '@shared/utils/typeorm-helpers';

describe('Testes para o serviço de atualização da senha do cliente', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it.skip('Deveria falhar passando a senha antiga errada', async (done) => {
    done();
  });

  it.skip('Deveria falhar passando a cliente inválido', async (done) => {
    done();
  });

  it.skip('Deveria falhar passando dados errados', async (done) => {
    done();
  });
});
