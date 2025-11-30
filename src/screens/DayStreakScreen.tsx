import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';

const DayStreakScreen: React.FC = () => {
    const navigation = useNavigation();

    const currentStreak = 3;
    const weekDays = [
        { day: 'Mo', date: '18', isActive: true },
        { day: 'Tu', date: '19', isActive: true },
        { day: 'We', date: '20', isActive: true },
        { day: 'Th', date: '21', isActive: false },
        { day: 'Fr', date: '22', isActive: false },
        { day: 'Sa', date: '23', isActive: false },
        { day: 'Su', date: '24', isActive: false, isCurrent: true },
    ];

    const handleTabPress = (tab: string) => {
        if (tab === 'home') {
            navigation.navigate('Dashboard' as never);
        } else if (tab === 'settings') {
            navigation.navigate('Profile' as never);
        } else if (tab === 'notifications') {
            navigation.navigate('DailyCheckin' as never);
        } else if (tab === 'community') {
            navigation.navigate('Profile' as never);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                        size={17}
                    />
                    <View style={styles.headerCenter}>
                        <Ionicons name="flame" size={15} color="#FF01B4" />
                        <Text style={styles.headerTitle}>Day Streak</Text>
                        <Logo size={13} tintColor="#FF01B4" />
                    </View>
                </View>

                {/* Streak Display */}
                <View style={styles.streakContainer}>
                    <View style={styles.flameIcon}>
                        <Ionicons name="flame" size={60} color="#FF01B4" />
                    </View>
                    <Text style={styles.streakNumber}>{currentStreak}</Text>
                    <Text style={styles.streakLabel}>Day Streak</Text>
                </View>

                {/* This Week Section */}
                <View style={styles.weekCard}>
                    <Text style={styles.weekTitle}>This Week</Text>
                    <View style={styles.weekDays}>
                        {weekDays.map((day, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.dayButton,
                                    day.isActive && styles.activeDayButton,
                                    day.isCurrent && styles.currentDayButton,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        day.isActive && styles.activeDayText,
                                        day.isCurrent && styles.currentDayText,
                                    ]}
                                >
                                    {day.day}
                                </Text>
                                <Text
                                    style={[
                                        styles.dateText,
                                        day.isActive && styles.activeDateText,
                                        day.isCurrent && styles.currentDateText,
                                    ]}
                                >
                                    {day.date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Motivational Message */}
                <View style={styles.messageCard}>
                    <Text style={styles.messageTitle}>You're part of something bigger.</Text>
                    <Text style={styles.messageText}>
                        By showing up, you're shaping a future where women's health is finally understood.
                        Keep going, every streak carries the movement forward.
                    </Text>
                </View>
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
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingTop: 44,
        width: '100%',
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    headerTitle: {
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    asterisk: {
        fontSize: 13,
        color: '#FF01B4',
    },
    streakContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    flameIcon: {
        marginBottom: 20,
    },
    streakNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    streakLabel: {
        fontSize: 18,
        color: '#333333',
        fontWeight: '500',
    },
    weekCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    weekTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 16,
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dayButton: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        minWidth: 40,
    },
    activeDayButton: {
        backgroundColor: 'rgba(202, 224, 231, 0.57)',
    },
    currentDayButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#61ABC5',
    },
    dayText: {
        fontSize: 12,
        color: '#999999',
        marginBottom: 4,
    },
    activeDayText: {
        color: 'white',
        fontWeight: '600',
    },
    currentDayText: {
        color: '#1B1B1B',
        fontWeight: '500',
    },
    dateText: {
        fontSize: 9,
        color: '#61ABC5',
        fontWeight: '400',
        fontFamily: 'Prompt',
    },
    activeDateText: {
        color: '#61ABC5',
    },
    currentDateText: {
        color: '#1B1B1B',
        fontWeight: '500',
    },
    messageCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    messageTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12,
    },
    messageText: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
    },
});

export default DayStreakScreen;

