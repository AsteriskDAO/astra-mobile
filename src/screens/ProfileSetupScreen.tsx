import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import BackgroundPattern from '../components/BackgroundPattern';
import BackButton from '../components/BackButton';

const ProfileSetupScreen: React.FC = () => {
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(1);
    const [profileData, setProfileData] = useState({
        name: '',
        age: '18-20',
        ethnicity: 'Prefer not to say',
        location: 'Prefer not to say',
        healthConditions: '',
        medications: '',
        treatments: '',
        caretaker: 'Kids',
        trialsParticipation: false,
    });
    const [focusedInput, setFocusedInput] = useState<string | null>(null);

    const totalSteps = 9;

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else {
            navigation.navigate('MainContainer' as never);
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

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.questionSingle}>What would you like Astra to call you?</Text>
                        <TextInput
                            style={[
                                styles.textInput,
                                focusedInput === 'name' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            placeholder="type"
                            placeholderTextColor="#9C9C9C"
                            value={profileData.name}
                            onChangeText={(text) => setProfileData({ ...profileData, name: text })}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>
                );

            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.questionSingle}>What's your age?</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{profileData.age}</Text>
                            <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                        </TouchableOpacity>
                    </View>
                );

            case 3:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.questionSingle}>What's your ethnicity?</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{profileData.ethnicity}</Text>
                            <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                        </TouchableOpacity>
                    </View>
                );

            case 4:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.questionSingle}>Where are you usually based?</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{profileData.location}</Text>
                            <Ionicons name="chevron-down" size={10} color="#9C9C9C" />
                        </TouchableOpacity>
                    </View>
                );

            case 5:
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>Do you have any health conditions?</Text>
                            <Text style={styles.subtext}>
                                Include both clinically diagnosed and self-identified conditions. This helps us personalise your experience.
                            </Text>
                        </View>
                        <TextInput
                            style={[
                                styles.textArea,
                                focusedInput === 'healthConditions' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            placeholder="Start typing"
                            placeholderTextColor="#9C9C9C"
                            value={profileData.healthConditions}
                            onChangeText={(text) => setProfileData({ ...profileData, healthConditions: text })}
                            multiline
                            numberOfLines={3}
                            onFocus={() => setFocusedInput('healthConditions')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <TouchableOpacity style={styles.skipLink} onPress={handleSkip}>
                            <Text style={styles.skipText}>Skip for now</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 6:
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>Are you currently taking any medications?</Text>
                            <Text style={styles.subtext}>
                                Start typing and we'll suggest categories (e.g. pain relief, hormonal, mental health
                            </Text>
                        </View>
                        <TextInput
                            style={[
                                styles.textArea,
                                focusedInput === 'medications' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            placeholder="Start typing"
                            placeholderTextColor="#9C9C9C"
                            value={profileData.medications}
                            onChangeText={(text) => setProfileData({ ...profileData, medications: text })}
                            multiline
                            numberOfLines={3}
                            onFocus={() => setFocusedInput('medications')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <TouchableOpacity style={styles.skipLink} onPress={handleSkip}>
                            <Text style={styles.skipText}>Skip for now</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 7:
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>Are you undergoing any treatments?</Text>
                            <Text style={styles.subtext}>
                                For example, therapy, physiotherapy, or alternative care.
                            </Text>
                        </View>
                        <TextInput
                            style={[
                                styles.textArea,
                                focusedInput === 'treatments' ? styles.inputFocused : styles.inputUnfocused
                            ]}
                            placeholder="Start typing"
                            placeholderTextColor="#9C9C9C"
                            value={profileData.treatments}
                            onChangeText={(text) => setProfileData({ ...profileData, treatments: text })}
                            multiline
                            numberOfLines={3}
                            onFocus={() => setFocusedInput('treatments')}
                            onBlur={() => setFocusedInput(null)}
                        />
                        <TouchableOpacity style={styles.skipLink} onPress={handleSkip}>
                            <Text style={styles.skipText}>Skip for now</Text>
                        </TouchableOpacity>
                    </View>
                );

            case 8:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.questionSingle}>Are you a caretaker?</Text>
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
                    </View>
                );

            case 9:
                return (
                    <View style={styles.stepContainer}>
                        <View style={styles.questionContainer}>
                            <Text style={styles.question}>Do you want to participate in trials?</Text>
                            <Text style={styles.subtext}>
                                Researchers may invite you to compensated focus groups or clinical trials in the future. Would you like to receive an invitation?
                            </Text>
                        </View>
                        {['Yes', 'No'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.optionButton,
                                    (profileData.trialsParticipation && option === 'Yes') || (!profileData.trialsParticipation && option === 'No') ? styles.selectedOptionButton : null
                                ]}
                                onPress={() => setProfileData({ ...profileData, trialsParticipation: option === 'Yes' })}
                            >
                                <Text style={[
                                    styles.optionText,
                                    (profileData.trialsParticipation && option === 'Yes') || (!profileData.trialsParticipation && option === 'No') ? styles.selectedOptionText : null
                                ]}>
                                    {option}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
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

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {renderStep()}

                <View style={styles.buttonContainer}>
                    <Button
                        title="Next"
                        onPress={handleNext}
                        variant={currentStep === 9 ? "outline" : "outline"}
                        style={styles.nextButton}
                        textStyle={styles.nextButtonText}
                    />
                </View>
            </ScrollView>
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
        paddingHorizontal: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 13,
    },
    content: {
        flex: 1,
        paddingHorizontal: 35,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    stepContainer: {
        marginTop: 0,
        marginBottom: 40,
        width: '100%',
        justifyContent: 'center',
        minHeight: 400,
    },
    questionContainer: {
        marginBottom: 40,
    },
    question: {
        fontSize: 22,
        lineHeight: 23,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 8,
    },
    questionSingle: {
        fontSize: 22,
        lineHeight: 23,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#1B1B1B',
        textAlign: 'center',
        marginBottom: 0,
        position: 'absolute',
        top: 0,
        width: 230,
        alignSelf: 'center',
    },
    subtext: {
        fontSize: 11,
        lineHeight: 13,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#484848',
        textAlign: 'center',
    },
    textInput: {
        width: '100%',
        height: 40,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 6,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Prompt',
        color: '#1B1B1B',
        position: 'absolute',
        top: 187,
        borderWidth: 1,
    },
    textArea: {
        width: '100%',
        height: 40,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 6,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Prompt',
        color: '#1B1B1B',
        marginTop: 61,
        borderWidth: 1,
    },
    inputFocused: {
        borderColor: '#61ABC5',
    },
    inputUnfocused: {
        borderColor: 'transparent',
    },
    optionsContainer: {
        marginTop: 170,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 40,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 6,
        position: 'absolute',
        top: 187,
        alignSelf: 'center',
    },
    dropdownText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Prompt',
        color: '#1B1B1B',
    },
    optionButton: {
        width: 260,
        height: 40,
        backgroundColor: '#EFEFEF',
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 13,
        marginBottom: 4,
    },
    selectedOptionButton: {
        backgroundColor: '#61ABC5',
    },
    optionText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Prompt',
        fontWeight: '400',
        color: '#1B1B1B',
    },
    selectedOptionText: {
        fontFamily: 'Prompt',
        fontWeight: '500',
        color: '#FFFFFF',
    },
    skipLink: {
        alignSelf: 'center',
        marginTop: 40,
    },
    skipText: {
        fontSize: 11,
        lineHeight: 17,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#1B1B1B',
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        width: 260,
        alignSelf: 'center',
        marginTop: 20,
    },
    nextButton: {
        width: 260,
        height: 35,
        backgroundColor: '#F8F8F8',
        borderColor: '#FF01B4',
        borderWidth: 1,
    },
    nextButtonText: {
        fontSize: 11,
        lineHeight: 17,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#FF01B4',
    },
});

export default ProfileSetupScreen;