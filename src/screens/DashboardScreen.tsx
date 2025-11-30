import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import Button from '../components/Button';
import Logo from '../components/Logo';

const DashboardScreen: React.FC = () => {
    const navigation = useNavigation();

    const handleTabPress = (tab: string) => {
        if (tab === 'home') {
            // Already on home
        } else if (tab === 'community') {
            navigation.navigate('Profile' as never);
        } else if (tab === 'notifications') {
            navigation.navigate('DailyCheckin' as never);
        } else if (tab === 'settings') {
            navigation.navigate('Profile' as never);
        }
    };

    const handleStartCheckin = () => {
        navigation.navigate('DailyCheckin' as never);
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
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Top Bar */}
                <View style={styles.topBar}>
                    <View style={styles.streakIndicator}>
                        <Ionicons name="flame" size={20} color="#232323" />
                        <Text style={styles.streakNumber}>3</Text>
                    </View>
                    <View style={styles.greetingContainer}>
                        <Text style={styles.greeting}>Good morning!</Text>
                        <Logo size={16} tintColor="#FF01B4" />
                    </View>
                    <Ionicons name="person-outline" size={24} color="#232323" />
                </View>

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
                        style={styles.checkinButton}
                        textStyle={styles.checkinButtonText}
                    />
                </View>

                {/* Keep it up Section */}
                <Text style={styles.sectionTitle}>Keep it up</Text>
                <View style={styles.metricsContainer}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricNumber}>12</Text>
                        <Text style={styles.metricLabel}>points earned</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricNumber}>#23</Text>
                        <Text style={styles.metricLabel}>ranked today</Text>
                    </View>
                </View>

                <View style={styles.trendsBar}>
                    <Text style={styles.trendsText}>My health trends</Text>
                    <Text style={styles.trendsComingSoon}>(coming soon)</Text>
                </View>

                {/* What's next Section */}
                <Text style={styles.sectionTitle}>What's next for you</Text>
                <TouchableOpacity style={styles.actionCard}>
                    <Ionicons name="mail-outline" size={24} color="#232323" />
                    <View style={styles.actionCardContent}>
                        <Text style={styles.actionCardTitle}>Research invite</Text>
                        <Text style={styles.actionCardSubtitle}>
                            You've been invited to join Study XYZ
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#949494" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionCard}>
                    <Ionicons name="checkmark-circle-outline" size={24} color="#232323" />
                    <View style={styles.actionCardContent}>
                        <Text style={styles.actionCardTitle}>Cast your vote</Text>
                        <Text style={styles.actionCardSubtitle}>
                            Help shape AsteriskDAO's next step.
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#949494" />
                </TouchableOpacity>
            </ScrollView>

            <BottomNavigation activeTab="home" onTabPress={handleTabPress} />
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
        paddingHorizontal: 20,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 60,
        paddingBottom: 20,
    },
    streakIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    streakNumber: {
        fontFamily: 'Prompt',
        fontSize: 15,
        fontWeight: '500',
        color: '#232323',
    },
    greetingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
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
        backgroundColor: '#FF01B4',
        borderRadius: 10,
        paddingVertical: 12,
    },
    checkinButtonText: {
        fontFamily: 'Prompt',
        fontWeight: '500',
        fontSize: 11,
        color: '#FFFFFF',
    },
    sectionTitle: {
        fontFamily: 'Prompt',
        fontSize: 13,
        fontWeight: '500',
        color: '#232323',
        marginBottom: 16,
    },
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    metricCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 6,
    },
    metricNumber: {
        fontFamily: 'Prompt',
        fontSize: 15,
        fontWeight: '500',
        color: '#232323',
        marginBottom: 4,
    },
    metricLabel: {
        fontFamily: 'Prompt',
        fontSize: 10,
        color: '#949494',
        textAlign: 'center',
    },
    trendsBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
    },
    trendsText: {
        fontFamily: 'Prompt',
        fontSize: 13,
        color: '#949494',
    },
    trendsComingSoon: {
        fontFamily: 'Prompt',
        fontSize: 13,
        color: '#949494',
    },
    actionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
    },
    actionCardContent: {
        flex: 1,
        marginLeft: 12,
    },
    actionCardTitle: {
        fontFamily: 'Prompt',
        fontSize: 13,
        fontWeight: '500',
        color: '#232323',
        marginBottom: 4,
    },
    actionCardSubtitle: {
        fontFamily: 'Prompt',
        fontSize: 10,
        color: '#949494',
    },
});

export default DashboardScreen;

