import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { white, textGray } from '../utils/colors';
import { connect } from 'react-redux';


const Deck = (props) => {
  const { deck } = props;
  if (deck === undefined) {
    return <View style={styles.deckContainer} />;
  }
  return (
    <View style={styles.deckContainer}>
      <View>
        <Text style={styles.deckText}>{deck.title}</Text>
      </View>
      <View>
        <Text style={styles.cardText}>{deck.cards.length} Flashcards </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deckText: {
    fontSize: 28
  },
  deckContainer: {
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#aaa',
    flexBasis: 120,
    minHeight: 120,
    backgroundColor: white,
    
  },
  cardText: {
    color: textGray,
    fontSize: 18,
  }
});

const mapStateToProps = (state,{id}) => {
  const deck = state[id];
  return {
    deck
  };
};

export default connect(mapStateToProps)(Deck);