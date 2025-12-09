import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PersistentBottomNav from './src/components/PersistentBottomNav';
import { TabProvider } from './src/contexts/TabContext';

// Import screens - Auth
import SplashScreen from './src/screens/auth/SplashScreen';
import WelcomeScreen from './src/screens/auth/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import CreateAccountScreen from './src/screens/auth/CreateAccountScreen';
import TelegramLoginScreen from './src/screens/auth/TelegramLoginScreen';

// Verification
import GenderVerificationScreen from './src/screens/verification/GenderVerificationScreen';
import IDVerificationScreen from './src/screens/verification/IDVerificationScreen';
import VerificationSuccessScreen from './src/screens/verification/VerificationSuccessScreen';
import VerificationFailedScreen from './src/screens/verification/VerificationFailedScreen';

// Profile
import ProfileSetupScreen from './src/screens/profile/ProfileSetupScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import ProfileInformationScreen from './src/screens/profile/ProfileInformationScreen';
import DayStreakScreen from './src/screens/profile/DayStreakScreen';

// Health
import ConditionsScreen from './src/screens/health/ConditionsScreen';
import AddConditionScreen from './src/screens/health/AddConditionScreen';
import MedicationsScreen from './src/screens/health/MedicationsScreen';
import AddMedicationScreen from './src/screens/health/AddMedicationScreen';
import TreatmentsScreen from './src/screens/health/TreatmentsScreen';
import AddTreatmentScreen from './src/screens/health/AddTreatmentScreen';

// Settings
import SettingsScreen from './src/screens/settings/SettingsScreen';
import ChangePasswordScreen from './src/screens/settings/ChangePasswordScreen';
import EditEmailScreen from './src/screens/settings/EditEmailScreen';
import NotificationsSettingsScreen from './src/screens/settings/NotificationsSettingsScreen';
import AppFeedbackScreen from './src/screens/settings/AppFeedbackScreen';

// Main
import MainContainerScreen from './src/screens/main/MainContainerScreen';

// Other
import VotingScreen from './src/screens/other/VotingScreen';
import ResearchInviteScreen from './src/screens/other/ResearchInviteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <TabProvider>
        <View style={styles.container}>
          <NavigationContainer>
            <StatusBar style="auto" />
            <Stack.Navigator
              initialRouteName="Splash"
              screenOptions={{
                headerShown: false,
                gestureEnabled: false,
              }}
            >
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="GenderVerification" component={GenderVerificationScreen} />
              <Stack.Screen name="IDVerification" component={IDVerificationScreen} />
              <Stack.Screen name="VerificationSuccess" component={VerificationSuccessScreen} />
              <Stack.Screen name="VerificationFailed" component={VerificationFailedScreen} />
              <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="TelegramLogin" component={TelegramLoginScreen} />
              <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />

              {/* Main container - handles tab switching without navigation */}
              <Stack.Screen name="MainContainer" component={MainContainerScreen} />

              {/* Sub-screens - pushed on top of MainContainer */}
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
              <Stack.Screen name="ConditionsScreen" component={ConditionsScreen} />
              <Stack.Screen name="AddConditionScreen" component={AddConditionScreen} />
              <Stack.Screen name="MedicationsScreen" component={MedicationsScreen} />
              <Stack.Screen name="AddMedicationScreen" component={AddMedicationScreen} />
              <Stack.Screen name="TreatmentsScreen" component={TreatmentsScreen} />
              <Stack.Screen name="AddTreatmentScreen" component={AddTreatmentScreen} />
              <Stack.Screen name="DayStreakScreen" component={DayStreakScreen} />
              <Stack.Screen name="VotingScreen" component={VotingScreen} />
              <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
              <Stack.Screen name="EditEmail" component={EditEmailScreen} />
              <Stack.Screen name="NotificationsSettings" component={NotificationsSettingsScreen} />
              <Stack.Screen name="AppFeedback" component={AppFeedbackScreen} />
              <Stack.Screen name="ResearchInvite" component={ResearchInviteScreen} />
            </Stack.Navigator>
            {/* Persistent bottom navigation - single instance, persists across all screens */}
            <PersistentBottomNav />
          </NavigationContainer>
        </View>
      </TabProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
