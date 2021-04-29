import React, { useRef } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { TextInputMasked } from 'react-native-masked-text';

import { ProductForm } from '../../../Components';

import { Container } from './styles';
import api from '../../../services/api';
import schema from './schema';

export const ProductRegistration = () => {
  const inputPriceRef = useRef<TextInputMasked>(null);

  const initialValues = {
    name: '',
    price: '',
    description: '',
    menu: 0,
    image: null,
  }

  const onSubmit = async (values, { resetForm, setSubmitting }: FormikHelpers<any>) => {
    try {
      const data = {
        ...values,
        menu: Number(values.menu),
        price: inputPriceRef.current?.getRawValue(),
      }

      await api.post('/products', data);

      Alert.alert('Sucesso', 'Produto cadastrado com sucesso')
      resetForm();
      setSubmitting(false);
    } catch (err) {
      console.log(err.response.data);
      setSubmitting(false);
      Alert.alert('Erro', 'Erro ao cadastrar o produto');
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        component={(props) => <ProductForm {...props} inputPriceRef={inputPriceRef} />}
        validationSchema={schema}
      />
    </Container>
  )
}
