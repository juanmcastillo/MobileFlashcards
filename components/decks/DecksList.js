import _ from 'lodash';
import React from 'react';
import ShortId from 'shortid';
import Button from '../shared/Button';
import { connect } from 'react-redux';
import { 
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet 
} from 'react-native';
import { dispatchGetDecks } from '../../actions/decks/Decks';

class DeckList extends React.Component {

    componentDidMount(){
        this.props.getDecks();
    }

    render(){
        return (
            <View>
                
                {
                    this.props.decks && this.props.decks.length > 0 ? (
                        <FlatList data={this.props.decks}
                                  keyExtractor={() => ShortId.generate()}
                                  renderItem={({item}) => 
                                    <TouchableOpacity style={styles.deckContainer} onPress={() => this.props.navigation.navigate('individualDeckView', {deckId: item.id})}>

                                        <View>

                                            <Text style={styles.title}>{_.startCase(item.title)}</Text>

                                            <Text style={styles.cardsCount}>{`${item.questions ? item.questions.length : 0} Card(s)`}</Text>

                                        </View>

                                    </TouchableOpacity>
                                    }/>
                    ) : (
                        <View style={styles.container}>

                            <Text style={styles.title}>Nothing in here</Text>

                            <Button text={'Add Deck'}
                                    onPress={() => this.props.navigation.navigate('addDeck')}/>

                        </View>
                    )
                }

            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    deckContainer: {
        alignItems: "center",
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,        
        justifyContent: "center",
        height: 80
    },
    title: {
        fontSize: 25
    },
    cardsCount: {
        fontSize: 20
    }
  });

const mapStateToProps = (state, props) => ({
    decks: state.decks.decks
});

const mapDispatchToProps = (dispatch) => ({
    getDecks: () => dispatch(dispatchGetDecks)
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);