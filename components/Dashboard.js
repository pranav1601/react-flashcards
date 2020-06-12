import React, { Component } from 'react';
import {Text,View,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import Deck from './Deck';
import {handleInitialData} from '../actions/index';
import {white} from '../utils/colors';
import {connect} from 'react-redux';

export class Dashboard extends Component {
  componentDidMount() {
    this.props.handleInitialData();
  }
  render() {
    const {navigation,decks} = this.props;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Flashcards for quiz</Text>
        {Object.values(decks).map((deck)=>{
    return(
        <TouchableOpacity key={deck.title}
            onPress={()=>navigation.navigate('DeckInfo',{title:deck.title})}>
            <Deck id={deck.title}/>
        </TouchableOpacity>
    )
})}
        <View style={{marginBottom:30}} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 16,
    color:blue
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: white
  }
  
});

const mapStateToProps = state => ({ decks: state });

export default connect(
  mapStateToProps,
  { handleInitialData }
)(Dashboard);