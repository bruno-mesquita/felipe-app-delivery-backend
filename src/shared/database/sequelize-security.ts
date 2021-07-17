import security from '../utils/security-js';

export function sequelizeSecurity(field: string) {
  return {
    get() {
      return security.decrypt(this.getDataValue(field));
    },
    set(value: string) {
      this.setDataValue(security.encrypt(value))
    }
  }
}
