/**
 * @fileoverview Casos de testes para o serviço de ativação do cliente
 *
 * @author Bruno Mesquita
 */

import { v4 } from 'uuid';

import connection from '@shared/utils/typeorm-helpers';
import ActiveClientService from './active-client.service';
import ClientRepository from '../../typeorm/repository';

const clientId = v4();
const clientActiveId = v4();
const clientWitoutCode = v4();
const code = '';

describe('Testes para o serviço de ativação do cliente', () => {
  beforeAll(async () => {
    const conn = await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it.skip('Deveria ativar a conta do cliente', async (done) => {
    const activeClientService = new ActiveClientService();

    const { err } = await activeClientService.execute(code, clientId);

    expect(err).toBe(null);
    done();
  });

  it.skip('Deveria falhar quando o cliente já está ativo', async (done) => {
    const activeClientService = new ActiveClientService();

    const { err } = await activeClientService.execute(code, clientActiveId);

    expect(err).toBe(null);
    done();
  });

  it.skip('Deveria falhar quando o id do cliente está incorreto', async (done) => {
    const activeClientService = new ActiveClientService();

    const { err } = await activeClientService.execute(code, 'asdasdasd');

    expect(err).toBe(null);
    done();
  });

  it.skip('Deveria falhar quando o cliente não existe', async (done) => {
    const activeClientService = new ActiveClientService();

    const { err } = await activeClientService.execute(code, v4());

    expect(err).toBe(null);
    done();
  });

  it.skip('Deveria falhar quando o cliente não tem nenhum codigo de ativação', async (done) => {
    const activeClientService = new ActiveClientService();

    const { err } = await activeClientService.execute(code, clientWitoutCode);

    expect(err).toBe(null);
    done();
  });

  it.skip('Deveria falhar quando o codigo de ativação está incorreto', async (done) => {
    const activeClientService = new ActiveClientService();

    const { err } = await activeClientService.execute('code', clientId);

    expect(err).toBe(null);
    done();
  });
});
