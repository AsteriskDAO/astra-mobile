import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';
import BackgroundPattern from '../../components/BackgroundPattern';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { theme } from '../../theme/theme';
import { LAYOUT } from '../../constants/layout';
import { apiService } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import { useApiCall } from '../../hooks/useApiCall';
import { validateRequired } from '../../utils/validation';

type FeedbackType = 'Bug Report' | 'General Feedback' | 'Feature Request';

interface FeedbackTypeConfig {
    type: FeedbackType;
    placeholder: string;
    description: string;
}

const AppFeedbackScreen: React.FC = () => {
    const navigation = useNavigation();
    const { userHash } = useUser();
    const [feedbackType, setFeedbackType] = useState<FeedbackType>('Bug Report');
    const [feedbackText, setFeedbackText] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

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

    const { execute, isLoading: isSubmitting } = useApiCall({
        showErrorAlert: true,
        errorMessage: 'Failed to submit feedback',
        onSuccess: () => {
            Alert.alert('Success', 'Thank you for your feedback!', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        },
    });

    const handleSubmit = async () => {
        const validation = validateRequired(feedbackText, 'Feedback');
        if (!validation.isValid) {
            Alert.alert('Error', validation.error);
            return;
        }

        // TODO: Uncomment API calls when ready
        // await execute(async () => {
        //     return await apiService.createFeedback({
        //         type: feedbackType,
        //         message: feedbackText,
        //         user_hash: userHash || undefined,
        //     });
        // });
        
        // Temporary: Show success message for testing
        Alert.alert('Success', 'Thank you for your feedback!', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title="App Feedback"
                    onBack={() => navigation.goBack()}
                />

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
                    <Input
                        placeholder={currentConfig.placeholder}
                        value={feedbackText}
                        onChangeText={setFeedbackText}
                        multiline
                        numberOfLines={8}
                        style={{ marginBottom: 0 }}
                    />
                </View>

                {/* Submit Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title={isSubmitting ? 'Submitting...' : 'Share with Astra'}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
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
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    description: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    buttonContainer: {
        marginTop: theme.spacing.base,
        marginBottom: theme.spacing.bottomNavHeight + theme.spacing.base,
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

