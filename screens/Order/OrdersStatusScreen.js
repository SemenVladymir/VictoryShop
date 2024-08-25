import React from 'react';
import { SafeAreaView } from 'react-native';
import OrderTable from '../../components/Cart/OrderTable';
import Header from '../../components/common/header';

const App = () => {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Header/>
      <OrderTable />
    </SafeAreaView>
  );
};

export default App;
