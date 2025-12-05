import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import Logo from './Logo';

interface BottomNavigationProps {
    activeTab?: 'home' | 'community' | 'chat' | 'notifications' | 'settings';
    onTabPress: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    activeTab = 'home',
    onTabPress,
}) => {
    const tabs = [
        { id: 'home', label: 'Home', icon: 'home-outline' },
        { id: 'community', label: 'Community', icon: 'people-outline' },
        { id: 'chat', label: 'Chat', icon: null, isSpecial: true },
        { id: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
        { id: 'settings', label: 'Settings', icon: 'settings-outline' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => {
                if (tab.isSpecial) {
                    return (
                        <TouchableOpacity
                            key={tab.id}
                            style={styles.tab}
                            onPress={() => onTabPress(tab.id)}
                        >
                            <View style={styles.chatButton}>
                                <Logo size={12} tintColor={theme.colors.white} />
                            </View>
                            <Text style={styles.tabLabel}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                }
                return (
                <TouchableOpacity
                    key={tab.id}
                    style={styles.tab}
                    onPress={() => onTabPress(tab.id)}
                >
                    <Ionicons
                        name={tab.icon as any}
                        size={21}
                        color={activeTab === tab.id ? theme.colors.ocean : theme.colors.textDisabled}
                    />
                    <Text
                        style={[
                            styles.tabLabel,
                            activeTab === tab.id && styles.activeTabLabel,
                        ]}
                    >
                        {tab.label}
                    </Text>
                    {activeTab === tab.id && <View style={styles.activeIndicator} />}
                </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
        paddingBottom: theme.spacing.spacing7,
        paddingTop: theme.spacing.sm,
        height: theme.spacing.bottomNavHeight,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: theme.spacing.sm,
        position: 'relative',
    },
    tabLabel: {
        ...theme.typography.presets.navLabel,
        color: theme.colors.textDisabled,
        marginTop: theme.spacing.spacing2,
    },
    activeTabLabel: {
        ...theme.typography.presets.navLabel,
        color: theme.colors.ocean,
    },
    activeIndicator: {
        position: 'absolute',
        top: 0,
        left: '50%',
        marginLeft: -theme.spacing.iconSize3xl / 2,
        width: theme.spacing.bottomNavIndicatorWidth,
        height: theme.spacing.bottomNavIndicatorHeight,
        backgroundColor: theme.colors.ocean,
        borderRadius: theme.spacing.radius.xs,
    },
    chatButton: {
        width: 32,
        height: 18,
        backgroundColor: theme.colors.asteriskPink,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BottomNavigation;