import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundPattern from '../../components/BackgroundPattern';
import SecondaryHeader from '../../components/SecondaryHeader';
import Button from '../../components/Button';
import { theme } from '../../theme/theme';
import { LAYOUT } from '../../constants/layout';
import { apiService } from '../../services/api';
import { useUser } from '../../contexts/UserContext';
import { useApiCall } from '../../hooks/useApiCall';

interface ResearchInvite {
    id: string;
    title: string;
    message: string;
    type?: string;
    client: string;
    link: string;
    isPrivate: boolean;
}

const ResearchInviteScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userHash } = useUser();
    const [invite, setInvite] = useState<ResearchInvite | null>(null);
    const [hasResponded, setHasResponded] = useState(false);
    const [isInterested, setIsInterested] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userStatus, setUserStatus] = useState<any>(null);

    const { execute: executeResponse, isLoading: isSubmitting } = useApiCall({
        showErrorAlert: true,
        errorMessage: 'Failed to submit response',
        onSuccess: async () => {
            if (invite) {
                await loadUserStatus(invite.id);
            }
        },
    });

    // Get invite ID from route params or use a default
    const inviteId = (route.params as any)?.inviteId || null;

    useEffect(() => {
        loadInvite();
    }, [inviteId]);

    const loadInvite = async () => {
        if (!inviteId) {
            // If no invite ID, try to get the first available invite
            try {
                // TODO: Uncomment API calls when ready
                // const invites = await apiService.getResearchInvites();
                // if (invites.length > 0) {
                //     setInvite(invites[0]);
                //     await loadUserStatus(invites[0].id);
                // }
            } catch (error) {
                console.error('Failed to load invites:', error);
            } finally {
                setIsLoading(false);
            }
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Uncomment API calls when ready
            // const inviteData = await apiService.getResearchInviteById(inviteId);
            // setInvite(inviteData);
            // await loadUserStatus(inviteId);
        } catch (error) {
            Alert.alert('Error', 'Failed to load research invite');
            console.error('Failed to load invite:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const loadUserStatus = async (id: string) => {
        if (!userHash) return;
        
        try {
            // TODO: Uncomment API calls when ready
            // const status = await apiService.getResearchInviteUserStatus(id, userHash);
            // setUserStatus(status);
            // setHasResponded(status.hasResponded);
            // if (status.hasResponded) {
            //     setIsInterested(status.response === 'yes');
            // }
        } catch (error) {
            console.error('Failed to load user status:', error);
        }
    };

    const handleCountMeIn = async () => {
        if (!invite || !userHash) {
            Alert.alert('Error', 'User information not available');
            return;
        }

        // TODO: Uncomment API calls when ready
        // await executeResponse(async () => {
        //     const result = await apiService.recordResearchInviteResponse(invite.id, {
        //         user_hash: userHash,
        //         response: 'yes',
        //     });
        //     setHasResponded(true);
        //     setIsInterested(true);
        //     return result;
        // });
        
        // Temporary: Update UI for testing
        setHasResponded(true);
        setIsInterested(true);
    };

    const handleNotInterested = async () => {
        if (!invite || !userHash) {
            Alert.alert('Error', 'User information not available');
            return;
        }

        // TODO: Uncomment API calls when ready
        // await executeResponse(async () => {
        //     const result = await apiService.recordResearchInviteResponse(invite.id, {
        //         user_hash: userHash,
        //         response: 'no',
        //     });
        //     setHasResponded(true);
        //     setIsInterested(false);
        //     return result;
        // });
        
        // Temporary: Update UI for testing
        setHasResponded(true);
        setIsInterested(false);
    };

    const handleLearnMore = () => {
        if (invite?.link) {
            Linking.openURL(invite.link);
        }
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <BackgroundPattern />
                <SecondaryHeader
                    title="Research Invite"
                    onBack={() => navigation.goBack()}
                />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.asteriskPink} />
                </View>
            </View>
        );
    }

    if (!invite) {
        return (
            <View style={styles.container}>
                <BackgroundPattern />
                <SecondaryHeader
                    title="Research Invite"
                    onBack={() => navigation.goBack()}
                />
                <View style={styles.loadingContainer}>
                    <Text style={styles.errorText}>No research invite available</Text>
                </View>
            </View>
        );
    }

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
                        <Text style={styles.studyTitle}>{invite.title}</Text>

                        <Text style={styles.description}>
                            {invite.message}
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

                            {invite.link && (
                                <TouchableOpacity
                                    style={styles.detailRow}
                                    onPress={handleLearnMore}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons name="link-outline" size={16} color={theme.colors.textPrimary} />
                                    <Text style={styles.linkText}>Learn more & sign up: {invite.link}</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Response Status or Action Buttons */}
                        {hasResponded ? (
                            <View style={styles.responseContainer}>
                                <View style={styles.thankYouContainer}>
                                    <Text style={styles.thankYouText}>
                                        {isInterested 
                                            ? 'Thank you for your interest! We\'ll be in touch soon.' 
                                            : 'Thank you for letting us know.'}
                                    </Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.buttonContainer}>
                                <Button
                                    title={isSubmitting ? 'Submitting...' : 'Count me in'}
                                    onPress={handleCountMeIn}
                                    variant="primary"
                                    style={styles.button}
                                    disabled={isSubmitting || (userStatus && !userStatus.canRespond)}
                                />
                                <Button
                                    title={isSubmitting ? 'Submitting...' : 'Not interested'}
                                    onPress={handleNotInterested}
                                    variant="outline"
                                    style={styles.button}
                                    disabled={isSubmitting || (userStatus && !userStatus.canRespond)}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        ...theme.typography.presets.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
});

export default ResearchInviteScreen;

