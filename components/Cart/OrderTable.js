import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { OrderContext } from '../../store/OrderContext';
import { ProductContext } from '../../store/ProductContext';
import globalStyles from '../../screens/Other/styles';

const OrderTable = () => {
  const { orders, statuses, countActualOrders } = useContext(OrderContext);
  const { products } = useContext(ProductContext);
  const [filterOrders, setFilterOrders] = useState([]);
  const filteredOrders = orders.filter(e => e.statusId !== 4);

  useEffect(() => {
    setFilterOrders(filteredOrders);
  }, [countActualOrders ]);

  const getStatusName = (statusId) => {
    const status = statuses.find(status => status.id === statusId);
    if (statusId === 2) return status ? 'Очикує вас в корзині' : 'Unknown Status';
    if (statusId === 3) return status ? 'Сплачено, очикуйте доставку' : 'Unknown Status';
    if (statusId === 5) return status ? 'Доставлено' : 'Unknown Status';
    return 'Unknown Status';
  };

  const getProductName = (productId) => {
    const product = products.find(product => product.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  const getFirstPhotoUrl = (productId) => {
    const product = products.find(product => product.id === productId);
    return product && product.photos.length > 0 ? product.photos[0].url : null;
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.title}>
        <Text style={[globalStyles.boldText, styles.titletext]}>Статус моїх замовлень</Text>
      </View>
      <View  style={{ flex: 1 }}>
        <View style={styles.headerRow}>
          <Text style={[globalStyles.boldText, styles.headerCell]}>Фото</Text>
          <Text style={[globalStyles.boldText, styles.headerCell]}>Назва</Text>
          <Text style={[globalStyles.boldText, styles.headerCell]}>Статус</Text>
        </View>
        <ScrollView style={{ flex: 1 }}>
        {filterOrders.map((item) => {
          const photoUrl = getFirstPhotoUrl(item.productId);
          
          return (
            <View key={item.id} style={styles.row}>
              <View style={styles.cell}>
                {photoUrl ? (
                  <Image source={{ uri: photoUrl }} style={styles.image} />
                ) : (
                  <Text style={[globalStyles.defaultText, styles.text]}>No Image</Text>
                )}
              </View>
              <Text style={[globalStyles.defaultText, styles.cell]}>{getProductName(item.productId)}</Text>
              <Text style={[globalStyles.defaultText, styles.cell]}>{getStatusName(item.statusId)}</Text>
            </View>
          );
        })}
        </ScrollView>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  titletext: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 22,
    },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  headerCell: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 16,
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

export default OrderTable;
