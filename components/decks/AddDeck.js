import React from 'react';
import Button from '../shared/Button';
import { connect } from 'react-redux';
import { 
    View,
    Text,
    TextInput,
    StyleSheet
 } from 'react-native';
import { dispatchSaveDeck } from '../../actions/decks/Decks';

class AddDeck extends React.Component {

    state = {
        title: ''
    }

    persistDeck = () =>{

        if(this.state.title !== ''){
            this.props.saveDeck({
                title: this.state.title,
                questions: []
            });

            this.setState({
                title: ''
            });

            this.props.navigation.navigate('deckList');
        }else{
            alert('Type a title for your Deck!');
        }
    }

    render(){
        const { saveDeck } = this.props;

        return (
            <View style={styles.addDeckContainer}>

                <Text style={styles.title}>What is the title of your new deck?</Text>

                <TextInput value={this.state.title}
                           style={styles.titleInput}
                           placeHolder={'Title'}
                           placeholderTextColor={'gray'}
                           onChangeText={(text) => this.setState({
                               title: text
                           })}/>

                <Button text={'Submit'}
                        onPress={this.persistDeck}/>
                        
            </View>
        );
    }
}

const styles = StyleSheet.create({
    addDeckContainer: {
      justifyContent: "center",
      alignItems: "center"
    },
    title: {
      fontSize: 20,
      marginTop: 50,
      marginBottom: 50,
    },
    titleInput: {
        height: 50,
        width: 300,
    }
  })

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = (dispatch) => ({
    saveDeck: (deck) => dispatch(dispatchSaveDeck(deck))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDeck);