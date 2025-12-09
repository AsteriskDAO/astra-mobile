import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface DayStreakCardProps {
    streakCount: number;
    onPress?: () => void;
}

const DayStreakCard: React.FC<DayStreakCardProps> = ({ streakCount, onPress }) => {
    const content = (
        <View style={styles.streakCard}>
            <View style={styles.streakContent}>
                <Ionicons name="flame" size={15} color={theme.colors.asteriskPink} />
                <Text style={styles.streakTitle}>Day Streak</Text>
            </View>
            <View style={styles.streakRight}>
                <Text style={styles.streakNumber}>{streakCount}</Text>
                <Ionicons name="chevron-forward" size={8} color={theme.colors.textDisabled} />
            </View>
        </View>
    );

    if (onPress) {
        return (
            <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
                {content}
            </TouchableOpacity>
        );
    }

    return content;
};

const styles = StyleSheet.create({
    streakCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        height: 40,
        paddingHorizontal: 12,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    streakContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    streakTitle: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 13,
        fontWeight: '500',
        color: theme.colors.textPrimary,
    },
    streakRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    streakNumber: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.textPrimary,
    },
});

export default DayStreakCard;

