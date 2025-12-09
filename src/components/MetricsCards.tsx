import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

interface MetricCardProps {
    value: string;
    label: string;
}

interface MetricsCardsProps {
    pointsEarned: string;
    rank: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ value, label }) => {
    return (
        <View style={[styles.metricCard]}>
            <Text style={[styles.metricNumber]}>{value}</Text>
            <Text style={[styles.metricLabel]}>{label}</Text>
        </View>
    );
};

const MetricsCards: React.FC<MetricsCardsProps> = ({ pointsEarned, rank }) => {
    return (
        <View style={[styles.metricsContainer]}>
            <MetricCard value={pointsEarned} label="points earned" />
            <MetricCard value={rank} label="ranked today" />
        </View>
    );
};

const styles = StyleSheet.create({
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        gap: 10,
    },
    metricCard: {
        flex: 1,
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    metricNumber: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 15,
        fontWeight: '500',
        color: theme.colors.textPrimary,
        marginBottom: 4,
        textAlign: 'center',
    },

    metricLabel: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 10,
        fontWeight: '400',
        color: theme.colors.textDisabled,
        textAlign: 'center',
    }
});

export default MetricsCards;

