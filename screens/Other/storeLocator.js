// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, TextInput, Text } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import * as Location from 'expo-location';

// const StoreLocator = () => {
//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [stores, setStores] = useState([
//     { id: 1, name: 'Магазин 1', latitude: 37.78825, longitude: -122.4324 },
//     { id: 2, name: 'Магазин 2', latitude: 37.78845, longitude: -122.4324 },
//     // Add more stores with their coordinates
//   ]);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.logo}>LOGO</Text>
//         <TextInput
//           style={styles.searchBar}
//           placeholder="Знайти магазин ..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>
//       {location ? (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: location.latitude,
//             longitude: location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           {stores.map((store) => (
//             <Marker
//               key={store.id}
//               coordinate={{
//                 latitude: store.latitude,
//                 longitude: store.longitude,
//               }}
//               title={store.name}
//             />
//           ))}
//         </MapView>
//       ) : (
//         <Text>{text}</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 10,
//     backgroundColor: '#f8f8f8',
//   },
//   logo: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#0033cc',
//   },
//   searchBar: {
//     flex: 1,
//     height: 40,
//     marginLeft: 10,
//     paddingHorizontal: 10,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   map: {
//     flex: 1,
//   },
// });

// export default StoreLocator;
