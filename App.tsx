import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import GenderVerificationScreen from './src/screens/GenderVerificationScreen';
import IDVerificationScreen from './src/screens/IDVerificationScreen';
import VerificationSuccessScreen from './src/screens/VerificationSuccessScreen';
import VerificationFailedScreen from './src/screens/VerificationFailedScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';
import LoginScreen from './src/screens/LoginScreen';
import TelegramLoginScreen from './src/screens/TelegramLoginScreen';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import DailyCheckinScreen from './src/screens/DailyCheckinScreen';

// Profile screens
import ProfileScreen from './src/screens/ProfileScreen';
import ProfileInformationScreen from './src/screens/ProfileInformationScreen';
import ConditionsScreen from './src/screens/ConditionsScreen';
import AddConditionScreen from './src/screens/AddConditionScreen';
import MedicationsScreen from './src/screens/MedicationsScreen';
import AddMedicationScreen from './src/screens/AddMedicationScreen';
import TreatmentsScreen from './src/screens/TreatmentsScreen';
import AddTreatmentScreen from './src/screens/AddTreatmentScreen';
import DayStreakScreen from './src/screens/DayStreakScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
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
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="DailyCheckin" component={DailyCheckinScreen} />

          {/* Profile screens */}
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="ProfileInformation" component={ProfileInformationScreen} />
          <Stack.Screen name="ConditionsScreen" component={ConditionsScreen} />
          <Stack.Screen name="AddConditionScreen" component={AddConditionScreen} />
          <Stack.Screen name="MedicationsScreen" component={MedicationsScreen} />
          <Stack.Screen name="AddMedicationScreen" component={AddMedicationScreen} />
          <Stack.Screen name="TreatmentsScreen" component={TreatmentsScreen} />
          <Stack.Screen name="AddTreatmentScreen" component={AddTreatmentScreen} />
          <Stack.Screen name="DayStreakScreen" component={DayStreakScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
