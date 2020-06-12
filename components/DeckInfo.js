import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import { textGray, green, white, red } from '../utils/colors';
import TextStyle from './TextStyle';
import TouchStyle from './TouchStyle';
import { deleteDeck } from '../actions/index';
import { remove } from '../utils/api';
import { connect } from 'react-redux';


export class DeckDetail extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = id => {
    const {navigation, deleteDeck} = this.props;
    remove(id);
    deleteDeck(id);
    

    navigation.goBack();
  };
  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchStyle
            txtStyle={{ color: textGray }}
            btnStyle={{borderColor: textGray, backgroundColor: white  }}
            onPress={() =>
              this.props.navigation.navigate('NewCard', { title: deck.title })
            }
          >
            Add a new Card?
          </TouchStyle>
          <TouchStyle
            txtStyle={{ color: white }}
            btnStyle={{ borderColor: white,backgroundColor: green,  }}
            onPress={() =>
              this.props.navigation.navigate('Quiz', { title: deck.title })
            }
          >
            Start Quiz
          </TouchStyle>
        </View>
        <TextStyle
          txtStyle={{ color: red }}
          onPress={() => this.handleDelete(deck.title)}
        >
          Delete Deck
        </TextStyle>
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
    justifyContent: 'space-around',
    backgroundColor: white
  }
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam('title', 'undefined');
  const deck = state[title];

  return {
    deck
  };
};

export default connect(
  mapStateToProps,
  { deleteDeck }
)(DeckDetail);