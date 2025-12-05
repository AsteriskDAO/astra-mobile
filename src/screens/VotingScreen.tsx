import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import BackgroundPattern from '../components/BackgroundPattern';
import { theme } from '../theme/theme';

const VotingScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const insets = useSafeAreaInsets();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);
    const username = 'username'; // This would come from user context

    // Mock voting results - in real app, this would come from API
    const votingResults = [
        { option: 'Option 1', votes: 4, color: '#CAE0E7' },
        { option: 'Option 2', votes: 2, color: '#E0E7CA' },
        { option: 'Option 3', votes: 10, color: '#E7CADD' },
    ];

    const handleSubmitVote = () => {
        if (selectedOption) {
            // Handle vote submission
            setVoteSubmitted(true);
        }
    };

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                        size={17}
                        style={StyleSheet.flatten([styles.backButton, { top: insets.top }])}
                    />
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Your voice matters</Text>
                        <Logo size={16} tintColor={theme.colors.asteriskPink} style={styles.asteriskLogo} />
                    </View>
                    <View style={[styles.headerRight, { top: insets.top }]}>
                        <View style={styles.profileIconContainer}>
                            <View style={styles.profileIconCircle}>
                                <View style={styles.profileIconInnerCircle} />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Voting Card */}
                <View style={styles.votingCard}>
                    {/* Cast your vote banner */}
                    <View style={styles.voteBanner}>
                        <Ionicons name="people-outline" size={13} color={theme.colors.white} />
                        <Text style={styles.voteBannerText}>Cast your vote</Text>
                    </View>

                    {/* Question */}
                    <View style={styles.questionSection}>
                        <Text style={styles.questionTitle}>What's next</Text>
                        <Text style={styles.greeting}>Hi {username},</Text>
                        <Text style={styles.instruction}>Help shape AsteriskDAO's next step.</Text>
                    </View>

                    {!voteSubmitted ? (
                        <>
                            {/* Options */}
                            <View style={styles.optionsContainer}>
                                {options.map((option, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.optionButton,
                                            selectedOption === option && styles.optionButtonSelected
                                        ]}
                                        onPress={() => setSelectedOption(option)}
                                    >
                                        <Text style={[
                                            styles.optionText,
                                            selectedOption === option && styles.optionTextSelected
                                        ]}>
                                            {option}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* Submit Button */}
                            <View style={styles.submitButtonContainer}>
                                <TouchableOpacity
                                    style={[
                                        styles.submitButton,
                                        !selectedOption && styles.submitButtonDisabled
                                    ]}
                                    onPress={handleSubmitVote}
                                    disabled={!selectedOption}
                                >
                                    <Text style={styles.submitButtonText}>Submit vote</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    ) : (
                        /* Thank you message */
                        <View style={styles.thankYouContainer}>
                            <View style={styles.thankYouBox}>
                                <Text style={styles.thankYouText}>Thank you for your vote!</Text>
                            </View>
                        </View>
                    )}
                </View>

                {/* Results Card */}
                {voteSubmitted && (
                    <View style={styles.resultsCard}>
                        <View style={styles.resultsBanner}>
                            <Text style={styles.resultsBannerText}>Results</Text>
                        </View>
                        <View style={styles.resultsContent}>
                            {votingResults.map((result, index) => {
                                const maxVotes = Math.max(...votingResults.map(r => r.votes));
                                const barWidth = (result.votes / maxVotes) * 160; // Max width based on Figma
                                return (
                                    <View key={index} style={styles.resultItem}>
                                        <Text style={styles.resultOptionLabel}>{result.option}</Text>
                                        <View style={styles.resultBarContainer}>
                                            <View style={[styles.resultBar, {
                                                backgroundColor: result.color,
                                                width: Math.max(barWidth, 35),
                                            }]}>
                                                <Text style={styles.resultVotes}>{result.votes}</Text>
                                            </View>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.contentPaddingHorizontal,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: theme.spacing.base,
        marginBottom: theme.spacing.base,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    headerTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    asteriskLogo: {
        marginLeft: 2,
    },
    headerRight: {
        position: 'absolute',
        right: 0,
        width: 14,
        height: 14,
    },
    profileIconContainer: {
        width: 14,
        height: 14,
    },
    profileIconCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIconInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1.2,
        borderColor: theme.colors.textSecondary,
        backgroundColor: theme.colors.textSecondary,
    },
    votingCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: theme.spacing.xl,
    },
    voteBanner: {
        backgroundColor: theme.colors.ocean,
        paddingVertical: 8,
        paddingHorizontal: theme.spacing.base,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    voteBannerText: {
        ...theme.typography.presets.h3,
        color: theme.colors.white,
        fontSize: 12,
    },
    questionSection: {
        padding: theme.spacing.base,
        paddingTop: theme.spacing.lg,
    },
    questionTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.sm,
    },
    greeting: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    instruction: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textSecondary,
        fontSize: 11,
        lineHeight: 12,
    },
    optionsContainer: {
        paddingHorizontal: theme.spacing.base,
        paddingBottom: theme.spacing.base,
        gap: theme.spacing.base,
    },
    optionButton: {
        width: 220,
        height: 40,
        backgroundColor: theme.colors.inputBackground,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 13,
        alignSelf: 'center',
    },
    optionButtonSelected: {
        backgroundColor: theme.colors.ocean,
    },
    optionText: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        fontSize: 12,
    },
    optionTextSelected: {
        color: theme.colors.white,
        fontWeight: '500',
    },
    submitButtonContainer: {
        paddingHorizontal: theme.spacing.base,
        paddingBottom: theme.spacing.base,
    },
    submitButton: {
        width: 220,
        height: 30,
        backgroundColor: theme.colors.asteriskPink,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: theme.colors.asteriskPink,
    },
    submitButtonDisabled: {
        backgroundColor: '#C6C6C6',
        borderColor: '#C6C6C6',
    },
    submitButtonText: {
        ...theme.typography.presets.button,
        color: theme.colors.white,
        fontSize: 11,
        lineHeight: 17,
    },
    thankYouContainer: {
        paddingHorizontal: theme.spacing.base,
        paddingBottom: theme.spacing.base,
    },
    thankYouBox: {
        width: 220,
        height: 32,
        backgroundColor: '#F1F9EC',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    thankYouText: {
        ...theme.typography.presets.h3,
        color: '#84BB5C',
        fontSize: 12,
    },
    resultsCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: theme.spacing.xl,
    },
    resultsBanner: {
        backgroundColor: theme.colors.ocean,
        paddingVertical: 8,
        paddingHorizontal: theme.spacing.base,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    resultsBannerText: {
        ...theme.typography.presets.h3,
        color: theme.colors.white,
        fontSize: 12,
    },
    resultsContent: {
        padding: theme.spacing.base,
        gap: theme.spacing.base,
    },
    resultItem: {
        marginBottom: theme.spacing.base,
    },
    resultOptionLabel: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textSecondary,
        fontSize: 11,
        marginBottom: 4,
    },
    resultBarContainer: {
        width: 160,
    },
    resultBar: {
        height: 16,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 3,
        paddingHorizontal: 32,
        minWidth: 35,
    },
    resultVotes: {
        fontFamily: 'monospace',
        fontSize: 9,
        lineHeight: 10,
        color: theme.colors.textSecondary,
    },
});

export default VotingScreen;

