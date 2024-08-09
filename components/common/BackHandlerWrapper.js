import React, { useCallback } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const BackHandlerWrapper = ({ navigation, children }) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        } else {
          Alert.alert(
            'Вихід з додатку',
            'Ви хотіли б вийти з додатку?',
            [
              { text: 'Ні', style: 'cancel' },
              { text: 'Тік', onPress: () => BackHandler.exitApp() },
            ],
            { cancelable: false }
          );
          return true;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [navigation])
  );

  return children;
};

export default BackHandlerWrapper;
