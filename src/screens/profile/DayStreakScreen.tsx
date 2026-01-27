import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';
import Logo from '../../components/Logo';
import { FONT_SIZES } from '../../constants/fontSizes';
import { theme } from '../../theme/theme';
const DayStreakScreen: React.FC = () => {
    const navigation = useNavigation();

    const currentStreak = 3;
    const weekDays = [
        { day: 'Mo', date: '18', isActive: true },
        { day: 'Tu', date: '19', isActive: false },
        { day: 'We', date: '20', isActive: true },
        { day: 'Th', date: '21', isActive: true },
        { day: 'Fr', date: '22', isActive: true },
        { day: 'Sa', date: '23', isActive: true },
        { day: 'Su', date: '24', isActive: false, isCurrent: true },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false} >
            <SecondaryHeader
                title="Day Streak"
                onBack={() => navigation.goBack()}
                icon={{
                    name: 'flame',
                    size: 15,
                    color: theme.colors.asteriskPink,
                }}
                // rightElement={<Logo size={13} tintColor={theme.colors.asteriskPink} />}
            />

            {/* Streak Display */}
            <View style={styles.streakContainer}>
                <View style={styles.flameIcon}>
                    <Ionicons name="flame" size={60} color={theme.colors.asteriskPink} />
                </View>
                <Text style={styles.streakNumber}>{currentStreak}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
            </View>
            <View style={styles.scrollContent}>
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
            </View>
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
        alignItems: 'center',
    },
    asterisk: {
        fontSize: FONT_SIZES.h3,
        color: theme.colors.asteriskPink,
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
        fontSize: FONT_SIZES.displayLarge,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    streakLabel: {
        fontSize: FONT_SIZES.h4,
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
        fontSize: FONT_SIZES.h4,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 16,
    },
    weekDays: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 6,
    },
    dayButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 28,
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#CAE0E7',
        backgroundColor: 'transparent',
    },
    activeDayButton: {
        backgroundColor: 'rgba(202, 224, 231, 0.57)',
        borderColor: '#CAE0E7',
    },
    currentDayButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#61ABC5',
    },
    dayText: {
        fontSize: 9,
        lineHeight: 9,
        fontFamily: 'Prompt',
        fontWeight: '400',
        color: '#61ABC5',
        marginBottom: 2,
        textAlign: 'center',
    },
    activeDayText: {
        color: '#61ABC5',
        fontWeight: '400',
    },
    currentDayText: {
        color: '#1B1B1B',
        fontWeight: '500',
    },
    dateText: {
        fontSize: 9,
        lineHeight: 9,
        fontFamily: 'Prompt',
        fontWeight: '400',
        color: '#61ABC5',
        textAlign: 'center',
    },
    activeDateText: {
        color: '#61ABC5',
        fontWeight: '400',
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
        fontSize: FONT_SIZES.h4,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12,
    },
    messageText: {
        fontSize: FONT_SIZES.subtitle,
        color: '#666666',
        lineHeight: 20,
    },
});

export default DayStreakScreen;

