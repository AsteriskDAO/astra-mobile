import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../components/Input';
import Button from '../components/Button';
import BackgroundPattern from '../components/BackgroundPattern';
import BackButton from '../components/BackButton';
import { theme } from '../theme/theme';
import { commonStyles } from '../styles/common';
import { LAYOUT } from '../constants/layout';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [formData, setFormData] = useState({
        email: 'email@asteriskdao.xyz',
        password: '*****',
    });

    const handleLogin = () => {
        // Simulate login process
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

            <ScrollView
                style={styles.content}
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

                <View style={styles.buttonContainer}>
                    <Button
                        title="Log in"
                        onPress={handleLogin}
                    />

                    <Button
                        title="Import my telegram profile"
                        onPress={handleTelegramLogin}
                        variant="outline"
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
    backButton: {
        position: 'absolute',
        left: theme.spacing.xl,
        zIndex: 10,
    },
    content: {
        flex: 1,
        paddingHorizontal: LAYOUT.AUTH_CONTENT_PADDING_HORIZONTAL,
    },
    scrollContent: {
        paddingTop: LAYOUT.LOGIN_TITLE_TOP_PADDING,
        paddingBottom: theme.spacing.formMarginBottom,
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
        width: '100%',
        gap: theme.spacing.base,
    }
});

export default LoginScreen;

