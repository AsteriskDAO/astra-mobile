import React from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';

const VerificationFailedScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleGetHelp = () => {
        // In a real app, this would open a support link or contact form
        Linking.openURL('mailto:support@asteriskdao.xyz');
    };

    const handleRetry = () => {
        navigation.navigate('IDVerification' as never);
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
        backgroundColor: '#F5F5F5',
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
        fontSize: 40,
        color: 'white',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    helpButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
    retryButton: {
        backgroundColor: 'white',
        borderColor: theme.colors.asteriskPink,
        borderWidth: 1,
    },
});

export default VerificationFailedScreen;

