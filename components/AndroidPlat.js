import React, { Component } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import TextStyle from './TextStyle';
import TouchStyle from './TouchStyle';
import {  textGray,gray, darkGray,green, red,  white } from '../utils/colors';
import { withNavigation } from 'react-navigation';
import ViewPager from '@react-native-community/viewpager'
import { connect } from 'react-redux';

const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};


export class AndroidPlat extends Component {
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.cards.length,
    answered: Array(this.props.deck.cards.length).fill(0)
  };
  
  handleAnswer = (response, page) => {
    if (response === answer.CORRECT) {
      this.setState(prevState => ({ correct: prevState.correct + 1 }));
    } else {
      this.setState(prevState => ({ incorrect: prevState.incorrect + 1 }));
    }
    this.setState(
      prevState => ({
        answered: prevState.answered.map((val, idx) => (page === idx ? 1 : val))
      }),
      () => {
        const { correct, incorrect, questionCount } = this.state;

        if (questionCount === correct + incorrect) {
          this.setState({ show: screen.RESULT });
        } else {
          this.viewPager.setPage(page + 1);
          this.setState(prevState => ({
            show: screen.QUESTION
          }));
        }
      }
    );
  };
  handlePageChange = evt => {
    this.setState({
      show: screen.QUESTION
    });
  };
  handleReset = () => {
    this.setState(prevState => ({
      show: screen.QUESTION,
      correct: 0,
      incorrect: 0,
      answered: Array(prevState.questionCount).fill(0)
    }));
  };
  render() {
    const { show } = this.state;
    const { cards } = this.props.deck;

    if (cards.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              No cards in deck! 
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Add questions please! 
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const { questionCount, correct} = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Completed! 
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount} correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <TouchStyle
              btnStyle={{ backgroundColor: green, borderColor: white }}
              onPress={this.handleReset}
            >
              ReAttempt again? 
            </TouchStyle>
            <TouchStyle
              txtStyle={{ color: textGray }}
              btnStyle={{ backgroundColor: gray, borderColor: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
            >
              Back 
            </TouchStyle>
            <TouchStyle
              txtStyle={{ color: textGray }}
              btnStyle={{ backgroundColor: gray, borderColor: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.navigate('Home');
              }}
            >
              Home 
            </TouchStyle>
          </View>
        </View>
      );
    }

    return (
      <ViewPager
        style={styles.container}
        scrollEnabled={true}
        onPageSelected={this.handlePageChange}
        ref={viewPager => {
          this.viewPager = viewPager;
        }}
      >
        {cards.map((question, idx) => (
          <View style={styles.pageStyle} key={idx}>
            <View style={styles.block}>
              <Text style={styles.count}>
                {idx + 1} / {cards.length}
              </Text>
            </View>
            <View style={[styles.block, styles.questionContainer]}>
              <Text style={styles.questionText}>
                {show === screen.QUESTION ? 'Question' : 'Answer'}
              </Text>
              <View style={styles.questionWrapper}>
                <Text style={styles.title}>
                  {show === screen.QUESTION
                    ? question.question
                    : question.answer}
                </Text>
              </View>
            </View>
            {show === screen.QUESTION ? (
              <TextStyle
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: screen.ANSWER })}
              >
                Show Answer
              </TextStyle>
            ) : (
              <TextStyle
                txtStyle={{ color: red }}
                onPress={() => this.setState({ show: screen.QUESTION })}
              >
                Show Question
              </TextStyle>
            )}
            <View>
              <TouchStyle
                btnStyle={{ backgroundColor: green, borderColor: white }}
                onPress={() => this.handleAnswer(answer.CORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Right! 
              </TouchStyle>
              <TouchStyle
                btnStyle={{ backgroundColor: red, borderColor: white }}
                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                disabled={this.state.answered[idx] === 1}
              >
                Wrong! 
              </TouchStyle>
            </View>
          </View>
        ))}
      </ViewPager>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  pageStyle: {
    justifyContent: 'space-around',
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: gray
  },
  block: {
    marginBottom: 20
  },
  count: {
    fontSize: 24
  },
  title: {
    fontSize: 32,
    textAlign: 'center'
  },
  questionContainer: {
    borderWidth: 1,
    borderColor: darkGray,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    flexGrow: 1,
    backgroundColor: white,
    borderRadius: 5
    
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 20
  },
  resultTextGood: {
    fontSize: 46,
    color: green,
    textAlign: 'center'
  },
  resultTextBad: {
    fontSize: 46,
    color: red,
    textAlign: 'center'
  }
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(AndroidPlat));