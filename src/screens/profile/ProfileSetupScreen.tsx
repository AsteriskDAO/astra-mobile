import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import Input from '../../components/Input';
import BackgroundPattern from '../../components/BackgroundPattern';
import { theme } from '../../theme/theme';

const ProfileSetupScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState({
        name: '',
        age: '18-20',
        ethnicity: 'Prefer not to say',
        location: 'Prefer not to say',
        healthConditions: '',
        medications: '',
        treatments: '',
        caretaker: '',
        trialsParticipation: null as boolean | null,
    });

    const totalSteps = 9;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            navigation.navigate('ProfileSaved' as never);
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
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{profileData.age}</Text>
                        <Ionicons name="chevron-down" size={20} color="#949494" />
                    </TouchableOpacity>
                );

            case 3:
                return (
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{profileData.ethnicity}</Text>
                        <Ionicons name="chevron-down" size={20} color="#949494" />
                    </TouchableOpacity>
                );

            case 4:
                return (
                    <TouchableOpacity style={styles.dropdown}>
                        <Text style={styles.dropdownText}>{profileData.location}</Text>
                        <Ionicons name="chevron-down" size={20} color="#949494" />
                    </TouchableOpacity>
                );

            case 5:
                return (
                    <Input
                        placeholder="Start typing"
                        value={profileData.healthConditions}
                        onChangeText={(text) => setProfileData({ ...profileData, healthConditions: text })}
                        multiline
                        numberOfLines={3}
                    />
                );

            case 6:
                return (
                    <Input
                        placeholder="Start typing"
                        value={profileData.medications}
                        onChangeText={(text) => setProfileData({ ...profileData, medications: text })}
                        multiline
                        numberOfLines={3}
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
                        {['Kids', 'Parents', 'Partner', 'Friend', 'No', 'Other'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.optionButton,
                                    profileData.caretaker === option && styles.selectedOptionButton
                                ]}
                                onPress={() => setProfileData({ ...profileData, caretaker: option })}
                            >
                                <Text style={[
                                    styles.optionText,
                                    profileData.caretaker === option && styles.selectedOptionText
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
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
                        disabled={(currentStep === 8 && !profileData.caretaker) || (currentStep === 9 && profileData.trialsParticipation === null)}
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
        fontSize: 22,
        lineHeight: 23,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 8,
    },
    questionSingle: {
        fontSize: 22,
        lineHeight: 23,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 40,
    },
    subtext: {
        fontSize: 11,
        lineHeight: 13,
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
        fontSize: 16,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#272727',
    },
    optionButton: {
        width: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        justifyContent: 'center',
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
        fontSize: 16,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#272727',
    },
    selectedOptionText: {
        fontWeight: '500',
        color: '#FFFFFF',
    },
    skipLink: {
        alignSelf: 'center',
        marginTop: theme.spacing.md,
    },
    skipText: {
        fontSize: 11,
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