import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';
import { FONT_SIZES } from '../constants/fontSizes';

interface DetailRowProps {
    label: string;
    value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
    return (
        <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{label}</Text>
            <Text style={styles.detailValue}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailLabel: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textDisabled,
    },
    detailValue: {
        fontSize: FONT_SIZES.subtitle,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textSecondary,
    },
});

export default DetailRow;
