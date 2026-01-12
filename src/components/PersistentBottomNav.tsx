import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import { useTab } from '../contexts/TabContext';
import { getActiveTab } from '../utils/navigation';

const PersistentBottomNav: React.FC = () => {
    const navigation = useNavigation();
    const { activeTab, setActiveTab } = useTab();

    // Get current route name from navigation state
    const routeName = useNavigationState(state => {
        if (!state) return null;
        // Handle nested navigators - get the deepest route
        const getCurrentRoute = (navState: any): any => {
            if (!navState) return null;
            const route = navState.routes[navState.index];
            if (route.state) {
                return getCurrentRoute(route.state);
            }
            return route;
        };
        const currentRoute = getCurrentRoute(state);
        return currentRoute?.name || null;
    });

    const handleTabPress = (tab: string) => {
        // If we're on a sub-screen, navigate back to MainContainer first
        if (routeName && routeName !== 'MainContainer') {
            // Change tab first, then navigate back to MainContainer
            setActiveTab(tab as any);
            navigation.navigate('MainContainer' as never);
        } else {
            // We're already on MainContainer, just change the tab
            setActiveTab(tab as any);
        }
    };

    // Screens that shouldn't show bottom navigation
    const hideBottomNavRoutes = [
        'Splash',
        'Welcome',
        'IDVerification',
        'VerificationFailed',
        'FinalVerificationSuccess',
        'CreateAccount',
        'Login',
        'TelegramLogin',
        'ProfileIntro',
        'ProfileSetup',
        'ProfileSaved',
    ];

    const shouldShowNav = routeName && !hideBottomNavRoutes.includes(routeName);

    if (!shouldShowNav) {
        return null;
    }

    return (
        <View style={styles.container} pointerEvents="box-none">
            <BottomNavigation
                activeTab={activeTab}
                onTabPress={handleTabPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F8F8F8',
    },
});

export default React.memo(PersistentBottomNav);

