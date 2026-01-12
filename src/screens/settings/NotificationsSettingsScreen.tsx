import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';
import BackgroundPattern from '../../components/BackgroundPattern';
import Toggle from '../../components/Toggle';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';
import { apiService } from '../../services/api';
import { useApiCall } from '../../hooks/useApiCall';

const NotificationsSettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [reminderFrequency, setReminderFrequency] = useState<'daily' | 'specific_days' | 'weekly'>('weekly');
    const [reminderDays, setReminderDays] = useState<string[]>([]);
    const [reminderDay, setReminderDay] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [followSubstack, setFollowSubstack] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [showFrequencyModal, setShowFrequencyModal] = useState(false);
    const [showDayModal, setShowDayModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { execute: saveSettings, isLoading: isSaving } = useApiCall({
        showErrorAlert: true,
        errorMessage: 'Failed to save settings',
        onSuccess: () => {
            Alert.alert('Success', 'Notification settings saved successfully');
        },
    });

    const frequencyOptions: Array<{ label: string; value: 'daily' | 'specific_days' | 'weekly' }> = [
        { label: 'Daily', value: 'daily' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Specific Days', value: 'specific_days' },
    ];
    const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    useEffect(() => {
        loadNotificationSettings();
    }, []);

    const loadNotificationSettings = async () => {
        setIsLoading(true);
        try {
            // TODO: Uncomment API calls when ready
            // const settings = await apiService.getNotificationSettings();
            // setReminderFrequency(settings.reminder_schedule);
            // setReminderDays(settings.reminder_days || []);
            // if (settings.reminder_days && settings.reminder_days.length > 0) {
            //     setReminderDay(settings.reminder_days[0]);
            // }
            // setReminderTime(settings.reminder_time || '');
            // setEmailNotifications(settings.email_notifications);
            // setFollowSubstack(settings.substack);
            // setIsActive(settings.is_active);
        } catch (error) {
            console.error('Failed to load notification settings:', error);
            // Settings will be created on first save
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        // TODO: Uncomment API calls when ready
        // await saveSettings(async () => {
        //     return await apiService.updateNotificationSettings({
        //         reminder_schedule: reminderFrequency,
        //         reminder_days: reminderFrequency === 'specific_days' && reminderDay ? [reminderDay] : reminderDays,
        //         reminder_time: reminderTime,
        //         email_notifications: emailNotifications,
        //         substack: followSubstack,
        //         is_active: isActive,
        //     });
        // });
        
        // Temporary: Show success message for testing
        Alert.alert('Success', 'Notification settings saved successfully');
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title="Notifications Settings"
                    onBack={() => navigation.goBack()}
                />

                {/* Reminder Settings Section */}
                <View style={styles.section}>
                    {/* How often do you want reminders? */}
                    <View style={styles.inputGroup}>
                        <Label>How often do you want reminders?</Label>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setShowFrequencyModal(true)}
                            disabled={isLoading}
                        >
                            <Text style={styles.dropdownText}>
                                {frequencyOptions.find(opt => opt.value === reminderFrequency)?.label || reminderFrequency}
                            </Text>
                            <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                        </TouchableOpacity>
                    </View>

                    {/* Reminder Day - only show if not daily */}
                    {reminderFrequency !== 'daily' && (
                        <View style={styles.inputGroup}>
                            <Label>Reminder Day</Label>
                            <TouchableOpacity
                                style={styles.dropdown}
                                onPress={() => setShowDayModal(true)}
                                disabled={isLoading}
                            >
                                <Text style={[styles.dropdownText, !reminderDay && styles.placeholder]}>
                                    {reminderDay || 'Select a day'}
                                </Text>
                                <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Preferred Reminder Time */}
                    <Input
                        label="Preferred Reminder Time"
                        placeholder="Pick a time that suits you best"
                        value={reminderTime}
                        onChangeText={setReminderTime}
                        style={styles.inputGroup}
                    />
                </View>

                {/* Other Notifications Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other notifications</Text>

                    {/* Email notifications */}
                    <View style={styles.notificationCard}>
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationTitle}>Email notifications</Text>
                            <Text style={styles.notificationDescription}>
                                Receive your daily check-in reminders via email.
                            </Text>
                        </View>
                        <Toggle
                            value={emailNotifications}
                            onValueChange={setEmailNotifications}
                            disabled={isLoading}
                        />
                    </View>

                    {/* Follow our Substack */}
                    <View style={styles.notificationCard}>
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationTitle}>Follow our Substack</Text>
                            <Text style={styles.notificationDescription}>
                                Get notified when new research and articles are published on our Substack.
                            </Text>
                        </View>
                        <Toggle
                            value={followSubstack}
                            onValueChange={setFollowSubstack}
                            disabled={isLoading}
                        />
                    </View>
                </View>

                {/* Save Button */}
                <View style={styles.saveButtonContainer}>
                    <Button
                        title={isSaving ? 'Saving...' : 'Save Settings'}
                        onPress={handleSave}
                        disabled={isSaving || isLoading}
                    />
                </View>
            </ScrollView>

            {/* Frequency Modal */}
            <Modal
                visible={showFrequencyModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowFrequencyModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowFrequencyModal(false)}
                >
                    <View style={styles.modalContent}>
                        {frequencyOptions.map((option) => (
                            <TouchableOpacity
                                key={option.value}
                                style={styles.modalOption}
                                onPress={() => {
                                    setReminderFrequency(option.value);
                                    setShowFrequencyModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* Day Modal */}
            <Modal
                visible={showDayModal}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDayModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowDayModal(false)}
                >
                    <View style={styles.modalContent}>
                        {dayOptions.map((day) => (
                            <TouchableOpacity
                                key={day}
                                style={styles.modalOption}
                                onPress={() => {
                                    setReminderDay(day);
                                    setShowDayModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{day}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
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
        paddingHorizontal: 25,
        paddingBottom: theme.spacing.bottomNavHeight + theme.spacing.base,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
        marginBottom: 10,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    dropdown: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    placeholder: {
        color: theme.colors.textDisabled,
    },
    notificationCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
    },
    notificationContent: {
        flex: 1,
        marginRight: 10,
    },
    notificationTitle: {
        ...theme.typography.presets.body,
        fontSize: 13,
        lineHeight: 20,
        color: theme.colors.textPrimary,
        marginBottom: 4,
    },
    notificationDescription: {
        ...theme.typography.presets.bodySmall,
        fontSize: 10,
        lineHeight: 12,
        color: theme.colors.textDisabled,
    },
    saveButtonContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        borderRadius: 10,
        width: 260,
        maxHeight: 300,
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderLight,
    },
    modalOptionText: {
        ...theme.typography.presets.body,
        fontSize: 14,
        color: theme.colors.textPrimary,
    },
});

export default NotificationsSettingsScreen;

