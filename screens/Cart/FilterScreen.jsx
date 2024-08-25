import React, { useState, useContext, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable, TextInput } from 'react-native';
import { ProductContext } from '../../store/ProductContext';
import globalStyles from '../Other/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider';
import CheckBox from '../../components/common/CustomCheckbox';

// Объект с цветовыми кодами
const colorCodes = {
  'Всі': '#000000',
  'Червоний': '#FF0000',
  'Білий': '#FFFFFF',
  'Чорний': '#000000',
  'Сірий': '#808080',
  'Зелений': '#008000',
  'Жовтий': '#FFFF00',
  'Синій': '#0000FF',
  'світло-сірий': '#D3D3D3',
  'рожевий': '#FFC0CB',
  'молочний': '#FFF8DC',
  'чорний,світло-сірий': '#000000,#D3D3D3',
  'червоний,молочний': '#FF0000,#FFF8DC',
  'блакитний': '#ADD8E6',
  'сірий,чорний': '#808080,#000000',
  'коричневий': '#A52A2A',
  'темно-сірий': '#A9A9A9',
  'бежевий': '#F5F5DC',
  'бузковий': '#D8BFD8',
  'сливовий': '#8B008B',
  'чорний,сірий': '#000000,#808080',
  'оливковий': '#808000',
  'фіолетовий': '#800080',
  'темно-синій': '#00008B',
  'фуксія': '#FF00FF',
  'бордовий': '#800000',
  'молочний,різнокольоровий': '#FFF8DC,#FF00FF',
  'камуфляжний,оливковий': '#78866B,#808000',
  'темно-зелений': '#006400',
  'червоний,чорний': '#FF0000,#000000',
  'пудровий': '#fadadd',
  'різнокольоровий': '#FF0000,#0000FF'
};

const Filter = ({ navigation }) => {
  const { products, colors, brands, sports, cathegories, genders, subcathegories } = useContext(ProductContext);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCathegories, setSelectedCathegories] = useState([]);
  const [filteredSubcathegories, setFilteredSubcathegories] = useState([]);
  const [selectedSubcathegories, setSelectedSubcathegories] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  // Функции для обновления состояний
  const toggleColor = (colorId) => {
    if (colorId === colors[0].id) {
      if (selectedColors.includes(colorId)) {
        setSelectedColors([]);
      } else {
        setSelectedColors(colors.map(item => item.id));
      }
    } else {
      setSelectedColors(prevState =>
        prevState.includes(colorId)
          ? prevState.filter(item => item !== colorId)
          : [...prevState, colorId]
      );
    }
  };

  const toggleBrand = (brandId) => {
    if (brandId === brands[0].id) {
      if (selectedBrands.includes(brandId)) {
        setSelectedBrands([]);
      } else {
        setSelectedBrands(brands.map(item => item.id));
      }
    } else {
      setSelectedBrands(prevState =>
        prevState.includes(brandId)
          ? prevState.filter(item => item !== brandId)
          : [...prevState, brandId]
      );
    }
  };

  const toggleSport = (sportId) => {
    if (sportId === sports[0].id) {
      if (selectedSports.includes(sportId)) {
        setSelectedSports([]);
      } else {
        setSelectedSports(sports.map(item => item.id));
      }
    } else {
      setSelectedSports(prevState =>
        prevState.includes(sportId)
          ? prevState.filter(item => item !== sportId)
          : [...prevState, sportId]
      );
    }
  };

  const toggleCathegory = (cathegoryId) => {
    if (cathegoryId === cathegories[0].id) {
      if (selectedCathegories.includes(cathegoryId)) {
        setSelectedCathegories([]);
        // setFilteredSubcathegories([]);
      } else {
        setSelectedCathegories(cathegories.map(item => item.id));
        // setFilteredSubcathegories(subcathegories);
      }
    } else {
      setSelectedCathegories(prevState =>
        prevState.includes(cathegoryId)
          ? prevState.filter(item => item !== cathegoryId)
          : [...prevState, cathegoryId]
      );
      // setFilteredSubcathegories(subcathegories.filter(subcat => subcat.cathegoryId == selectedCathegories));
    }
  };

  const toggleSubcathegory = (subcathegoryId) => {
    if (subcathegoryId === subcathegories[0].id) {
      if (selectedSubcathegories.includes(subcathegoryId)) {
        setSelectedSubcathegories([]);
      } else {
        setSelectedSubcathegories(subcathegories.map(sub => sub.id));
      }
    } else {
      setSelectedSubcathegories(prevState =>
        prevState.includes(subcathegoryId)
          ? prevState.filter(item => item !== subcathegoryId)
          : [...prevState, subcathegoryId]
      );
    }
  };

  const toggleGender = (genderId) => {
    if (genderId === genders[0].id) {
      if (selectedGenders.includes(genderId)) {
        setSelectedGenders([]);
      } else {
        setSelectedGenders(genders.map(item => item.id));
      }
    } else {
      setSelectedGenders(prevState =>
        prevState.includes(genderId)
          ? prevState.filter(item => item !== genderId)
          : [...prevState, genderId]
      );
    }
  };

  // const filteredSubcathegories = selectedCathegories
  //   ? subcathegories.filter(subcat => subcat.cathegoryId === selectedCathegories)
  //   : [];

  const filteredProducts = useMemo(() => {
    return products.filter(product => 
    (selectedColors.length === 0 || selectedColors.includes(product.colorId)) &&
    (selectedBrands.length === 0 || selectedBrands.includes(product.brandId)) &&
    (selectedSports.length === 0 || selectedSports.includes(product.sportId)) &&
    (selectedGenders.length === 0 || selectedGenders.includes(product.genderId)) &&
    (selectedCathegories.length === 0 || selectedCathegories.includes(product.cathegoryId)) &&
      (selectedSubcathegories.length === 0 || selectedSubcathegories.includes(product.subcathegoryId)) &&
      (product.price >= minPrice && product.price <= maxPrice)
  );
}, [selectedColors, selectedBrands, selectedSports, selectedGenders, selectedCathegories, selectedSubcathegories, minPrice, maxPrice, products]);

const clearFilters = () => {
  !selectedColors.includes(colors[0]?.id) ? toggleColor(colors[0]?.id) : null;
  !selectedBrands.includes(brands[0]?.id) ? toggleBrand(brands[0]?.id) : null;
  !selectedSports.includes(sports[0]?.id) ? toggleSport(sports[0]?.id) : null;
  !selectedGenders.includes(genders[0]?.id) ? toggleGender(genders[0]?.id) : null;
  !selectedCathegories.includes(cathegories[0]?.id) ? toggleCathegory(cathegories[0]?.id) : null;
  !selectedSubcathegories.includes(subcathegories[0]?.id) ? toggleSubcathegory(subcathegories[0]?.id) : null;
  setMinPrice(0);
  setMaxPrice(10000);
  };
  

  const handleClearFilters = () => {
    clearFilters();
    // navigation.navigate('Catalog', {searchproducts: products});
  };

  const handleUseFilters = () => {
    navigation.navigate('Catalog', {searchproducts: filteredProducts});
  };

  // Обработчик для изменения минимальной цены
  const handleMinPriceChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue <= maxPrice) {
      setMinPrice(numericValue);
    }
  };

  // Обработчик для изменения максимальной цены
  const handleMaxPriceChange = (value) => {
    const numericValue = parseInt(value, 10);
    if (!isNaN(numericValue) && numericValue >= minPrice) {
      setMaxPrice(numericValue);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={[globalStyles.boldText, styles.title]}>Фільтр</Text>
        <Pressable onPress={() => navigation.navigate('Catalog')}>
              <Icon name="close" size={30} color="#000" />
          </Pressable>
      </View>
      <View style={styles.buttons}>
        <Pressable style={[styles.buttonShadow, styles.buttonClear]} onPress={handleClearFilters}>
            <Text style={[globalStyles.defaultText, styles.buttonText]}>Очистити</Text>
        </Pressable>
        <Pressable style={[styles.buttonShadow, styles.buttonFilter]} onPress={handleUseFilters}>
            <Text style={[globalStyles.defaultText, styles.buttonTextHome]}>Застосувати</Text>
        </Pressable>
      </View>
    <ScrollView >
      <Text style={[globalStyles.boldText, styles.subtitle]}>Категорія</Text>
      <View style={styles.checkboxContainer}>
        {cathegories.map(cathegory => (
        <View key={cathegory.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedCathegories.includes(cathegory.id)}
            onValueChange={() => toggleCathegory(cathegory.id)}
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
            onValueChange={() => toggleSubcathegory(subcathegory.id)}
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
            onValueChange={() => toggleGender(gender.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{gender.name}</Text>
        </View>
      ))}
      </View>

      <Text style={[globalStyles.boldText, styles.subtitle]}>Колір</Text>
      <View style={styles.checkboxContainer}>
        {colors.map(color => {
          // Получаем цветовой код
          const colorCode = colorCodes[color.name];
          const colorsArray = colorCode ? colorCode.split(',') : ['#000000'];
          return (
            <View key={color.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
              <CheckBox
                value={selectedColors.includes(color.id)}
                onValueChange={() => toggleColor(color.id)}
              />
               <View style={styles.colorCircle}>
               {colorsArray.length === 1 ? (
                  // Если только один цвет, заполняем весь круг
                  <View style={[styles.fullCircle, { backgroundColor: colorsArray[0] }]} />
                ) : (
                  // Если два цвета, разделяем круг пополам
                  <>
                    <View style={[styles.halfCircle, { backgroundColor: colorsArray[0] }]} />
                    <View style={[styles.halfCircle, { backgroundColor: colorsArray[1] }]} />
                  </>
                )}
              </View>
              <Text style={[globalStyles.defaultText, styles.checkboxname]}>{color.name}</Text>
            </View>
          );
        })}
      </View>
        
        <Text style={[globalStyles.boldText, styles.subtitle]}>Ціна</Text>
        <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={[globalStyles.defaultText, styles.label]}>Мінімальна ціна, грн   </Text>
        <TextInput
          style={[globalStyles.defaultText, styles.input]}
          keyboardType="numeric"
          value={String(minPrice)}
          onChangeText={handleMinPriceChange}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={[globalStyles.defaultText, styles.label]}>Максімальна ціна, грн</Text>
        <TextInput
          style={[globalStyles.defaultText, styles.input]}
          keyboardType="numeric"
          value={String(maxPrice)}
          onChangeText={handleMaxPriceChange}
        />
      </View>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10000}
        step={10}
        value={minPrice}
        onValueChange={handleMinPriceChange}
        minimumTrackTintColor="#FFC700"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#4748FF"
      />

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={10000}
        step={10}
        value={maxPrice}
        onValueChange={handleMaxPriceChange}
        minimumTrackTintColor="#FFC700"
        maximumTrackTintColor="#d3d3d3"
        thumbTintColor="#4748FF"
      />
    </View>

      <Text style={[globalStyles.boldText, styles.subtitle]}>Бренд</Text>
      <View style={styles.checkboxContainer}>
        {brands.map(brand => (
        <View key={brand.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedBrands.includes(brand.id)}
            onValueChange={() => toggleBrand(brand.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{brand.name}</Text>
        </View>
      ))}
      </View>
      
      <Text style={[globalStyles.boldText, styles.subtitle]}>Спорт і активний відпочинок</Text>
      <View style={styles.checkboxContainer}>
        {sports.map(sport => (
        <View key={sport.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 3 }}>
          <CheckBox
            value={selectedSports.includes(sport.id)}
            onValueChange={() => toggleSport(sport.id)}
          />
          <Text style={[globalStyles.defaultText, styles.checkboxname]}>{sport.name}</Text>
        </View>
      ))}
      </View>
    </ScrollView>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 26,
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginTop: 20,
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
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#000',
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    marginLeft: 10,
  },
  halfCircle: {
    width: '50%',
    height: '100%',
  },
  fullCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 10, // Делаем весь круг закрашенным
  },
  buttons: {
    // flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    width: '100%',
    height: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
},
buttonClear: {
  backgroundColor: '#4748FF',
  fontSize: 16,
  paddingHorizontal: 12,
  paddingTop: 6,
  paddingBottom: 10,
  borderRadius: 25,
  width: '45%',
  alignItems: 'center',
},
buttonFilter: {
  backgroundColor: '#FFC700',
  fontSize: 16,
  paddingHorizontal: 12,
  paddingTop: 6,
  paddingBottom: 10,
  borderRadius: 25,
  width: '45%',
  alignItems: 'center',
},
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonTextHome: {
        color: '#000',
        fontSize: 16,
    },
    buttonShadow: {
        shadowColor: '#000',
        shadowOffset: {
        width: 3,
        height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderColor: '#000',
    borderWidth: 1,
    padding: 2,
    borderRadius: 5,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
    marginVertical: 5,
  },
});

export default Filter;
