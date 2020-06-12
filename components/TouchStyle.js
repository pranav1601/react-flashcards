import React from 'react';
import {  StyleSheet ,Text, View, TouchableOpacity,} from 'react-native';
import { white, darkGray, gray } from '../utils/colors';

export default function TouchButton({
  children,
  onPress,
  btnStyle = {},
  txtStyle = {},
  disabled = false
}) {
  const disabledButton = disabled ? styles.buttonDisabled : {};
  const disabledButtonText = disabled ? styles.buttonTextDisabled : {};
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        disabled={disabled}
        style={[styles.button, btnStyle, disabledButton]}
        onPress={onPress}
      >
        <Text
          style={[
            txtStyle,
            styles.buttonText,
            disabledButtonText
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttontnContainer: {
    alignItems: 'center',
    marginBottom: 20
  },
  buttonTextDisabled: {
    color: darkGray
  },
  buttonDisabled: {
    backgroundColor: white,
    borderColor: darkGray
  },
  button: {
    width: 200,
    borderRadius: 5,
    height: 50,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: 'red',
    justifyContent: `center`,
    alignItems: `center`,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: white
  },
});
