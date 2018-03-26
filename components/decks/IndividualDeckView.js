import React from 'react';
import Button from '../shared/Button';
import { 
    View,
    Text,
    StyleSheet
 } from 'react-native';
import { connect } from 'react-redux';
import { dispatchGetDecks } from '../../actions/decks/Decks';

class IndividualDeckView extends React.Component {

    render(){
        const { deck } = this.props;

        const routeParams = {
            deckId: deck.id,
            onGoBack: () => this.props.getDecks()
        };
        
        return (
            <View style={styles.container}>

                <Text style={styles.title}>{deck.title}</Text>

                <Text style={styles.cardCount}>{`${deck.questions ? deck.questions.length : 0} Card(s)`}</Text>

                <View style={styles.buttonContainer}>

                    <Button backgroundColor={'white'}
                            onPress={() => this.props.navigation.navigate('addCard', routeParams)}
                            text={'Add Card'}/>

                    {
                        deck.questions.length > 0 && (
                            <Button onPress={() => this.props.navigation.navigate('quiz', routeParams)}
                                    text={'Start Quiz'}/>
                        )
                    }

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      borderStyle: "solid",
      borderColor: "black",
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonContainer: {
        marginTop: 15,
        marginBottom: 5
    },
    title: {
      fontSize: 25,
    },
    cardCount: {
      color: 'gray',
      fontSize: 20,
    }
});

const mapStateToProps = (state, props) => ({
    deck: state.decks &&
          state.decks.decks.length > 0 ? state.decks.decks.find(d => d.id === props.navigation.state.params.deckId) 
                                       : undefined
});

const mapDispatchToProps = (dispatch) => ({
    getDecks: () => dispatch(dispatchGetDecks)
});

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDeckView);