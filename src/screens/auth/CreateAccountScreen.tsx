import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackgroundPattern from '../../components/BackgroundPattern';
import BackButton from '../../components/BackButton';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';
import { LAYOUT } from '../../constants/layout';
import { apiService } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import { useApiCall } from '../../hooks/useApiCall';
import { validateEmail, validatePassword, validatePasswordMatch } from '../../utils/validation';

const CreateAccountScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const { execute, isLoading } = useApiCall({
        showErrorAlert: true,
        errorMessage: 'Failed to create account',
        onSuccess: () => {
            navigation.navigate('ProfileIntro' as never);
        },
    });

    const handleNext = async () => {
        // Validate form
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
            Alert.alert('Error', emailValidation.error);
            return;
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            Alert.alert('Error', passwordValidation.error);
            return;
        }

        const passwordMatchValidation = validatePasswordMatch(formData.password, formData.confirmPassword);
        if (!passwordMatchValidation.isValid) {
            Alert.alert('Error', passwordMatchValidation.error);
            return;
        }

        // Execute registration
        // TODO: Uncomment API calls when ready
        // await execute(async () => {
        //     const response = await apiService.register({
        //         email: formData.email,
        //         password: formData.password,
        //     });

        //     // Fetch full user data and save to context
        //     if (response.user.userHash) {
        //         const userData = await apiService.getUser(response.user.userHash);
        //         setUser(userData);
        //     }

        //     return response;
        // });

        // Temporary: Navigate directly for testing
        navigation.navigate('ProfileIntro' as never);
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
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

            <View style={styles.content}>
                {/* First view - empty spacer */}
                <View style={styles.spacer} />

                {/* Second view - scrollable content */}
                <View style={styles.contentSection}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>Let's create your account!</Text>
                            <Text style={styles.subtitle}>Set your login details.</Text>
                        </View>

                        <View style={styles.formContainer}>
                            <Input
                                label="Email"
                                placeholder="email@asteriskdao.xyz"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={styles.input}
                            />

                            <Input
                                label="Password"
                                placeholder="Enter password (min 8 characters)"
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                secureTextEntry
                                style={styles.input}
                            />

                            <Input
                                label="Confirm Password"
                                placeholder="Confirm your password"
                                value={formData.confirmPassword}
                                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                    </ScrollView>
                </View>

                {/* Third view - button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={isLoading ? "Creating account..." : "Next"}
                        onPress={handleNext}
                        variant="outline"
                        disabled={isLoading}
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
    headerContainer: {
        paddingHorizontal: LAYOUT.AUTH_CONTENT_PADDING_HORIZONTAL,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    content: {
        flex: 1,
        paddingHorizontal: LAYOUT.AUTH_CONTENT_PADDING_HORIZONTAL,
        paddingTop: theme.spacing.titleMarginTop,
        paddingBottom: theme.spacing.formMarginBottom,
    },
    spacer: {
        flex: 0.1,
    },
    contentSection: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: LAYOUT.SIGNUP_TITLE_TOP_PADDING,
        marginBottom: theme.spacing.formMarginBottom,
    },
    title: {
        ...commonStyles.title,
        width: '100%',
        marginBottom: theme.spacing.sm,
    },
    subtitle: {
        ...commonStyles.subtitle,
        width: '100%',
    },
    formContainer: {
        ...commonStyles.formContainer,
    },
    input: {
        marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
        paddingTop: theme.spacing.md,
        width: '100%',
    },
});

export default CreateAccountScreen;

