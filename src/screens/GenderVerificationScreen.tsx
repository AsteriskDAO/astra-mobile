import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import Button from '../components/Button';
import BackgroundPattern from '../components/BackgroundPattern';

const GenderVerificationScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <Header
                    onBack={() => navigation.goBack()}
                    currentStep={1}
                    totalSteps={3}
                />
            </View>

            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <View style={styles.handIcon}>
                        <Text style={styles.handEmoji}>✋</Text>
                    </View>
                </View>

                <Text style={styles.title}>Astra is for</Text>
                <Text style={styles.highlightedText}>women's health</Text>
                <Text style={styles.description}>
                    Only people who identify as women can create an account.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        paddingHorizontal: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
    },
    iconContainer: {
        marginBottom: 40,
    },
    handIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
    },
    handEmoji: {
        fontSize: 40,
        color: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333333',
        textAlign: 'center',
        marginBottom: 8,
    },
    highlightedText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E91E63',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default GenderVerificationScreen;
