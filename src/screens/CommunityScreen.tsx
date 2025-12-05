import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundPattern from '../components/BackgroundPattern';
import { theme } from '../theme/theme';
import { useFixedHeaderHeight } from '../hooks/useFixedHeaderHeight';

const CommunityScreen: React.FC = () => {
    const navigation = useNavigation();
    const headerHeight = useFixedHeaderHeight();

    const handleVotingPress = (votingId: string) => {
        navigation.navigate('VotingScreen' as never);
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView
                style={[styles.content, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Ongoing Votings */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Ongoing Votings</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllLink}>See All &gt;</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleVotingPress('whats-next')}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>What's next?</Text>
                            <Text style={styles.cardSubtitle}>Help shape AsteriskDAO's next step.</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={8} color={theme.colors.textDisabled} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => handleVotingPress('october-newsletter')}
                    >
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>October Newsletter</Text>
                            <Text style={styles.cardSubtitle}>Help us decide the topic for our newsletter.</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={8} color={theme.colors.textDisabled} />
                    </TouchableOpacity>
                </View>

                {/* Open Calls */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Open Calls</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllLink}>See All &gt;</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>PCOS Research Group</Text>
                            <Text style={styles.cardSubtitle}>You've been invited to join Study XYZ</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={8} color={theme.colors.textDisabled} />
                    </TouchableOpacity>
                </View>

                {/* What's shaping women's health today */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>What's shaping women's health today</Text>
                    <View style={styles.comingSoonCard}>
                        <Text style={styles.comingSoonTitle}>Global Health Highlights</Text>
                        <Text style={styles.comingSoonText}>(coming soon)</Text>
                    </View>
                </View>

                {/* Latest Articles */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Latest Articles</Text>
                    <TouchableOpacity style={styles.articleCard}>
                        <Text style={styles.articleTitle}>ADHD Report (2/3)</Text>
                        <Ionicons name="open-outline" size={16} color={theme.colors.textDisabled} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.articleCard}>
                        <Text style={styles.articleTitle}>ADHD Report (1/3)</Text>
                        <Ionicons name="open-outline" size={16} color={theme.colors.textDisabled} />
                    </TouchableOpacity>
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
        paddingHorizontal: theme.spacing.contentPaddingHorizontal,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    section: {
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.base,
    },
    sectionTitle: {
        ...theme.typography.presets.body,
        color: theme.colors.textSecondary,
    },
    seeAllLink: {
        ...theme.typography.presets.label,
        color: theme.colors.ocean,
        textDecorationLine: 'underline',
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: theme.spacing.base,
        marginBottom: theme.spacing.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 60,
    },
    cardContent: {
        flex: 1,
        marginRight: theme.spacing.base,
    },
    cardTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    cardSubtitle: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textPlaceholder,
    },
    comingSoonCard: {
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        padding: theme.spacing.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 40,
    },
    comingSoonTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.white,
    },
    comingSoonText: {
        ...theme.typography.presets.label,
        color: '#9F9F9F',
    },
    articleCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: theme.spacing.base,
        marginBottom: theme.spacing.base,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        minHeight: 40,
    },
    articleTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.textSecondary,
    },
});

export default CommunityScreen;

