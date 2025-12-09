import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import BackgroundPattern from '../components/BackgroundPattern';
import { theme } from '../theme/theme';
import { commonStyles } from '../styles/common';

const VerificationSuccessScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>All verified!</Text>
                    <Text style={styles.description}>
                        Let's get your profile set up so Astra understands your health status.
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Continue"
                        onPress={() => navigation.navigate('ProfileSetup' as never)}
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.spacing276,
        width: theme.spacing.spacing269,
    },
    title: {
        ...theme.typography.presets.h1,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
        width: theme.spacing.buttonWidth,
    },
    description: {
        ...theme.typography.presets.h2,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        width: theme.spacing.spacing269,
    },
    buttonContainer: {
        width: theme.spacing.buttonWidth,
        alignSelf: 'center',
    },
});

export default VerificationSuccessScreen;

