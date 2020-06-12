import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { gray, white, red, green } from '../utils/colors';
import TouchStyle from './TouchStyle';
import { reset } from '../actions/index';
import { resetApi } from '../utils/api.js';
import { connect } from 'react-redux';

export class Settings extends Component {
  handleResetDecks = () => {
    const { reset, navigation } = this.props;

    reset();
    resetApi();
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Settings </Text>
        <View style={styles.block}>
          <View style={styles.blockContainer}>
            <Text style={styles.blockText}>
              Reset Quiz
            </Text>
            <View style={{ height: 20 }} />
            <TouchStyle
              btnStyle={{ backgroundColor: red, borderColor: white }}
              onPress={this.handleResetDecks}
            >
              Reset Quiz
            </TouchStyle>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: gray
  },
  title: {
    fontSize: 40,
    marginBottom: 16,
    textAlign: 'center',
    color: green
  },
  block: {
    marginBottom: 20
  },
  blockContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#aaa',
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: white,
  },
  blockText: {
    fontSize: 12,
    color: white
  }
});

export default connect(
  null,
  { reset }
)(Settings);