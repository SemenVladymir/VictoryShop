import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';

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

  const [selectedColor, setSelectedColor] = useState('');

  const handleCheckboxChange = (key) => {
    setChecked({ ...isChecked, [key]: !isChecked[key] });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Фільтр</Text>
      <Text style={styles.subtitle}>Категорія</Text>
      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked.clothing} onValueChange={() => handleCheckboxChange('clothing')} />
        <Text style={styles.checkboxLabel}>Одяг</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked.shoes} onValueChange={() => handleCheckboxChange('shoes')} />
        <Text style={styles.checkboxLabel}>Взуття</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={isChecked.accessories} onValueChange={() => handleCheckboxChange('accessories')} />
        <Text style={styles.checkboxLabel}>Аксесуари</Text>
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
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default Filter;
