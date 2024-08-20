import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomCheckbox = ({ value, onValueChange, size = 20, color = '#000', checkedColor = '#4748FF' }) => {

    return (
      <Pressable
        style={ [
          styles.checkboxBase,
          {
            width: size,
            height: size,
            borderColor: value ? checkedColor : color,
            backgroundColor: value ? checkedColor : 'transparent',
            // backgroundColor: pressed ? '#4748FF' : 'transparent',
          },
        ]}
        onPress={onValueChange}
      >
        {value && (
          <AntDesign name="check" size={size - 2} color={'white'} />
        )}
      </Pressable>
    );
  };
  
  const styles = StyleSheet.create({
    checkboxBase: {
        // width: 20,
        // height: 20,
        borderRadius: 5,
        borderWidth: 1,
        // borderColor: '#000',
        // backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
});

export default CustomCheckbox;
