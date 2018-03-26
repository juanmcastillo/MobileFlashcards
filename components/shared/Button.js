import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StyleSheet 
} from 'react-native';

function Button({backgroundColor, text, onPress}){
    return (
        <View style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor : 'black'}]}>

            <TouchableOpacity style={styles.button} onPress={onPress}>

                <Text style={backgroundColor === 'white' ? styles.blackText : styles.whiteText }>
                {
                    text
                }
                </Text>

            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
    button: {
        alignItems: 'center',
        borderRadius: 20,
        borderColor: 'gray',
        height: 40,
        justifyContent: 'center',
        width: 100,
    },
    whiteText: {
        color: 'white',
        fontSize: 20,
    },
    blackText: {
        color: 'black',
        fontSize: 20,
    },
});

export default Button;