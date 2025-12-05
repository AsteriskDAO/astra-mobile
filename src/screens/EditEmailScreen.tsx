import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import BackgroundPattern from '../components/BackgroundPattern';
import { theme } from '../theme/theme';
import { LAYOUT } from '../constants/layout';

const EditEmailScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('hi@asterisk.xyz');
    const [focusedInput, setFocusedInput] = useState(false);

    const handleSave = () => {
        // Handle email change logic
        if (email) {
            // Save email
            navigation.goBack();
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                        size={17}
                        style={StyleSheet.flatten([styles.backButton, { top: insets.top }])}
                    />
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Edit Email</Text>
                        <Logo size={16} tintColor={theme.colors.asteriskPink} style={styles.asteriskLogo} />
                    </View>
                    <View style={styles.headerRight} />
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={[
                            styles.input,
                            focusedInput && styles.inputFocused
                        ]}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter email"
                        placeholderTextColor="#949494"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        onFocus={() => setFocusedInput(true)}
                        onBlur={() => setFocusedInput(false)}
                    />
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            !email && styles.saveButtonDisabled
                        ]}
                        onPress={handleSave}
                        disabled={!email}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancel}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingHorizontal: LAYOUT.CONTENT_PADDING_HORIZONTAL,
        paddingBottom: theme.spacing.bottomNavHeight + theme.spacing.base,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: theme.spacing.base,
        marginBottom: theme.spacing.base,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    headerTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    asteriskLogo: {
        marginLeft: 2,
    },
    headerRight: {
        width: 17,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    label: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textPrimary,
        fontSize: 10,
        lineHeight: 15,
        marginBottom: 5,
    },
    input: {
        height: 30,
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.borderLight,
        borderRadius: 8,
        paddingHorizontal: 13,
        ...theme.typography.presets.body,
        fontSize: 13,
        lineHeight: 20,
        color: theme.colors.textPrimary,
    },
    inputFocused: {
        borderColor: theme.colors.ocean,
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        gap: 10,
    },
    saveButton: {
        height: 35,
        backgroundColor: theme.colors.asteriskPink,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonDisabled: {
        backgroundColor: '#C6C6C6',
    },
    saveButtonText: {
        ...theme.typography.presets.button,
        color: theme.colors.white,
        fontSize: 11,
        lineHeight: 17,
    },
    cancelButton: {
        height: 35,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.asteriskPink,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        ...theme.typography.presets.button,
        color: theme.colors.asteriskPink,
        fontSize: 11,
        lineHeight: 17,
    },
});

export default EditEmailScreen;

