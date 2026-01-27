import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import SearchableInput from '../../components/SearchableInput';
import BackgroundPattern from '../../components/BackgroundPattern';
import { theme } from '../../theme/theme';
import { ETHNICITY_OPTIONS } from '../../constants/ethnicity';
import { HEALTH_CONDITIONS } from '../../constants/healthConditions';
import { MEDICATIONS } from '../../constants/medications';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type ProfileSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSetup'>;

const ProfileSetupScreen: React.FC = () => {
    const navigation = useNavigation<ProfileSetupScreenNavigationProp>();
    const insets = useSafeAreaInsets();
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState({
        name: '',
        age: '',
        ethnicity: '',
        location: '',
        healthConditions: [] as string[],
        medications: [] as string[],
        treatments: '',
        caretaker: [] as string[],
        trialsParticipation: null as boolean | null,
    });

    const ageOptions = [
        { label: '18-20', value: '18-20' },
        { label: '21-25', value: '21-25' },
        { label: '26-30', value: '26-30' },
        { label: '31-35', value: '31-35' },
        { label: '36-40', value: '36-40' },
        { label: '41-45', value: '41-45' },
        { label: '46-50', value: '46-50' },
        { label: '51-55', value: '51-55' },
        { label: '56-60', value: '56-60' },
        { label: '61-65', value: '61-65' },
        { label: '66-70', value: '66-70' },
        { label: '71+', value: '71+' },
    ];

    const locationOptions = [
        { label: 'North America', value: 'north_america' },
        { label: 'South America', value: 'south_america' },
        { label: 'Europe', value: 'europe' },
        { label: 'Asia', value: 'asia' },
        { label: 'Africa', value: 'africa' },
        { label: 'Oceania', value: 'oceania' },
        { label: 'Middle East', value: 'middle_east' },
        { label: 'Prefer not to say', value: 'prefer_not_to_say' },
    ];

    const caretakerOptions = ['Kids', 'Parents', 'Partner', 'Friend', 'No', 'Other'];

    const totalSteps = 9;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            navigation.navigate('ProfileSaved');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            navigation.goBack();
        }
    };

    const handleSkip = () => {
        handleNext();
    };

    const renderQuestion = () => {
        switch (currentStep) {
            case 1:
                return <Text style={styles.questionSingle}>What would you like Astra to call you?</Text>;
            case 2:
                return <Text style={styles.questionSingle}>What's your age?</Text>;
            case 3:
                return <Text style={styles.questionSingle}>What's your ethnicity?</Text>;
            case 4:
                return <Text style={styles.questionSingle}>Where are you usually based?</Text>;
            case 5:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>Do you have any health conditions?</Text>
                        <Text style={styles.subtext}>
                            Include both clinically diagnosed and self-identified conditions. This helps us personalise your experience.
                        </Text>
                    </View>
                );
            case 6:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>Are you currently taking any medications?</Text>
                        <Text style={styles.subtext}>
                            Start typing and we'll suggest categories (e.g. pain relief, hormonal, mental health
                        </Text>
                    </View>
                );
            case 7:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>Are you undergoing any treatments?</Text>
                        <Text style={styles.subtext}>
                            For example, therapy, physiotherapy, or alternative care.
                        </Text>
                    </View>
                );
            case 8:
                return <Text style={styles.questionSingle}>Are you a caretaker?</Text>;
            case 9:
                return (
                    <View style={styles.questionContainer}>
                        <Text style={styles.question}>Do you want to participate in trials?</Text>
                        <Text style={styles.subtext}>
                            Researchers may invite you to compensated focus groups or clinical trials in the future. Would you like to receive an invitation?
                        </Text>
                    </View>
                );
            default:
                return null;
        }
    };

    const renderInput = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Input
                        placeholder="type"
                        value={profileData.name}
                        onChangeText={(text) => setProfileData({ ...profileData, name: text })}
                    />
                );

            case 2:
                return (
                    <Dropdown
                        value={profileData.age}
                        options={ageOptions}
                        onSelect={(value) => setProfileData({ ...profileData, age: value })}
                        placeholder="Select age range"
                    />
                );

            case 3:
                return (
                    <Dropdown
                        value={profileData.ethnicity}
                        options={ETHNICITY_OPTIONS}
                        onSelect={(value) => setProfileData({ ...profileData, ethnicity: value })}
                        placeholder="Select ethnicity"
                    />
                );

            case 4:
                return (
                    <Dropdown
                        value={profileData.location}
                        options={locationOptions}
                        onSelect={(value) => setProfileData({ ...profileData, location: value })}
                        placeholder="Select location"
                    />
                );

            case 5:
                return (
                    <SearchableInput
                        value=""
                        options={HEALTH_CONDITIONS}
                        onSelect={() => { }}
                        onAdd={(value) => {
                            if (!profileData.healthConditions.includes(value)) {
                                setProfileData({
                                    ...profileData,
                                    healthConditions: [...profileData.healthConditions, value],
                                });
                            }
                        }}
                        onRemove={(value) => {
                            setProfileData({
                                ...profileData,
                                healthConditions: profileData.healthConditions.filter(c => c !== value),
                            });
                        }}
                        placeholder="Start typing to search conditions"
                        multiline={false}
                        allowMultiple={true}
                        selectedValues={profileData.healthConditions}
                    />
                );

            case 6:
                return (
                    <SearchableInput
                        value=""
                        options={MEDICATIONS}
                        onSelect={() => { }}
                        onAdd={(value) => {
                            if (!profileData.medications.includes(value)) {
                                setProfileData({
                                    ...profileData,
                                    medications: [...profileData.medications, value],
                                });
                            }
                        }}
                        onRemove={(value) => {
                            setProfileData({
                                ...profileData,
                                medications: profileData.medications.filter(m => m !== value),
                            });
                        }}
                        placeholder="Start typing to search medications"
                        multiline={false}
                        allowMultiple={true}
                        selectedValues={profileData.medications}
                    />
                );

            case 7:
                return (
                    <Input
                        placeholder="Start typing"
                        value={profileData.treatments}
                        onChangeText={(text) => setProfileData({ ...profileData, treatments: text })}
                        multiline
                        numberOfLines={3}
                    />
                );

            case 8:
                return (
                    <View style={styles.optionsContainer}>
                        {caretakerOptions.map((option) => {
                            const isSelected = profileData.caretaker.includes(option);
                            return (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.optionButton,
                                        isSelected && styles.selectedOptionButton
                                    ]}
                                    onPress={() => {
                                        if (isSelected) {
                                            setProfileData({
                                                ...profileData,
                                                caretaker: profileData.caretaker.filter(c => c !== option),
                                            });
                                        } else {
                                            setProfileData({
                                                ...profileData,
                                                caretaker: [...profileData.caretaker, option],
                                            });
                                        }
                                    }}
                                >
                                    <Text style={[
                                        styles.optionText,
                                        isSelected && styles.selectedOptionText
                                    ]}>
                                        {option}
                                    </Text>
                                    {isSelected && (
                                        <Ionicons name="checkmark" size={20} color="#FFFFFF" style={styles.checkIcon} />
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                );

            case 9:
                return (
                    <>
                        {['Yes', 'No'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.optionButton,
                                    (profileData.trialsParticipation === true && option === 'Yes') || (profileData.trialsParticipation === false && option === 'No') ? styles.selectedOptionButton : null
                                ]}
                                onPress={() => setProfileData({ ...profileData, trialsParticipation: option === 'Yes' })}
                            >
                                <Text style={[
                                    styles.optionText,
                                    (profileData.trialsParticipation === true && option === 'Yes') || (profileData.trialsParticipation === false && option === 'No') ? styles.selectedOptionText : null
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <BackButton
                    onPress={handleBack}
                    size={17}
                    style={styles.backButton}
                />
                <Header
                    currentStep={currentStep}
                    totalSteps={totalSteps}
                />
            </View>

            <View style={styles.content}>
                {/* First view - question */}
                <View style={styles.questionView}>
                    {renderQuestion()}
                </View>

                {/* Second view - input/dropdown/options */}
                <View style={styles.inputView}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {renderInput()}
                    </ScrollView>
                </View>

                {/* Third view - button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        variant="outline"
                        disabled={(currentStep === 8 && profileData.caretaker.length === 0) || (currentStep === 9 && profileData.trialsParticipation === null)}
                    />
                    {(currentStep === 5 || currentStep === 6 || currentStep === 7) && (
                        <TouchableOpacity style={styles.skipLink} onPress={handleSkip}>
                            <Text style={styles.skipText}>Skip for now</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        position: 'relative',
    },
    headerContainer: {
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: theme.spacing.titleMarginTop,
        paddingBottom: theme.spacing.formMarginBottom,
    },
    questionView: {
        flex: 1,
        justifyContent: 'center',
    },
    inputView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    questionContainer: {
        marginBottom: 40,
    },
    question: {
        fontSize: FONT_SIZES.h2,
        lineHeight: 23,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 8,
    },
    questionSingle: {
        fontSize: FONT_SIZES.h2,
        lineHeight: 23,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 40,
    },
    subtext: {
        fontSize: FONT_SIZES.subtitle,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#484848',
        textAlign: 'center',
    },
    optionsContainer: {
        marginTop: 20,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    dropdownText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#272727',
    },
    optionButton: {
        width: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    selectedOptionButton: {
        backgroundColor: theme.colors.ocean,
    },
    optionText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#272727',
    },
    selectedOptionText: {
        fontWeight: '500',
        color: '#FFFFFF',
    },
    checkIcon: {
        marginLeft: 8,
    },
    skipLink: {
        alignSelf: 'center',
        marginTop: theme.spacing.md,
    },
    skipText: {
        fontSize: FONT_SIZES.bodySmall,
        lineHeight: 17,
        fontWeight: '500',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#1B1B1B',
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
        paddingTop: theme.spacing.md,
    },
});

export default ProfileSetupScreen;