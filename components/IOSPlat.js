import React, { Component } from 'react';
import { StyleSheet,View, Text,  ScrollView, Dimensions } from 'react-native';
import TouchStyle from './TouchStyle';
import TextStyle from './TextStyle';
import { textGray, darkGray, gray, green, red, white } from '../utils/colors';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const screen = {
  QUESTION: 'question',
  ANSWER: 'answer',
  RESULT: 'result'
};
const answer = {
  CORRECT: 'correct',
  INCORRECT: 'incorrect'
};
const SCREEN_WIDTH = Dimensions.get('window').width;

class IOSPlat extends Component {
  state = {
    show: screen.QUESTION,
    correct: 0,
    incorrect: 0,
    questionCount: this.props.deck.cards.length,
    answered: Array(this.props.deck.cards.length).fill(0)
  };
  handleScroll = () => {
    this.setState({
      show: screen.QUESTION
    });
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
          this.scrollView.scrollTo({ x: (page + 1) * SCREEN_WIDTH });
          this.setState(prevState => ({
            show: screen.QUESTION
          }));
        }
      }
    );
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
    const { cards } = this.props.deck;
    const { show } = this.state;

    if (cards.length === 0) {
      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              You cannot take a quiz because there are no cards in the deck.
            </Text>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Please add some cards and try again.
            </Text>
          </View>
        </View>
      );
    }

    if (this.state.show === screen.RESULT) {
      const {questionCount, correct,  } = this.state;
      const percent = ((correct / questionCount) * 100).toFixed(0);
      const resultStyle =
        percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

      return (
        <View style={styles.pageStyle}>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Quiz Complete!
            </Text>
            <Text style={resultStyle}>
              {correct} / {questionCount} correct
            </Text>
          </View>
          <View style={styles.block}>
            <Text style={[styles.count, { textAlign: 'center' }]}>
              Percentage correct
            </Text>
            <Text style={resultStyle}>{percent}%</Text>
          </View>
          <View>
            <TouchStyle
              btnStyle={{ backgroundColor: green, borderColor: white }}
              onPress={this.handleReset}
            >
              Restart Quiz
            </TouchStyle>
            <TouchStyle
              txtStyle={{ color: textGray }}
              btnStyle={{ backgroundColor: gray, borderColor: textGray }}
              onPress={() => {
                this.handleReset();
                this.props.navigation.goBack();
              }}
            >
              Back To Deck
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
      <ScrollView
        style={styles.container}horizontal={true}
        onMomentumScrollBegin={this.handleScroll}
        pagingEnabled={true}
        ref={scrollView => {
          this.scrollView = scrollView;
        }}
      >
        {cards.map((question, idx) => (
          <View key={idx} style={styles.pageStyle} >
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
                Correct
              </TouchStyle>
              <TouchStyle
                disabled={this.state.answered[idx] === 1}
                btnStyle={{ backgroundColor: red, borderColor: white }}
                onPress={() => this.handleAnswer(answer.INCORRECT, idx)}
                
              >
                Incorrect
              </TouchStyle>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  block: {
    marginBottom: 20
  },
  pageStyle: {
    flex: 1,
    justifyContent: 'space-around',
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: white,
    width: SCREEN_WIDTH
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
    paddingBottom: 20,
    paddingLeft: 16,
    paddingTop: 20,
    paddingRight: 16,
    borderColor: darkGray,
    backgroundColor: white,
    borderRadius: 5,
    flexGrow: 1
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
  },
  questionWrapper: {
    flex: 1,
    justifyContent: 'center'
  },
  questionText: {
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 20
  },
});

const mapStateToProps = (state, { title }) => {
  const deck = state[title];

  return {
    deck
  };
};

export default withNavigation(connect(mapStateToProps)(IOSPlat));