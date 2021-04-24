import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import colors from '../styles/colors';
import imgSrc from '../assets/gabriel-profile.jpg';
import fonts from '../styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Header() {
    const [userName, setUserName] = useState<string>();

    useEffect(() =>{
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setUserName(user || '');
        }
        loadStorageUserName()
    }, [])

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.greetings }>
                    Olá,
                </Text>
                <Text style={ styles.username }>
                    { userName }
                </Text>
            </View>
            <Image source={ imgSrc } style={ styles.image } />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: getStatusBarHeight(),
    },
    greetings: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text,
    },
    username: {
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
    }
})