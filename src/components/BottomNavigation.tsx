import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface BottomNavigationProps {
    activeTab?: 'home' | 'community' | 'notifications' | 'settings';
    onTabPress: (tab: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({
    activeTab = 'home',
    onTabPress,
}) => {
    const tabs = [
        { id: 'home', label: 'Home', icon: 'home-outline' },
        { id: 'community', label: 'Community', icon: 'people-outline' },
        { id: 'notifications', label: 'Notifications', icon: 'notifications-outline' },
        { id: 'settings', label: 'Settings', icon: 'settings-outline' },
    ];

    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
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
            ))}
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
});

export default BottomNavigation;