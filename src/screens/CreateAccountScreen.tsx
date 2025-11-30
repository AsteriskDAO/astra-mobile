import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import Button from '../components/Button';
import BackgroundPattern from '../components/BackgroundPattern';
import BackButton from '../components/BackButton';
import { theme } from '../theme/theme';
import { commonStyles } from '../styles/common';

const CreateAccountScreen: React.FC = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: 'email@asteriskdao.xyz',
        password: '*****',
        confirmPassword: '*****',
    });
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const handleNext = () => {
        navigation.navigate('IDVerification' as never);
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={styles.headerContainer}>
                <BackButton
                    onPress={() => navigation.goBack()}
                    size={17}
                    style={styles.backButton}
                />
                <Header
                    currentStep={1}
                    totalSteps={3}
                />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Let's create your account!</Text>
                    <Text style={styles.subtitle}>Set your login details.</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={[
                            styles.emailLabel,
                            focusedInput === 'email' ? styles.labelFocused : styles.labelUnfocused
                        ]}>
                            Email
                        </Text>
                        <TextInput
                            style={[
                                styles.emailInput,
                                focusedInput === 'email' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            value={formData.email}
                            onChangeText={(text) => setFormData({ ...formData, email: text })}
                            placeholder="email@asteriskdao.xyz"
                            placeholderTextColor={theme.colors.textSecondary}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={[
                            styles.passwordLabel,
                            focusedInput === 'password' ? styles.labelFocused : styles.labelUnfocused
                        ]}>
                            Password
                        </Text>
                        <TextInput
                            style={[
                                styles.passwordInput,
                                focusedInput === 'password' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            value={formData.password}
                            onChangeText={(text) => setFormData({ ...formData, password: text })}
                            secureTextEntry
                            placeholder="*****"
                            placeholderTextColor={theme.colors.textSecondary}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={[
                            styles.passwordLabel,
                            focusedInput === 'confirmPassword' ? styles.labelFocused : styles.labelUnfocused
                        ]}>
                            Confirm Password
                        </Text>
                        <TextInput
                            style={[
                                styles.passwordInput,
                                focusedInput === 'confirmPassword' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            value={formData.confirmPassword}
                            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                            secureTextEntry
                            placeholder="*****"
                            placeholderTextColor={theme.colors.textSecondary}
                            onFocus={() => setFocusedInput('confirmPassword')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        variant="outline"
                        style={styles.nextButton}
                        textStyle={styles.nextButtonText}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    headerContainer: {
        ...commonStyles.headerContainer,
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    content: {
        ...commonStyles.content,
    },
    scrollContent: {
        ...commonStyles.scrollContent,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: theme.spacing['5xl'],
        marginBottom: theme.spacing.formMarginBottom,
    },
    title: {
        ...commonStyles.title,
        width: 260,
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...commonStyles.subtitle,
        width: 243,
    },
    formContainer: {
        ...commonStyles.formContainer,
    },
    inputWrapper: {
        ...commonStyles.inputWrapper,
    },
    emailLabel: {
        ...commonStyles.label,
        marginBottom: 0,
    },
    labelFocused: {
        ...commonStyles.labelFocused,
    },
    labelUnfocused: {
        ...commonStyles.label,
    },
    emailInput: {
        ...commonStyles.inputBase,
        marginTop: 0,
    },
    inputFocused: {
        ...commonStyles.inputFocused,
    },
    inputUnfocused: {
        ...commonStyles.inputUnfocused,
    },
    passwordLabel: {
        ...commonStyles.label,
        marginBottom: 0,
    },
    passwordInput: {
        ...commonStyles.inputBase,
        marginTop: 0,
    },
    buttonContainer: {
        ...commonStyles.formContainer,
        marginTop: 0,
    },
    nextButton: {
        ...commonStyles.buttonBase,
        ...commonStyles.buttonOutline,
    },
    nextButtonText: {
        ...commonStyles.buttonTextSecondary,
    },
});

export default CreateAccountScreen;

