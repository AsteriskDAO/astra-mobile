import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import Button from '../../components/Button';
import BackgroundPattern from '../../components/BackgroundPattern';
import BackButton from '../../components/BackButton';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';
import { LAYOUT } from '../../constants/layout';
import { apiService } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import { useApiCall } from '../../hooks/useApiCall';
import { validateEmail, validateRequired } from '../../utils/validation';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { execute, isLoading } = useApiCall({
        showErrorAlert: true,
        errorMessage: 'Invalid credentials',
        onSuccess: () => {
            navigation.navigate('MainContainer' as never);
        },
    });

    const handleLogin = async () => {
        // Validate form
        const emailValidation = validateEmail(formData.email);
        if (!emailValidation.isValid) {
            Alert.alert('Error', emailValidation.error);
            return;
        }

        const passwordValidation = validateRequired(formData.password, 'Password');
        if (!passwordValidation.isValid) {
            Alert.alert('Error', passwordValidation.error);
            return;
        }

        // Execute login
        // TODO: Uncomment API calls when ready
        // const response = await execute(async () => {
        //     const loginResponse = await apiService.login({
        //         email: formData.email,
        //         password: formData.password,
        //     });
            
        //     // Fetch full user data and save to context
        //     if (loginResponse.user.userHash) {
        //         const userData = await apiService.getUser(loginResponse.user.userHash);
        //         setUser(userData);
        //     }
            
        //     return loginResponse;
        // });
        
        // Temporary: Navigate directly for testing
        navigation.navigate('MainContainer' as never);
    };

    const handleTelegramLogin = () => {
        navigation.navigate('TelegramLogin' as never);
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <BackButton
                onPress={() => navigation.goBack()}
                size={17}
                style={[styles.backButton,{ top: insets.top }]}
            />

            <View style={styles.content}>
                {/* First view - empty spacer */}
                <View style={styles.spacer} />

                {/* Second view - scrollable content */}
                <View style={styles.contentSection}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <Text style={styles.title}>Log in to your account</Text>

                        <View style={styles.formContainer}>
                            <Input
                                label="Email"
                                value={formData.email}
                                onChangeText={(text) => setFormData({ ...formData, email: text })}
                                style={styles.input}
                            />

                            <Input
                                label="Password"
                                value={formData.password}
                                onChangeText={(text) => setFormData({ ...formData, password: text })}
                                secureTextEntry
                                style={styles.input}
                            />
                        </View>
                    </ScrollView>
                </View>

                {/* Third view - buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={isLoading ? "Logging in..." : "Log in"}
                        onPress={handleLogin}
                        disabled={isLoading}
                    />

                    <Button
                        title="Import my telegram profile"
                        onPress={handleTelegramLogin}
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
    backButton: {
        position: 'absolute',
        left: theme.spacing.xl,
        zIndex: 10,
    },
    content: {
        flex: 1,
        paddingHorizontal: LAYOUT.AUTH_CONTENT_PADDING_HORIZONTAL,
        paddingTop: LAYOUT.LOGIN_TITLE_TOP_PADDING,
        paddingBottom: theme.spacing.formMarginBottom,
    },
    spacer: {
        flex: 0.1,
    },
    contentSection: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    title: {
        ...theme.typography.presets.h1,
        lineHeight: theme.typography.lineHeight['3xl'],
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.spacing60,
        width: theme.spacing.spacing198,
    },
    formContainer: {
        width: '100%',
        marginBottom: theme.spacing.formMarginBottom,
    },
    input: {
        marginBottom: theme.spacing.lg,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        gap: theme.spacing.base,
    }
});

export default LoginScreen;

