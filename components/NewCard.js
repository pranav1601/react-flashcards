import React, { Component } from 'react';
import { Text, View, StyleSheet,TextInput } from 'react-native';
import TouchStyle from './TouchStyle';
import {addCard} from '../actions/index';
import {addCardApi} from '../utils/api';
import { gray, green } from '../utils/colors';
import { connect } from 'react-redux';
import { Container, Header, Content, Item, Input, Left, Body, Title, Right, Button, Card, Root, Toast } from 'native-base'


export class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  };
  handleAnswerChange = answer => {
    this.setState({ answer });
  };
  handleQuestionChange = question => {
    this.setState({ question });
  };
  handleSubmit = () => {
    const { addCard, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer
    };

    addCard(title, card);
    addCardApi(title, card);

    this.setState({ question: '', answer: '' });
    navigation.goBack();
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.cover}>
            <Text style={styles.title}>Add a new question?</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              returnKeyType="next"
              placeholder="Question"
              autoFocus={true}
              onChangeText={this.handleQuestionChange}
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.cover]}>
            <TextInput
              style={styles.input}
              ref={input => {
                this.answerTextInput = input;
              }}
              placeholder="Answer"
              returnKeyType="done"
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              onSubmitEditing={this.handleSubmit}
            />
          </View>
          <TouchStyle
            disabled={this.state.question === '' || this.state.answer === ''}
            btnStyle={{ backgroundColor: green, borderColor: '#fff' }}
            onPress={this.handleSubmit}
          >
            Submit 
          </TouchStyle>
        </View>
        <View style={{ height: '30%' }} />
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
    backgroundColor: gray,
    justifyContent: 'space-around'
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  },
  cover: {
    marginBottom: 20
  },
  input: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff'
    
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');

  return {
    title
  };
};

export default connect(
  mapStateToProps,
  { addCard }
)(NewCard);