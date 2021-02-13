/**
 * @fileoverview Casos de testes para o serviço de reenvio do codigo para ativação da conta
 *
 * @author Bruno Mesquita
 */

import { v4 } from 'uuid';

import connection from '@shared/utils/typeorm-helpers';
import ClientActivationCodeRepository from '@modules/client-activation-code/typeorm/repository';
import ClientRepository from '../../typeorm/repository';
import ResendClientActivationCodeService from './resend-client-activation-code.service';

const clientId = v4();
const clientWithoutCode = v4();

describe('Testes para serviço de reenvio do codigo para ativação da conta', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it.skip('Deveria reenviar o codigo', async (done) => {
    const resendClientActivationCodeService = new ResendClientActivationCodeService();

    const { err } = await resendClientActivationCodeService.execute(clientId);

    expect(err).toBe(null);
    done();
  });

  it.skip('Deveria falhar com o id do cliente invalido', async (done) => {
    const resendClientActivationCodeService = new ResendClientActivationCodeService();

    const { err } = await resendClientActivationCodeService.execute('asdasdasd');

    expect(err).not.toBe(null);
    done();
  });

  it.skip('Deveria falhar com cliente não encontrado', async (done) => {
    const resendClientActivationCodeService = new ResendClientActivationCodeService();

    const { err } = await resendClientActivationCodeService.execute(v4());

    expect(err).not.toBe(null);
    done();
  });

  it.skip('Deveria falhar com codigo não encontrado', async (done) => {
    const resendClientActivationCodeService = new ResendClientActivationCodeService();

    const { err } = await resendClientActivationCodeService.execute(clientWithoutCode);

    expect(err).not.toBe(null);
    done();
  });
});
