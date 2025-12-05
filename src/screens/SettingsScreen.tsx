import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundPattern from '../components/BackgroundPattern';
import { theme } from '../theme/theme';
import { useFixedHeaderHeight } from '../hooks/useFixedHeaderHeight';
import { LAYOUT } from '../constants/layout';
import { SettingItem } from '../types/settings';

const SettingsScreen: React.FC = () => {
    const navigation = useNavigation();
    const headerHeight = useFixedHeaderHeight();
    const email = 'hi@asterisk.xyz';

    const handleCopyEmail = async () => {
        try {
            // TODO: Install @react-native-clipboard/clipboard or expo-clipboard
            // await Clipboard.setStringAsync(email);
            // Show toast notification
        } catch (error) {
            // Handle error
        }
    };

    const handleEmailPress = () => {
        navigation.navigate('EditEmail' as never);
    };

    const handleChangePasswordPress = () => {
        navigation.navigate('ChangePassword' as never);
    };

    const handleNotificationsPress = () => {
        navigation.navigate('NotificationsSettings' as never);
    };

    const handleToneOfAIPress = () => {
        // Navigate to AI tone settings
    };

    const handleSubmitFeedbackPress = () => {
        navigation.navigate('AppFeedback' as never);
    };

    const handleFAQPress = () => {
        // Navigate to FAQ
    };

    const handleTermsPress = () => {
        // Navigate to Terms of Use
    };

    const handlePrivacyPress = () => {
        // Navigate to Privacy Policy
    };

    const handleLogoutPress = () => {
        // Handle logout
    };

    // Settings items configuration

    const accountItems = useMemo<SettingItem[]>(() => [
        {
            id: 'email',
            icon: 'mail-outline',
            label: 'Email',
            value: email,
            showCopyButton: true,
            onCopy: handleCopyEmail,
            onPress: handleEmailPress,
        },
        {
            id: 'changePassword',
            icon: 'key-outline',
            label: 'Change password',
            onPress: handleChangePasswordPress,
        },
        {
            id: 'notifications',
            icon: 'notifications-outline',
            label: 'Notifications',
            onPress: handleNotificationsPress,
        },
        {
            id: 'toneOfAI',
            icon: 'notifications-outline',
            label: 'Tone of Astra AI',
            onPress: handleToneOfAIPress,
        },
    ], [email]);

    const otherItems = useMemo<SettingItem[]>(() => [
        {
            id: 'submitFeedback',
            icon: 'people-outline',
            label: 'Submit App feedback',
            onPress: handleSubmitFeedbackPress,
        },
        {
            id: 'faq',
            icon: 'document-text-outline',
            label: 'FAQ',
            onPress: handleFAQPress,
        },
        {
            id: 'terms',
            icon: 'document-text-outline',
            label: 'Terms of Use',
            onPress: handleTermsPress,
        },
        {
            id: 'privacy',
            icon: 'document-text-outline',
            label: 'Privacy Policy',
            onPress: handlePrivacyPress,
        },
        {
            id: 'logout',
            icon: 'log-out-outline',
            label: 'Log out',
            onPress: handleLogoutPress,
        },
    ], []);

    const renderSettingItem = (item: SettingItem) => (
        <TouchableOpacity key={item.id} style={styles.settingItem} onPress={item.onPress}>
            <Ionicons name={item.icon as any} size={LAYOUT.SETTING_ITEM_ICON_SIZE} color={theme.colors.ocean} style={styles.settingIcon} />
            <Text style={styles.settingLabel}>{item.label}</Text>
            {item.value && <Text style={styles.emailValue}>{item.value}</Text>}
            {item.showCopyButton && item.onCopy && (
                <TouchableOpacity
                    onPress={(e) => {
                        e.stopPropagation();
                        item.onCopy!();
                    }}
                    style={styles.copyButton}
                >
                    <Ionicons name="copy-outline" size={12} color={theme.colors.textDisabled} />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView
                style={[styles.content, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Account Section */}
                <View style={[styles.section, styles.firstSection]}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    {accountItems.map(renderSettingItem)}
                </View>

                {/* Other Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Other</Text>
                    {otherItems.map(renderSettingItem)}
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
    },
    scrollContent: {
        paddingBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    firstSection: {
        marginTop: 37, // Spacing between Settings header and Account text
    },
    sectionTitle: {
        fontSize: 12,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: theme.colors.textDisabled,
        marginBottom: 10,
    },
    settingItem: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        height: LAYOUT.SETTING_ITEM_HEIGHT,
        marginBottom: 10,
        width: '100%',
        position: 'relative',
    },
    settingIcon: {
        position: 'absolute',
        left: LAYOUT.SETTING_ITEM_ICON_LEFT,
        top: LAYOUT.SETTING_ITEM_ICON_TOP,
        width: LAYOUT.SETTING_ITEM_ICON_SIZE,
        height: LAYOUT.SETTING_ITEM_ICON_SIZE,
    },
    settingLabel: {
        position: 'absolute',
        left: LAYOUT.SETTING_ITEM_LABEL_LEFT,
        top: '50%',
        marginTop: -LAYOUT.SETTING_ITEM_LABEL_LINE_HEIGHT / 2,
        fontSize: LAYOUT.SETTING_ITEM_LABEL_FONT_SIZE,
        lineHeight: LAYOUT.SETTING_ITEM_LABEL_LINE_HEIGHT,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    emailValue: {
        position: 'absolute',
        right: 35, // Space for copy button (12px icon + 11px from right + 12px spacing)
        top: '50%',
        marginTop: -5, // Half of 10px line height
        fontSize: 10,
        lineHeight: 10, // 105% of 10px
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: theme.colors.textDisabled,
    },
    copyButton: {
        position: 'absolute',
        right: 11, // 11px from right edge
        top: '50%',
        marginTop: -6, // Half of 12px icon height
        padding: 0,
    },
});

export default SettingsScreen;
