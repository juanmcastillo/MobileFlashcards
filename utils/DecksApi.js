import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const MOBILE_FLASH_CARD_KEY = 'MobileFlashCardKey:decks';
const MOBILE_FLASH_CARD_NOTIFICATION_KEY = 'MobileFlashCardKey:notification';

export function getDecks () {
  return AsyncStorage.getItem(MOBILE_FLASH_CARD_KEY);
}

export function saveDeck (deck) {
  const newDeck = {
    [deck.id]: deck
  };
  
  AsyncStorage.mergeItem(MOBILE_FLASH_CARD_KEY, JSON.stringify(newDeck));
}

export function setLocalNotification(){
  AsyncStorage.getItem(MOBILE_FLASH_CARD_NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
                   .then((data) => {
                        if (data === null) {
                          Notifications.cancelAllScheduledNotificationsAsync();

                          let tomorrow = new Date();

                          tomorrow.setDate(tomorrow.getDate() + 1);
                          
                          tomorrow.setHours(9);

                          tomorrow.setMintutes(0);

                          Notifications.scheduleLocalNotificationAsync({
                              id: 'MFCNID',
                              title: 'Come learn with us!',
                              body: 'You have not practiced today, get on it right away!',
                              ios: {
                                sound: true,
                              },
                              android: {
                                sound: true,
                                priority: 'high',
                                sticky: false,
                                vibrate: true,
                              }
                          }, {
                              time: tomorrow,
                              repeat: 'day',
                          });

                          AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                      })
      }
    })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(MOBILE_FLASH_CARD_NOTIFICATION_KEY)
                     .then(Notifications.cancelAllScheduledNotificationsAsync);
}