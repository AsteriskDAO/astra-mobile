import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelegramLoginScreen: React.FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Simulate Telegram login process
        const timer = setTimeout(() => {
            navigation.navigate('ProfileSetup' as never);
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>loging into</Text>
            <Text style={styles.text}>Telegram</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default TelegramLoginScreen;

