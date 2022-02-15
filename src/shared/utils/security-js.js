const crypto = require('crypto');

const { SECURITY_ALGORITHM, SECURITY_KEY } = process.env;

class Security {
  constructor(algorithm, password) {
    this.algorithm = algorithm;
    this.password = password;
  }

  encrypt(text) {
    const iv = Buffer.from(crypto.randomBytes(16));
    const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.password), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  decrypt(value) {
    const [iv, encrypted] = value.split(':');
    const ivBuffer = Buffer.from(iv, 'hex');

    const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.password), ivBuffer)

    let content = decipher.update(Buffer.from(encrypted, 'hex'));
    content = Buffer.concat([content, decipher.final()])

    return content.toString();
  }
}

module.exports = new Security(SECURITY_ALGORITHM, SECURITY_KEY);


