import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import DashboardScreen from './DashboardScreen';
import CommunityScreen from './CommunityScreen';
import DailyCheckinScreen from './DailyCheckinScreen';
import NotificationsScreen from './NotificationsScreen';
import SettingsScreen from '../settings/SettingsScreen';
import FixedHeader from '../../components/FixedHeader';
import { useTab } from '../../contexts/TabContext';

const MainContainerScreen: React.FC = () => {
    const { activeTab } = useTab();

    // Memoize content to prevent unnecessary re-renders
    const content = useMemo(() => {
        switch (activeTab) {
            case 'home':
                return <DashboardScreen />;
            case 'community':
                return <CommunityScreen />;
            case 'chat':
                return <DailyCheckinScreen />;
            case 'notifications':
                return <NotificationsScreen />;
            case 'settings':
                return <SettingsScreen />;
            default:
                return <DashboardScreen />;
        }
    }, [activeTab]);

    return (
        <View style={styles.container}>
            <FixedHeader />
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default MainContainerScreen;
