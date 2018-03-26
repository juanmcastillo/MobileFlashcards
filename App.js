import React from 'react';
import ReducerRegistry from './reducers/ReducerRegistry';
import thunk from 'redux-thunk';
import DeckList from './components/decks/DecksList';
import AddDeck from './components/decks/AddDeck';
import IndividualDeckView from './components/decks/IndividualDeckView';
import AddCard from './components/decks/AddCard';
import Quiz from './components/decks/Quiz';

import { Provider } from 'react-redux'
import { Constants } from 'expo';
import { StyleSheet, View, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, compose } from 'redux'

const Tabs = TabNavigator({
  deckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS'
    },
  },
  addDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK'
    },
  }
}, {
  navigationOptions: {
    backgroundColor: 'black',
    header: null,
  },
  tabBarOptions: {
    activeTintColor: 'white',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'black',
    }
  },
});

const MainNavigator = StackNavigator({
  home: {
    screen: Tabs
  },

  individualDeckView: {
    screen: IndividualDeckView,
    navigationOptions: {
      headerTitle: "Deck Details",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    },
  },

  addCard: {
    screen: AddCard,
    navigationOptions: {
      headerTitle: "Create a Card",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },

  quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTitle: "Quiz Time!",
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'black',
      }
    }
  },

});

const middlewares = compose(applyMiddleware(thunk));

const store = createStore(ReducerRegistry,  middlewares);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>

          <View style={styles.statusBar}>
            <StatusBar 
                       backgroundColor="black"
                       barStyle="light-content"/>
          </View>
          
          <MainNavigator />
        </View>          
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: 'black',
    height: Constants.statusBarHeight
  }
});
