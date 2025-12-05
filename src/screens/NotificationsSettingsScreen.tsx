import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import BackgroundPattern from '../components/BackgroundPattern';
import { theme } from '../theme/theme';

const NotificationsSettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [reminderFrequency, setReminderFrequency] = useState('Weekly');
    const [reminderDay, setReminderDay] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [emailNotifications, setEmailNotifications] = useState(false);
    const [followSubstack, setFollowSubstack] = useState(false);
    const [showFrequencyModal, setShowFrequencyModal] = useState(false);
    const [showDayModal, setShowDayModal] = useState(false);
    const [focusedInput, setFocusedInput] = useState(false);

    const frequencyOptions = ['Daily', 'Weekly', 'Monthly'];
    const dayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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
                        <Text style={styles.headerTitle}>Notifications Settings</Text>
                        <Logo size={16} tintColor={theme.colors.asteriskPink} style={styles.asteriskLogo} />
                    </View>
                    <View style={styles.headerRight} />
                </View>

                {/* Reminder Settings Section */}
                <View style={styles.section}>
                    {/* How often do you want reminders? */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>How often do you want reminders?</Text>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setShowFrequencyModal(true)}
                        >
                            <Text style={styles.dropdownText}>{reminderFrequency}</Text>
                            <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                        </TouchableOpacity>
                    </View>

                    {/* Reminder Day */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Reminder Day</Text>
                        <TouchableOpacity
                            style={styles.dropdown}
                            onPress={() => setShowDayModal(true)}
                        >
                            <Text style={[styles.dropdownText, !reminderDay && styles.placeholder]}>
                                {reminderDay || 'Select a day'}
                            </Text>
                            <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                        </TouchableOpacity>
                    </View>

                    {/* Preferred Reminder Time */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Preferred Reminder Time</Text>
                        <TextInput
                            style={[
                                styles.timeInput,
                                focusedInput && styles.timeInputFocused
                            ]}
                            value={reminderTime}
                            onChangeText={setReminderTime}
                            placeholder="Pick a time that suits you best"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput(true)}
                            onBlur={() => setFocusedInput(false)}
                        />
                    </View>
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
                        <TouchableOpacity
                            style={[
                                styles.toggle,
                                emailNotifications && styles.toggleActive
                            ]}
                            onPress={() => setEmailNotifications(!emailNotifications)}
                        >
                            <View style={[
                                styles.toggleThumb,
                                emailNotifications && styles.toggleThumbActive
                            ]} />
                        </TouchableOpacity>
                    </View>

                    {/* Follow our Substack */}
                    <View style={styles.notificationCard}>
                        <View style={styles.notificationContent}>
                            <Text style={styles.notificationTitle}>Follow our Substack</Text>
                            <Text style={styles.notificationDescription}>
                                Get notified when new research and articles are published on our Substack.
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.toggle,
                                followSubstack && styles.toggleActive
                            ]}
                            onPress={() => setFollowSubstack(!followSubstack)}
                        >
                            <View style={[
                                styles.toggleThumb,
                                followSubstack && styles.toggleThumbActive
                            ]} />
                        </TouchableOpacity>
                    </View>
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
                                key={option}
                                style={styles.modalOption}
                                onPress={() => {
                                    setReminderFrequency(option);
                                    setShowFrequencyModal(false);
                                }}
                            >
                                <Text style={styles.modalOptionText}>{option}</Text>
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
    label: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textPrimary,
        fontSize: 12,
        lineHeight: 18,
        marginBottom: 10,
    },
    dropdown: {
        height: 40,
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dropdownText: {
        ...theme.typography.presets.body,
        fontSize: 12,
        lineHeight: 18,
        color: theme.colors.textPrimary,
    },
    placeholder: {
        color: theme.colors.textDisabled,
    },
    timeInput: {
        height: 40,
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 13,
        ...theme.typography.presets.body,
        fontSize: 12,
        lineHeight: 18,
        color: theme.colors.textPrimary,
    },
    timeInputFocused: {
        borderWidth: 1,
        borderColor: theme.colors.ocean,
    },
    notificationCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 260,
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
    toggle: {
        width: 30,
        height: 16,
        backgroundColor: theme.colors.oceanLight,
        borderRadius: 6,
        justifyContent: 'center',
        paddingHorizontal: 1,
    },
    toggleActive: {
        backgroundColor: theme.colors.ocean,
    },
    toggleThumb: {
        width: 12,
        height: 14,
        backgroundColor: theme.colors.white,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
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

