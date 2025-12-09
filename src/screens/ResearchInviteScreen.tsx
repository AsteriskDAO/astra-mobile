import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundPattern from '../components/BackgroundPattern';
import SecondaryHeader from '../components/SecondaryHeader';
import Button from '../components/Button';
import { theme } from '../theme/theme';
import { LAYOUT } from '../constants/layout';

const ResearchInviteScreen: React.FC = () => {
    const navigation = useNavigation();
    const [hasResponded, setHasResponded] = useState(false);
    const [isInterested, setIsInterested] = useState(false);

    // In a real app, this would come from user context/state
    const username = 'User'; // Replace with actual username

    const handleCountMeIn = () => {
        setHasResponded(true);
        setIsInterested(true);
        // In a real app, this would make an API call to register interest
    };

    const handleNotInterested = () => {
        setHasResponded(true);
        setIsInterested(false);
        // In a real app, this would make an API call to decline
    };

    const handleLearnMore = () => {
        Linking.openURL('https://study.asteriskdao.xyz/pcos-study');
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <SecondaryHeader
                    title="Research Invite"
                    onBack={() => navigation.goBack()}
                    rightElement={
                        <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}>
                            <Ionicons name="person-outline" size={24} color={theme.colors.textPrimary} />
                        </TouchableOpacity>
                    }
                />

                {/* Research Invitation Card */}
                <View style={styles.card}>
                    {/* Card Header */}
                    <View style={styles.cardHeader}>
                        <Ionicons name="document-text-outline" size={16} color={theme.colors.white} />
                        <Text style={styles.cardHeaderText}>Research invitation</Text>
                    </View>

                    {/* Card Body */}
                    <View style={styles.cardBody}>
                        <Text style={styles.studyTitle}>PCOS Symptom Tracking Study</Text>

                        <Text style={styles.greeting}>Hi {username},</Text>

                        <Text style={styles.description}>
                            We're inviting you to join our PCOS Symptom Tracking Study. By sharing daily check-ins, you'll help researchers understand how lifestyle factors affect PCOS symptoms over time.
                        </Text>

                        {/* Study Details */}
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailRow}>
                                <Ionicons name="calendar-outline" size={16} color={theme.colors.textPrimary} />
                                <Text style={styles.detailText}>Duration: 6 weeks</Text>
                            </View>

                            <View style={styles.detailRow}>
                                <Ionicons name="trophy-outline" size={16} color={theme.colors.textPrimary} />
                                <Text style={styles.detailText}>Reward: 150 points + early access to study results</Text>
                            </View>

                            <TouchableOpacity
                                style={styles.detailRow}
                                onPress={handleLearnMore}
                                activeOpacity={0.7}
                            >
                                <Ionicons name="link-outline" size={16} color={theme.colors.textPrimary} />
                                <Text style={styles.linkText}>Learn more & sign up: study.asteriskdao.xyz/pcos-study</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Response Status or Action Buttons */}
                        {hasResponded ? (
                            <View style={styles.responseContainer}>
                                <View style={styles.thankYouContainer}>
                                    <Text style={styles.thankYouText}>Thank you for your interest!</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.buttonContainer}>
                                <Button
                                    title="Count me in"
                                    onPress={handleCountMeIn}
                                    variant="primary"
                                    style={styles.button}
                                />
                                <Button
                                    title="Not interested"
                                    onPress={handleNotInterested}
                                    variant="outline"
                                    style={styles.button}
                                />
                            </View>
                        )}
                    </View>
                </View>
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
        paddingHorizontal: LAYOUT.CONTENT_PADDING_HORIZONTAL,
    },
    scrollContent: {
        paddingBottom: theme.spacing.bottomNavHeight + theme.spacing.base,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: theme.spacing.base,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        backgroundColor: theme.colors.ocean,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    cardHeaderText: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.white,
        fontSize: 12,
        fontWeight: '500',
    },
    cardBody: {
        padding: 16,
    },
    studyTitle: {
        ...theme.typography.presets.h2,
        color: theme.colors.textPrimary,
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    greeting: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        fontSize: 14,
        marginBottom: 12,
    },
    description: {
        ...theme.typography.presets.body,
        color: theme.colors.textSecondary,
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 20,
    },
    detailsContainer: {
        gap: 12,
        marginBottom: 20,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
    },
    detailText: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
        fontSize: 13,
        flex: 1,
        lineHeight: 20,
    },
    linkText: {
        ...theme.typography.presets.body,
        color: theme.colors.ocean,
        fontSize: 13,
        flex: 1,
        lineHeight: 20,
        textDecorationLine: 'underline',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    button: {
        flex: 1,
    },
    responseContainer: {
        marginTop: 8,
    },
    thankYouContainer: {
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    thankYouText: {
        ...theme.typography.presets.body,
        color: '#4CAF50',
        fontSize: 13,
        fontWeight: '500',
    },
});

export default ResearchInviteScreen;

