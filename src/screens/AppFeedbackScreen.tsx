import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import BackgroundPattern from '../components/BackgroundPattern';
import Button from '../components/Button';
import { theme } from '../theme/theme';
import { LAYOUT } from '../constants/layout';
import { commonStyles } from '../styles/common';

type FeedbackType = 'Bug Report' | 'General Feedback' | 'Feature Request';

interface FeedbackTypeConfig {
    type: FeedbackType;
    placeholder: string;
    description: string;
}

const AppFeedbackScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [feedbackType, setFeedbackType] = useState<FeedbackType>('Bug Report');
    const [feedbackText, setFeedbackText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);

    const feedbackTypes: FeedbackType[] = ['Bug Report', 'General Feedback', 'Feature Request'];

    const feedbackConfigs: Record<FeedbackType, FeedbackTypeConfig> = {
        'Bug Report': {
            type: 'Bug Report',
            placeholder: 'Report the bug you encountered here...',
            description: 'Your feedback helps us make Astra better for you and other women.',
        },
        'General Feedback': {
            type: 'General Feedback',
            placeholder: 'Type your feedback here...',
            description: 'Please share your thoughts and ideas on what we can do better. Your feedback helps us make Astra better for you and other women.',
        },
        'Feature Request': {
            type: 'Feature Request',
            placeholder: 'Type your request here...',
            description: 'Please share what you think is missing in the App at this stage..',
        },
    };

    const currentConfig = feedbackConfigs[feedbackType];

    const handleSubmit = () => {
        if (feedbackText.trim()) {
            // TODO: Implement feedback submission logic
            // Show success message and navigate back
            navigation.goBack();
        }
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
                        <Text style={styles.headerTitle}>App Feedback</Text>
                        <Logo size={16} tintColor={theme.colors.asteriskPink} style={styles.asteriskLogo} />
                    </View>
                    <View style={styles.headerRight} />
                </View>

                {/* Feedback Type Selection */}
                <View style={styles.section}>
                    <Text style={styles.question}>What what you like to share?</Text>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setShowDropdown(true)}
                    >
                        <Text style={styles.dropdownText}>{feedbackType}</Text>
                        <Ionicons name="chevron-down" size={20} color={theme.colors.textPrimary} />
                    </TouchableOpacity>
                </View>

                {/* Description Text */}
                <View style={styles.section}>
                    <Text style={styles.description}>{currentConfig.description}</Text>
                </View>

                {/* Feedback Input */}
                <View style={styles.section}>
                    <TextInput
                        style={[
                            styles.textArea,
                            focusedInput ? styles.textAreaFocused : styles.textAreaUnfocused,
                        ]}
                        placeholder={currentConfig.placeholder}
                        placeholderTextColor={theme.colors.textDisabled}
                        value={feedbackText}
                        onChangeText={setFeedbackText}
                        multiline
                        numberOfLines={8}
                        textAlignVertical="top"
                        onFocus={() => setFocusedInput(true)}
                        onBlur={() => setFocusedInput(false)}
                    />
                </View>

                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Share with Astra"
                        onPress={handleSubmit}
                        style={styles.submitButton}
                        textStyle={styles.submitButtonText}
                    />
                </View>
            </ScrollView>

            {/* Dropdown Modal */}
            <Modal
                visible={showDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDropdown(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setShowDropdown(false)}
                >
                    <Pressable
                        style={styles.dropdownModal}
                        onPress={(e) => e.stopPropagation()}
                    >
                        {feedbackTypes.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.dropdownOption,
                                    feedbackType === type && styles.dropdownOptionSelected,
                                ]}
                                onPress={() => {
                                    setFeedbackType(type);
                                    setShowDropdown(false);
                                }}
                            >
                                <Text
                                    style={[
                                        styles.dropdownOptionText,
                                        feedbackType === type && styles.dropdownOptionTextSelected,
                                    ]}
                                >
                                    {type}
                                </Text>
                                {feedbackType === type && (
                                    <Ionicons name="checkmark" size={20} color={theme.colors.asteriskPink} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </Pressable>
                </Pressable>
            </Modal>
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
    section: {
        marginBottom: theme.spacing.lg,
    },
    question: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: theme.spacing.radius.base,
        paddingHorizontal: theme.spacing.inputPaddingHorizontal,
        paddingVertical: theme.spacing.inputPaddingVertical,
        height: theme.spacing.inputHeight,
        borderWidth: theme.spacing.borderWidth.thin,
        borderColor: theme.colors.inputBorder || 'transparent',
    },
    dropdownText: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
    },
    description: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    textArea: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.spacing.radius.base,
        paddingHorizontal: theme.spacing.inputPaddingHorizontal,
        paddingVertical: theme.spacing.inputPaddingVertical,
        minHeight: 150,
        fontSize: theme.typography.fontSize.md,
        lineHeight: theme.typography.lineHeight.large,
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
        borderWidth: theme.spacing.borderWidth.thin,
    },
    textAreaFocused: {
        borderColor: theme.colors.ocean,
    },
    textAreaUnfocused: {
        borderColor: 'transparent',
    },
    buttonContainer: {
        marginTop: theme.spacing.base,
        marginBottom: theme.spacing.bottomNavHeight + theme.spacing.base,
    },
    submitButton: {
        ...commonStyles.buttonBase,
        ...commonStyles.buttonPrimary,
        backgroundColor: theme.colors.asteriskPink,
    },
    submitButtonText: {
        ...commonStyles.buttonTextPrimary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownModal: {
        backgroundColor: theme.colors.white,
        borderRadius: theme.spacing.radius.base,
        width: '80%',
        maxWidth: 300,
        paddingVertical: theme.spacing.xs,
    },
    dropdownOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.inputPaddingHorizontal,
        paddingVertical: theme.spacing.md,
    },
    dropdownOptionSelected: {
        backgroundColor: theme.colors.background,
    },
    dropdownOptionText: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
    },
    dropdownOptionTextSelected: {
        color: theme.colors.asteriskPink,
        fontWeight: '500',
    },
});

export default AppFeedbackScreen;

