/**
 * Navigation types for React Navigation
 */

export type RootStackParamList = {
    Splash: undefined;
    Welcome: undefined;
    GenderVerification: undefined;
    IDVerification: undefined;
    VerificationSuccess: undefined;
    VerificationFailed: undefined;
    CreateAccount: undefined;
    Login: undefined;
    TelegramLogin: undefined;
    ProfileSetup: undefined;
    MainContainer: undefined;
    Profile: undefined;
    ProfileInformation: undefined;
    ConditionsScreen: undefined;
    AddConditionScreen: undefined;
    MedicationsScreen: undefined;
    AddMedicationScreen: undefined;
    TreatmentsScreen: undefined;
    AddTreatmentScreen: undefined;
    DayStreakScreen: undefined;
    VotingScreen: { pollId?: string; pollTitle?: string };
    ChangePassword: undefined;
    EditEmail: undefined;
    NotificationsSettings: undefined;
    AppFeedback: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

