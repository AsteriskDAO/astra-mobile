/**
 * Navigation types for React Navigation
 */
import { Condition, Medication, Treatment } from './health';

export type RootStackParamList = {
    Splash: undefined;
    Welcome: undefined;
    IDVerification: undefined;
    VerificationFailed: undefined;
    FinalVerificationSuccess: undefined;
    CreateAccount: undefined;
    Login: undefined;
    TelegramLogin: undefined;
    ProfileIntro: undefined;
    ProfileSetup: undefined;
    ProfileSaved: undefined;
    MainContainer: undefined;
    Profile: undefined;
    ProfileInformation: undefined;
    ConditionsScreen: undefined;
    AddConditionScreen: { condition?: Condition };
    MedicationsScreen: undefined;
    AddMedicationScreen: { medication?: Medication };
    TreatmentsScreen: undefined;
    AddTreatmentScreen: { treatment?: Treatment };
    DayStreakScreen: undefined;
    VotingScreen: { pollId?: string; pollTitle?: string };
    ChangePassword: undefined;
    EditEmail: undefined;
    NotificationsSettings: undefined;
    AppFeedback: undefined;
    ResearchInvite: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}

