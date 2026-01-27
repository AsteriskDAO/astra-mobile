import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/Button';
import BackgroundPattern from '../../components/BackgroundPattern';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';
import { RootStackParamList } from '../../types/navigation';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
    const navigation = useNavigation<WelcomeScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={styles.content}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to Astra!</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="I am new to Astra"
                        onPress={() => navigation.navigate('CreateAccount')}
                    />

                    <Button
                        title="I have an Astra account"
                        onPress={() => navigation.navigate('Login')}
                        variant="outline"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 35,
        paddingTop: theme.spacing.spacing0,
        paddingBottom: theme.spacing.formMarginBottom,
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        ...theme.typography.presets.welcomeTitle,
        color: theme.colors.asteriskPink,
        textAlign: 'center',
        width: theme.spacing.spacing242,
    },
    buttonContainer: {
        width: '100%',
        gap: theme.spacing.base,
    }
});

export default WelcomeScreen;
