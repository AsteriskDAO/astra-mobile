import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import MetricsCards from '../../components/MetricsCards';
import WhatsNextSection from '../../components/WhatsNextSection';
import { useTab } from '../../contexts/TabContext';
import { theme } from '../../theme/theme';
import { useFixedHeaderHeight } from '../../hooks/useFixedHeaderHeight';

const DashboardScreen: React.FC = () => {
    const navigation = useNavigation();
    const headerHeight = useFixedHeaderHeight();
    const { setActiveTab } = useTab();

    const handleStartCheckin = () => {
        // Switch to chat tab to show DailyCheckinScreen
        setActiveTab('chat');
        // Navigate to MainContainer if we're on a sub-screen
        navigation.navigate('MainContainer' as never);
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
                            onPress: () => navigation.navigate('ResearchInvite' as never),
                        },
                        {
                            iconSource: require('../../../assets/vote.svg'),
                            title: 'Cast your vote',
                            subtitle: "Help shape AsteriskDAO's next step.",
                            onPress: () => {
                                // Navigate to voting screen when implemented
                            },
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
        backgroundColor: '#F8F8F8',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    greeting: {
        fontFamily: 'Prompt',
        fontSize: 15,
        fontWeight: '500',
        color: '#232323',
    },
    asterisk: {
        fontSize: 16,
        color: '#FF01B4',
    },
    dateSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dateChip: {
        width: 40,
        height: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CAE0E7',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    dateChipActive: {
        backgroundColor: 'rgba(202, 224, 231, 0.57)',
    },
    dateChipSelected: {
        borderColor: '#61ABC5',
    },
    dateDay: {
        fontFamily: 'Prompt',
        fontSize: 9,
        color: '#61ABC5',
        marginBottom: 4,
    },
    dateDaySelected: {
        color: '#1B1B1B',
        fontWeight: '500',
    },
    dateNumber: {
        fontFamily: 'Prompt',
        fontSize: 9,
        color: '#61ABC5',
    },
    dateNumberSelected: {
        color: '#1B1B1B',
        fontWeight: '500',
    },
    checkinCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        marginBottom: 24,
        alignItems: 'center',
    },
    checkinSubtitle: {
        fontFamily: 'Prompt',
        fontSize: 13,
        color: '#949494',
        marginBottom: 8,
    },
    checkinTitle: {
        fontFamily: 'Prompt',
        fontSize: 18,
        fontWeight: '500',
        color: '#232323',
        textAlign: 'center',
        marginBottom: 20,
    },
    checkinButton: {
        width: '100%',
    },
    sectionTitle: {
        fontFamily: 'Prompt',
        fontSize: 13,
        fontWeight: '500',
        color: '#232323',
        marginBottom: 16,
    },
    trendsButton: {
        marginBottom: 24,
        borderRadius: 10,
    },

});

export default DashboardScreen;

