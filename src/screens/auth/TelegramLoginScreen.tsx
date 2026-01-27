import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';
import { theme } from '../../theme/theme';

type TelegramLoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TelegramLogin'>;

const TelegramLoginScreen: React.FC = () => {
    const navigation = useNavigation<TelegramLoginScreenNavigationProp>();

    useEffect(() => {
        // Simulate Telegram login process
        const timer = setTimeout(() => {
            navigation.navigate('ProfileSetup');
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
        backgroundColor: theme.colors.textPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: theme.colors.white,
        fontSize: FONT_SIZES.h2,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default TelegramLoginScreen;

