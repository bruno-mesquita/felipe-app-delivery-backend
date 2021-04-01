import { EncryptionTransformer } from 'typeorm-encrypted';

import config from './config';

const encrypted = () => new EncryptionTransformer(config);

export default encrypted;
