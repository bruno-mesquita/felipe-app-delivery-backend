import React, { useState, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, Alert, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { ModalBase, ButtonModal } from '../../../../../Components';
import formatNumber from '../../../../../utils/format-number';

import { Content, ViewButtons } from './styles';
import { ItemModalProps, ItemOrder, Order } from './props';
import { getApi } from '../../../../../services/api';

export const ItemModal = ({ modalRef, id, reender }: ItemModalProps) => {
  const { colors } = useTheme();

  const [order, setOrder] = useState<Order>({ id: 0, total: 0, order_status: '' });
  const [items, setItems] = useState<ItemOrder[]>([]);

  const onClose = useCallback(() => {
    modalRef.current.close();
  }, []);

  useEffect(() => {
    const api = getApi();

    if(id) {
      api.get(`/show-order/${id}`)
        .then(({ data }) => {
          setItems(data.result.items)
          setOrder(data.result.order)
        })
        .catch(err => {
          Alert.alert('Erro', 'Erro ao buscar pedido', [
            {
              onPress: onClose,
              text: 'Sair'
            }
          ])
        })
    }
  }, [id]);

  const accept = async () => {
    try {
      const api = getApi();

      onClose();
      reender();
    } catch (err) {
      Alert.alert('Erro', 'Houve um erro ao aceitar o pedido');
    }
  };
  const refuse = async () => {
    try {
      const api = getApi();

      onClose();
    } catch (err) {
      Alert.alert('Erro', 'Houve um erro ao recusar o pedido');
    }
  };


  const CloseButton = () => (
    <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end', paddingBottom: 10 }}>
      <Ionicons name="close-circle" size={25} color={colors.primary} />
    </TouchableOpacity>
  )

  return (
    <ModalBase ref={modalRef}>
      <Content>
        <CloseButton />
        {items.map(item => (
          <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, alignItems: 'baseline' }}>
            <Text>{`${item.quantity}x ${item.product.name}`}</Text>
            <Text>{formatNumber(item.total)}</Text>
          </View>
        ))}

        <Text style={{ alignSelf: 'flex-end' }}>{formatNumber(order.total)}</Text>
        <ViewButtons>
          <ButtonModal style={{ width: '30%', marginBottom: 0 }} onPress={refuse}>Recusar</ButtonModal>
          <ButtonModal style={{ width: '30%', marginBottom: 0 }} onPress={accept}>Aceitar</ButtonModal>
        </ViewButtons>
        </Content>
    </ModalBase>
  )
}
