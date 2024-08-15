import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import globalStyles from './styles';
import * as Location from 'expo-location';
import Header from '../../components/common/header';

const StoreLocator = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState([
    { id: 1, name: 'Магазин на Ірпінській', address: 'м.Дніпро, вул. Ірпінська, 2', work: 'Працює з 9:00 до 18:00 без вихідних', latitude: 48.42682077320352, longitude: 35.03111805728757 },
    { id: 2, name: 'Магазин на Яворницького', address: 'м.Дніпро, вул. Яворницького, 57', work: 'Працює з 10:00 до 21:00 без вихідних', latitude: 48.459686222442215, longitude: 35.056216072033436 },
    { id: 3, name: 'Магазин на Малиновського', address: 'м.Дніпро, вул. Малиновського, 33', work: 'Працює з 9:00 до 19:00 без вихідних', latitude: 48.479947665601856, longitude: 35.07267446829191 },
    { id: 4, name: 'Магазин на Незламній', address: 'м.Дніпро, вул. Незламна, 104', work: 'Працює з 9:00 до 18:00 без вихідних', latitude: 48.52945607807129, longitude: 34.98847835256279 },
    // Add more stores with their coordinates
  ]);

    const [filteredStores, setFilteredStores] = useState(stores);
    const mapRef = useRef(null); // Ref для MapView

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredStores = stores.filter(
      (store) =>
        store.name.toLowerCase().includes(lowercasedQuery) ||
        store.address.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredStores(newFilteredStores);
  }, [searchQuery]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    }
    
    const handleStorePress = (store) => {
        // Анимированное перемещение карты к выбранному магазину
        if (mapRef.current) {
          mapRef.current.animateToRegion(
            {
              latitude: store.latitude,
              longitude: store.longitude,
              latitudeDelta: 0.01,  // Увеличение масштаба
              longitudeDelta: 0.01,
            },
            1000  // Время анимации в миллисекундах
          );
        }
      };

  return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.title}>
            <Text style={[globalStyles.boldText, styles.titletext]}>Знайти магазин ...</Text>
        </View>
      <View style={styles.body}>
        <TextInput
          style={styles.searchBar}
          placeholder="Місто, назва, адреса ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.locations}>
            {location ? (
              <MapView
                ref={mapRef}  // Присвоение рефа MapView
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {filteredStores.map((store) => (
                  <Marker
                    key={store.id}
                    coordinate={{
                      latitude: store.latitude,
                      longitude: store.longitude,
                    }}
                    title={store.name}
                  >
                    <Callout>
                      <View style={styles.calloutContainer}>
                        <Text style={styles.calloutTitle}>{store.name}</Text>
                        <Text style={styles.calloutAddress}>{store.address}</Text>
                        <Text style={styles.calloutAddress}>{store.work}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
              </MapView>
            ) : (
              <Text>{text}</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStorePress(item)}>
            <View style={styles.storeBox}>
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.storeAddress}>{item.address}</Text>
                <Text style={styles.storeAddress}>{item.work}</Text>
            </View>
          </TouchableOpacity>
        )}
        style={styles.storeList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
      backgroundColor: '#fff',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
},
titletext: {
    fontSize: 22,
},
  searchBar: {
    flex: 1,
    height: 50,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  map: {
    height: 300, // Set the height of the map
  },
  calloutContainer: {
    width: 150,
  },
  calloutTitle: {
    fontWeight: 'bold',
  },
  calloutAddress: {
    color: '#555',
  },
  storeBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#F5F5F5',
    borderColor: '#000',
    borderWidth: 1,
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  storeAddress: {
    color: '#555',
  },
  storeList: {
    flexGrow: 0,
  },
});

export default StoreLocator;
