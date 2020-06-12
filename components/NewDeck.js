import React, { Component } from 'react';
import { StyleSheet,Text, View,  TextInput } from 'react-native';
import { save } from '../utils/api';
import { addDeck } from '../actions/index';
import {NavigationActions , StackActions } from 'react-navigation';
import TouchStyle from './TouchStyle';
import { white,green,  textGray } from '../utils/colors';
import { connect } from 'react-redux';

export class AddDeck extends Component {
  state = {
    text: ''
  };
  handleChange = text => {
    this.setState({ text });
  };
  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { text } = this.state;

    addDeck(text);
    save(text);

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({
          routeName: 'DeckInfo',
          params: { title: text }
        })
      ]
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: '' }));
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>Please add a title for the new deck</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Deck Name"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
        </View>
        <TouchStyle
          btnStyle={{ backgroundColor: green, borderColor: white }}
          onPress={this.handleSubmit}
          disabled={this.state.text === ''}
        >
          Create Deck
        </TouchStyle>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: white
  },
  block: {
    marginBottom: 20
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: textGray,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: white,
    fontSize: 20,
    height: 40,
    borderRadius: 5,
    marginBottom: 20
  }
});

export default connect(
  null,
  { addDeck }
)(AddDeck);