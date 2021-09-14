import security from '../utils/security';

export const sequelizeSecurity = (field: string) => ({
  get() {
    return security.decrypt(this.getDataValue(field));
  },
  set(value: string) {
    this.setDataValue(field, security.encrypt(value))
  }
})
