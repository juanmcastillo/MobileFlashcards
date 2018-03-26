import _ from 'lodash';
import React from 'react';
import Button from '../shared/Button';
import {
    ScrollView, 
    View,
    Text,
    TextInput,
    StyleSheet
  } from 'react-native';
import { connect } from 'react-redux';
import { setLocalNotification, clearLocalNotification } from '../../utils/DecksApi';

class Quiz extends React.Component {

    state = {
        showAnswer: false,
        currentQuestion: 0,
        totalQuestions: 0,
        correctCount: 0,
        incorrectCount: 0,
    }

    componentDidMount(){
        const { deck } = this.props;

        this.setState({
            totalQuestions: deck.questions.length
        });

        clearLocalNotification().then(setLocalNotification);
    }

    nextQuestion(){
        if(this.state.currentQuestion + 1 <= this.state.totalQuestions){
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            });
        }
    }

    registerUserAnswer(answer){

        if(answer > 0){
            this.setState({
                correctCount: this.state.correctCount + 1
            });
        }else{
            this.setState({
                correcincorrectCounttCount: this.state.incorrectCount + 1
            });
        }

        this.nextQuestion();
    }

    restart(){
        this.setState({
            showAnswer: false,
            currentQuestion: 0,
            correctCount: 0,
            incorrectCount: 0
        });
    }

    render(){
        const { deck } = this.props;

        const { 
            currentQuestion,
            totalQuestions,
            correctCount,
            incorrectCount
         } = this.state;

        const card = deck.questions[currentQuestion];

        return (
            <ScrollView>
            {
                currentQuestion === totalQuestions 
                ? (
                    <View style={styles.container}>

                        <Text style={styles.title}>
                        {
                            `You scored ${_.round((correctCount/totalQuestions) * 100)}% !`
                        }
                        </Text>

                        <View style={styles.buttonContainer}>

                            <Button backgroundColor={'white'}
                                    onPress={() => this.props.navigation.goBack()}
                                    text={'Back'}/>

                            <Button onPress={() => this.restart()}
                                    text={'Restart'}/>

                        </View>

                    </View>
                ) 
                : (
                    <View>

                        <Text style={styles.questionCount}>{currentQuestion + 1}/{totalQuestions}</Text>

                        <View style={styles.container}>

                            <Text style={styles.title}>
                            {
                                this.state.showAnswer ? card.answer : card.question
                            }
                            </Text>
                            
                            <View style={styles.buttonContainer}>

                                <Button backgroundColor={this.state.showAnswer ? 'black' : 'gray'}
                                        onPress={() => this.setState({showAnswer: !this.state.showAnswer})}
                                        text={this.state.showAnswer ? 'Question' :'Answer' }/>

                                <Button backgroundColor={'green'}
                                        onPress={() => this.registerUserAnswer(1)}
                                        text={'Correct'}/>

                                <Button backgroundColor={'red'}
                                        onPress={() => this.registerUserAnswer(-1)}
                                        text={'Incorrect'}/>
                            
                            </View>
                            
                        </View>

                    </View>
                )
            }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        marginTop: 50,
        marginBottom: 50
    },
    title: {
      fontSize: 25,
      flexWrap: 'wrap',
      marginTop: 50,
      marginRight: 20,
      marginLeft: 20,
    },
    questionCount: {
        fontWeight: 'bold',
        fontSize: 20,
        marginLeft: 15
    }
  })

const mapStateToProps = (state, props) => ({
    deck: state.decks &&
          state.decks.decks.length > 0 ? state.decks.decks.find(d => d.id === props.navigation.state.params.deckId) 
                                       : undefined
});

export default connect(mapStateToProps)(Quiz);