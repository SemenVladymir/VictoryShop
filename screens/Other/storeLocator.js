import React, { useState, useEffect, useRef  } from 'react';
import { StyleSheet, View, TextInput, Text, FlatList, SafeAreaView, Image, Pressable, Switch } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import globalStyles from './styles';
import * as Location from 'expo-location';
import Header from '../../components/common/header';

const StoreLocator = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stores, setStores] = useState([
    { id: 1, name: 'Planet sport Irpinska', address: 'м.Дніпро, вул. Ірпінська, 2', work: 'Працює з 9:00 до 18:00 без вихідних', latitude: 48.42682077320352, longitude: 35.03111805728757 },
    { id: 2, name: 'Planet sport Yavornitskogo', address: 'м.Дніпро, вул. Яворницького, 57', work: 'Працює з 10:00 до 21:00 без вихідних', latitude: 48.459686222442215, longitude: 35.056216072033436 },
    { id: 3, name: 'Planet sport Malinovskogo', address: 'м.Дніпро, вул. Малиновського, 33', work: 'Працює з 9:00 до 19:00 без вихідних', latitude: 48.479947665601856, longitude: 35.07267446829191 },
    { id: 4, name: 'Planet sport Nezlamna', address: 'м.Дніпро, вул. Незламна, 104', work: 'Працює з 9:00 до 18:00 без вихідних', latitude: 48.52945607807129, longitude: 34.98847835256279 },
    // Add more stores with their coordinates
  ]);

  const [filteredStores, setFilteredStores] = useState(stores);
  const [mapType, setMapType] = useState('standard');
  const mapRef = useRef(null); // Ref для MapView
  const markerIcon = require('../../assets/images/mapmarker.png');

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
  
  const toggleMapType = () => {
    setMapType((prevType) => (prevType === 'standard' ? 'satellite' : 'standard'));
    console.log(mapType);
  };

  return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.title}>
            <Text style={[globalStyles.boldText, styles.titletext]}>Знайти магазин ...</Text>
        </View>
      <View style={styles.body}>
        <TextInput
          style={[globalStyles.boldText, styles.searchBar]}
          placeholder="Місто, назва, адреса ..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {/* <Pressable onPress={toggleMapType} style={styles.button} >
          <Text style={globalStyles.defaultText}>Вид карти</Text>
        </Pressable> */}
      </View>
      <FlatList
        data={filteredStores}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.locations}>
            {location ? (
              <View style={styles.mapContainer}>
              <MapView
                ref={mapRef}
                style={styles.map}
                mapType={mapType}
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
                    <Image source={markerIcon} style={{ width: 35, height: 35 }} resizeMode="contain"/>
                    <Callout>
                      <View style={styles.calloutContainer}>
                        <Text style={[globalStyles.defaultText, styles.calloutTitle]}>{store.name}</Text>
                        <Text style={[globalStyles.defaultText, styles.calloutAddress]}>{store.address}</Text>
                        <Text style={[globalStyles.defaultText, styles.calloutAddress]}>{store.work}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
              </MapView>
              <View style={styles.switchContainer}>
                  {/* <Text style={globalStyles.defaultText}>Супутник</Text> */}
                  <Switch
                    value={mapType === 'satellite'}
                    onValueChange={toggleMapType}
                  />
                </View>
              </View>
            ) : (
              <Text>{text}</Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => handleStorePress(item)}>
            <View style={styles.storeBox}>
                <Text style={[globalStyles.defaultText, styles.storeName]}>{item.name}</Text>
                <Text style={[globalStyles.defaultText, styles.storeAddress]}>{item.address}</Text>
                <Text style={[globalStyles.defaultText, styles.storeAddress]}>{item.work}</Text>
            </View>
          </Pressable>
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
  button: {
    // flex: 1,
    backgroundColor: '#FFC700',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderColor: '#000',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    position: 'relative',
    height: 300,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  switchContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    // padding: 5,
    borderRadius: 5,
  },
  calloutContainer: {
    width: 150,
  },
  calloutTitle: {
    fontSize: 18,
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
    fontSize: 18,
  },
  storeAddress: {
    color: '#555',
  },
  storeList: {
    flexGrow: 0,
  },
});

export default StoreLocator;
