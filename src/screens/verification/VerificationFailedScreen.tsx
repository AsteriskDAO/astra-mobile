import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type VerificationFailedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerificationFailed'>;

const VerificationFailedScreen: React.FC = () => {
    const navigation = useNavigation<VerificationFailedScreenNavigationProp>();

    const handleGetHelp = () => {
        // In a real app, this would open a support link or contact form
        Linking.openURL('mailto:support@asteriskdao.xyz');
    };

    const handleRetry = () => {
        navigation.navigate('IDVerification');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.xMark}>✕</Text>
                </View>

                <Text style={styles.title}>Verification failed</Text>
                <Text style={styles.description}>
                    It's best to get support so we can help you complete your account setup.
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Get help from a human"
                        onPress={handleGetHelp}
                        style={styles.helpButton}
                    />

                    <Button
                        title="Retry anyway"
                        onPress={handleRetry}
                        variant="outline"
                        style={styles.retryButton}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: theme.colors.asteriskPink,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    xMark: {
        fontSize: FONT_SIZES.displayMedium,
        color: theme.colors.white,
        fontWeight: 'bold',
    },
    title: {
        fontSize: FONT_SIZES.h1,
        fontWeight: 'bold',
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.base,
    },
    description: {
        fontSize: FONT_SIZES.body,
        color: theme.colors.textLight,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        gap: theme.spacing.base,
    },
    helpButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
    retryButton: {
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.asteriskPink,
        borderWidth: 1,
    },
});

export default VerificationFailedScreen;

