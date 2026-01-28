import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import MetricsCards from '../../components/MetricsCards';
import WhatsNextSection from '../../components/WhatsNextSection';
import { useTab } from '../../contexts/TabContext';
import { theme } from '../../theme/theme';
import { useFixedHeaderHeight } from '../../hooks/useFixedHeaderHeight';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainContainer'>;

const DashboardScreen: React.FC = () => {
    const navigation = useNavigation<DashboardScreenNavigationProp>();
    const headerHeight = useFixedHeaderHeight();
    const { setActiveTab } = useTab();

    const handleStartCheckin = () => {
        // Switch to chat tab to show DailyCheckinScreen
        setActiveTab('chat');
        // Navigate to MainContainer if we're on a sub-screen
        navigation.navigate('MainContainer');
    };

    const days = [
        { day: 'Mo', date: 18, active: false },
        { day: 'Tu', date: 19, active: false },
        { day: 'We', date: 20, active: false },
        { day: 'Th', date: 21, active: true },
        { day: 'Fr', date: 22, active: true },
        { day: 'Sa', date: 23, active: true },
        { day: 'Su', date: 24, active: true, selected: true },
    ];

    return (
        <View style={styles.container}>
            <ScrollView
                style={[styles.content, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Date Selector */}
                <View style={styles.dateSelector}>
                    {days.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.dateChip,
                                item.active && styles.dateChipActive,
                                item.selected && styles.dateChipSelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dateDay,
                                    item.selected && styles.dateDaySelected,
                                ]}
                            >
                                {item.day}
                            </Text>
                            <Text
                                style={[
                                    styles.dateNumber,
                                    item.selected && styles.dateNumberSelected,
                                ]}
                            >
                                {item.date}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Daily Check-in Card */}
                <View style={styles.checkinCard}>
                    <Text style={styles.checkinSubtitle}>Your Daily Check-in</Text>
                    <Text style={styles.checkinTitle}>How are you feeling today?</Text>
                    <Button
                        title="Start check-in"
                        onPress={handleStartCheckin}
                        variant="primary"
                        style={styles.checkinButton}
                    />
                </View>

                {/* Keep it up Section */}
                <Text style={styles.sectionTitle}>Keep it up</Text>
                <MetricsCards pointsEarned="12" rank="#23" />

                <Button
                    title="My health trends (coming soon)"
                    onPress={() => { }}
                    variant="primary"
                    disabled
                    style={styles.trendsButton}
                />

                {/* What's next Section */}
                <WhatsNextSection
                    items={[
                        {
                            iconSource: require('../../../assets/research-invite.svg'),
                            title: 'Research invite',
                            subtitle: "You've been invited to join Study XYZ",
                            onPress: () => navigation.navigate('ResearchInvite'),
                        },
                        {
                            iconSource: require('../../../assets/vote.svg'),
                            title: 'Cast your vote',
                            subtitle: "Help shape AsteriskDAO's next step.",
                            onPress: () => navigation.navigate('VotingScreen', {}),
                        },
                    ]}
                />
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
        paddingHorizontal: theme.spacing.lg,
    },
    scrollContent: {
        paddingBottom: theme.spacing.lg,
    },
    greeting: {
        fontFamily: 'Prompt',
        fontSize: FONT_SIZES.h3,
        fontWeight: '500',
        color: theme.colors.textPrimary,
    },
    asterisk: {
        fontSize: FONT_SIZES.body,
        color: theme.colors.asteriskPink,
    },
    dateSelector: {
        marginTop: theme.spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dateChip: {
        width: 40,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.colors.oceanLight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    dateChipActive: {
        backgroundColor: 'rgba(202, 224, 231, 0.57)',
    },
    dateChipSelected: {
        borderColor: theme.colors.ocean,
    },
    dateDay: {
        fontFamily: 'Prompt',
        fontSize: FONT_SIZES.bodySmall,
        color: theme.colors.ocean,
        marginBottom: theme.spacing.xs,
    },
    dateDaySelected: {
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    dateNumber: {
        fontFamily: 'Prompt',
        fontSize: FONT_SIZES.bodySmall,
        color: theme.colors.ocean,
    },
    dateNumberSelected: {
        color: theme.colors.textPrimary,
        fontWeight: '500',
    },
    checkinCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: theme.spacing.lg,
        marginBottom: 24,
        alignItems: 'center',
    },
    checkinSubtitle: {
        fontFamily: 'Prompt',
        fontSize: FONT_SIZES.subtitle,
        color: theme.colors.textDisabled,
        marginBottom: theme.spacing.xs,
    },
    checkinTitle: {
        fontFamily: 'Prompt',
        fontSize: FONT_SIZES.h4,
        fontWeight: '500',
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.lg,
    },
    checkinButton: {
        width: '100%',
    },
    sectionTitle: {
        fontFamily: 'Prompt',
        fontSize: FONT_SIZES.title,
        fontWeight: '500',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.base,
    },
    trendsButton: {
        marginBottom: 24,
        borderRadius: 10,
    },

});

export default DashboardScreen;

