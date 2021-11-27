import * as Yup from 'yup';

Yup.setLocale({
  mixed: {
    default: 'Campo obrigátorio'
  },
  string: {
    email: 'Email inválido'
  }
})
