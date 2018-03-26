import React from 'react';
import Button from '../shared/Button';
import { connect } from 'react-redux';
import { 
    View,
    Text,
    TextInput,
    StyleSheet
 } from 'react-native';
import { dispatchUpdateDeck } from '../../actions/decks/Decks';

class AddCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    addQuestionToDeck = () => {
        const { deck } = this.props;
        const { question, answer } = this.state;

        if(question && answer){
            deck.questions.push({
                question, 
                answer
            });

            this.props.addCard(deck);

            this.setState({
                question: '',
                answer: ''
            });

            this.props.navigation.state.params.onGoBack();

            this.props.navigation.goBack();
        }else{
            alert('Provide a question, and an answer for your card!');
        }
    }

    render(){
        return (
            <View style={styles.container}>

                <TextInput value={this.state.question}
                           style={styles.question}
                           placeHolder={'Question...'}
                           placeholderTextColor={'gray'}
                           onChangeText={(text) => this.setState({
                               question: text
                           })}/>

                <TextInput value={this.state.answer}
                           style={styles.answer}
                           placeHolder={'Answer...'}
                           placeholderTextColor={'gray'}
                           onChangeText={(text) => this.setState({
                               answer: text
                           })}/>

                <Button onPress={this.addQuestionToDeck}
                        text={'Submit'}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1
    },
    answer: {
        height: 50,
        marginTop: 4,
        width: 300,
    },
    question: {
        height: 50,
        marginTop: 4,
        width: 300,
    }
  });

const mapStateToProps = (state, props) => ({
    deck: state.decks &&
          state.decks.decks.length > 0 ? state.decks.decks.find(d => d.id === props.navigation.state.params.deckId) 
                                       : undefined
});

const mapDispatchToProps = (dispatch) => ({
    addCard: (updatedDeck) => dispatch(dispatchUpdateDeck(updatedDeck))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);