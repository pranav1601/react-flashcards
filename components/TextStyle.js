import React from 'react';
import {StyleSheet , Text, View, TouchableOpacity } from 'react-native';

export default function TextButton({ children, onPress, txtStyle = {} }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.buttonText, txtStyle]}>{children} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    fontSize: 20
  }
});
