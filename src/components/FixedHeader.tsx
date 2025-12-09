import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from './Logo';
import { theme } from '../theme/theme';
import { useTab } from '../contexts/TabContext';

// Export header height constant for use in screens
export const FIXED_HEADER_CONTENT_HEIGHT = 24; // Icon/text content height
export const FIXED_HEADER_PADDING_BOTTOM = 8;

const FixedHeader: React.FC = () => {
    const navigation = useNavigation();
    const { activeTab } = useTab();
    const insets = useSafeAreaInsets();
    
    // Get center text based on active tab - memoized for performance
    const centerText = useMemo(() => {
        switch (activeTab) {
            case 'home':
                return 'Good morning!';
            case 'community':
                return "What's going on";
            case 'chat':
            case 'notifications':
                return 'Notifications';
            case 'settings':
                return 'Settings';
            default:
                return '';
        }
    }, [activeTab]);

    const streakCount = 3; // This could come from user context/state
    const notificationCount = 0; // This could come from user context/state

    const handleProfilePress = () => {
        navigation.navigate('Profile' as never);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {/* Left: Streak indicator */}
            <View style={styles.leftSection}>
                <Ionicons name="flame" size={20} color={theme.colors.asteriskPink} />
                <Text style={styles.streakNumber}>{streakCount}</Text>
            </View>

            {/* Center: Dynamic text with logo */}
            <View style={styles.centerSection}>
                <Text style={styles.centerText}>{centerText}</Text>
                {centerText !== 'Settings' && (
                    <Logo size={16} tintColor={theme.colors.asteriskPink} style={styles.logo} />
                )}
            </View>

            {/* Right: Profile icon with notification count */}
            <View style={styles.rightSection}>
                <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
                    <Ionicons name="person-outline" size={24} color={theme.colors.textPrimary} />
                    {notificationCount > 0 && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationCount}>{notificationCount}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: FIXED_HEADER_PADDING_BOTTOM,
        paddingHorizontal: 25,
        backgroundColor: theme.colors.background,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    streakNumber: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
    },
    centerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        flex: 1,
        justifyContent: 'center',
    },
    centerText: {
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
    },
    logo: {
        marginLeft: 2,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    profileButton: {
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: -4,
        right: -4,
        backgroundColor: theme.colors.asteriskPink,
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    notificationCount: {
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: theme.colors.white,
    },
});

export default React.memo(FixedHeader);
