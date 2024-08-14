import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { ProductContext } from '../../store/ProductContext';
import globalStyles from '../Other/styles';

const Filter = () => {
  const [isChecked, setChecked] = useState({
    clothing: false,
    shoes: true,
    accessories: false,
    tops: false,
    shorts: false,
    hoodies: false,
    jackets: false,
    pants: false,
    tracksuits: false,
    socks: false,
    shirts: false,
    sweatshirts: false,
    skateboarding: false,
    jacketsSecond: false,
    windbreakers: false,
  });
  const { products, colors, brands, sports, cathegories, countries, genders, subcathegories } = useContext(ProductContext);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCathegories, setSelectedCathegories] = useState([]);
  const [selectedSubcathegories, setSelectedSubcathegories] = useState([]);

  // Функции для обновления состояний
  const toggleColor = (colorId) => {
    setSelectedColor(prevState =>
      prevState.includes(colorId)
        ? prevState.filter(item => item !== colorId)
        : [...prevState, colorId]
    );
  };

  const toggleBrand = (brandId) => {
    setSelectedBrands(prevState =>
      prevState.includes(brandId)
        ? prevState.filter(item => item !== brandId)
        : [...prevState, brandId]
    );
  };

  const toggleCountry = (countryId) => {
    setSelectedCountries(prevState =>
      prevState.includes(countryId)
        ? prevState.filter(item => item !== countryId)
        : [...prevState, countryId]
    );
  };

  const toggleCathegory = (cathegoryId) => {
    setSelectedCathegories(prevState =>
      prevState.includes(cathegoryId)
        ? prevState.filter(item => item !== cathegoryId)
        : [...prevState, cathegoryId]
    );
  };

  const toggleSubcathegory = (subcathegoryId) => {
    setSelectedSubcathegories(prevState =>
      prevState.includes(subcathegoryId)
        ? prevState.filter(item => item !== subcathegoryId)
        : [...prevState, subcathegoryId]
    );
  };

  const toggleGender = (genderId) => {
    setSelectedGenders(prevState =>
      prevState.includes(genderId)
        ? prevState.filter(item => item !== genderId)
        : [...prevState, genderId]
    );
  };

  const filteredProducts = products.filter(product => 
    (selectedColor.length === 0 || selectedColor.includes(product.colorId)) &&
    (selectedBrands.length === 0 || selectedBrands.includes(product.brandId)) &&
    (selectedCountries.length === 0 || selectedCountries.includes(product.countryId)) &&
    (selectedGenders.length === 0 || selectedGenders.includes(product.genderId)) &&
    (selectedCathegories.length === 0 || selectedCathegories.includes(product.cathegoryId)) &&
    (selectedSubcathegories.length === 0 || selectedSubcathegories.includes(product.subcathegoryId))
  );


  const handleCheckboxChange = (key) => {
    setChecked({ ...isChecked, [key]: !isChecked[key] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[globalStyles.boldText, styles.title]}>Фільтр</Text>

      <Text style={[globalStyles.boldText, styles.subtitle]}>Категорія</Text>
      <View style={styles.checkboxContainer}>
        {cathegories.map(cathegory => (
        <View key={cathegory.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedCathegories.includes(cathegory.id)}
            onValueChange={() => toggleColor(cathegory.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{cathegory.name}</Text>
        </View>
      ))}
      </View>

      <Text style={[globalStyles.boldText, styles.subtitle]}>Тип одягу</Text>
      <View style={styles.checkboxContainer}>
      {subcathegories.map(subcathegory => (
        <View key={subcathegory.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedSubcathegories.includes(subcathegory.id)}
            onValueChange={() => toggleColor(subcathegory.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{subcathegory.name}</Text>
        </View>
      ))}
      </View>

      <Text style={[globalStyles.boldText, styles.subtitle]}>Стать</Text>
      <View style={styles.checkboxContainer}>
        {genders.map(gender => (
        <View key={gender.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedGenders.includes(gender.id)}
            onValueChange={() => toggleColor(gender.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{gender.name}</Text>
        </View>
      ))}
      </View>

      <Text style={[globalStyles.boldText, styles.subtitle]}>Колір</Text>
      <View style={styles.checkboxContainer}>
        {colors.map(color => (
        <View key={color.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedColor.includes(color.id)}
            onValueChange={() => toggleColor(color.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{color.name}</Text>
        </View>
      ))}
      </View>
      <Text style={styles.subtitle}>Тип одягу</Text>
      {['tops', 'shorts', 'hoodies', 'jackets', 'pants', 'tracksuits', 'socks', 'shirts', 'sweatshirts', 'skateboarding', 'jacketsSecond', 'windbreakers'].map((key) => (
        <View key={key} style={styles.checkboxContainer}>
          <CheckBox value={isChecked[key]} onValueChange={() => handleCheckboxChange(key)} />
          <Text style={styles.checkboxLabel}>{key}</Text>
        </View>
      ))}
      <Text style={styles.subtitle}>Колір</Text>
      <Picker
        selectedValue={selectedColor}
        onValueChange={(itemValue) => setSelectedColor(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Green" value="green" />
        <Picker.Item label="Orange" value="orange" />
        <Picker.Item label="Yellow" value="yellow" />
        <Picker.Item label="Purple" value="purple" />
        <Picker.Item label="Brown" value="brown" />
        <Picker.Item label="Gray" value="gray" />
        <Picker.Item label="White" value="white" />
      </Picker>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  picker: {
    height: 50,
    width: 150,
  },
  checkboxname: {
    paddingLeft: 5,
    fontSize: 16,
  },
});

export default Filter;
