export type TabType = 'home' | 'community' | 'chat' | 'notifications' | 'settings';

/**
 * Determines which tab should be active based on the current route name.
 * 
 * - MainContainer: The container screen that holds all main tab content (home tab)
 * - home: Tab identifier for the dashboard/home content
 * - Dashboard: Old route name (removed, kept for backward compatibility)
 * 
 * @param routeName - The current route name from navigation state
 * @returns The active tab identifier
 */
/**
 * Determines which tab should be active based on the current route name.
 * 
 * Route Names vs Tab Identifiers:
 * - MainContainer: The route name for the container screen (renders different content based on active tab)
 * - home: Tab identifier for dashboard/home content (not a route, just an identifier)
 * - Dashboard: Old route name (removed, no longer exists in navigation stack)
 * 
 * @param routeName - The current route name from navigation state
 * @returns The active tab identifier ('home', 'community', 'chat', 'notifications', or 'settings')
 */
export const getActiveTab = (routeName?: string): TabType => {
    switch (routeName) {
        case 'MainContainer':
            // MainContainer is the route name, 'home' is the tab identifier
            // When on MainContainer, we determine the tab from TabContext state
            return 'home';
        case 'CommunityScreen':
            return 'community';
        case 'DailyCheckin':
            return 'chat';
        case 'Settings':
        case 'ChangePassword':
        case 'EditEmail':
        case 'NotificationsSettings':
        case 'Profile':
        case 'ProfileInformation':
        case 'ConditionsScreen':
        case 'MedicationsScreen':
        case 'TreatmentsScreen':
        case 'AddConditionScreen':
        case 'AddMedicationScreen':
        case 'AddTreatmentScreen':
        case 'DayStreakScreen':
            return 'settings';
        default:
            return 'home';
    }
};

