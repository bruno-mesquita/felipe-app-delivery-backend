import connection from '@shared/utils/typeorm-helpers';

describe('', () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await connection.clear();
  });

  it.skip('Deveria atualizar o perfil do usuário', async (done) => {
    done();
  });

  it.skip('Deveria falhar ao passar um email invalido', async (done) => {
    done();
  });

  it.skip('Deveria falhar ao passar um telefone invalido', async (done) => {
    done();
  });

  it.skip('Deveria falhar ao passar um cliente que não existe', async (done) => {
    done();
  });

  it.skip('Deveria falhar ao passar um email que já está cadastrado', async (done) => {
    done();
  });

  it.skip('Deveria falhar ao passar um telefone que já está cadastrado', async (done) => {
    done();
  });

  it.skip('Deveria falhar ao atualizar um usuário que está desativado', async (done) => {
    done();
  });
});
