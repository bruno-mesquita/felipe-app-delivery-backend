import { useEffect, useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { Formik, FormikHelpers } from 'formik';

import { MenuForm } from '../../../Components';
import { getApi } from '../../../services/api';

import { Container } from './styles';

export const UpdateMenu = ({ route }) => {
  const [menu, setMenu] = useState({ id: '', name: '' });

  const getMenu = useCallback(async () => {
    try {
      const api = getApi();

      const { data } = await api.get(`/menus/${route.params.id}`);

      setMenu(data.result);
    } catch (err) {
      Alert.alert('Erro ao buscar dados do cardápio');
    }
  }, []);

  useEffect(() => {
    getMenu()
  }, [getMenu])

  const onSubmit = async (values: any, { setSubmitting }: FormikHelpers<any>) => {
    try {
      const api = getApi();

      await api.put(`/menus/${route.params.id}`, values);

      Alert.alert('Atualizado com sucesso!')
    } catch (err) {
      Alert.alert('Erro', 'Houve um erro ao atualizar')
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Container>
      <Formik
        onSubmit={onSubmit}
        initialValues={menu}
        component={MenuForm}
        enableReinitialize
      />
    </Container>
  )
}
