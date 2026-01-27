import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EditButton from './EditButton';
import DetailRow from './DetailRow';
import { theme } from '../theme/theme';
import { FONT_SIZES } from '../constants/fontSizes';

interface DetailItem {
    label: string;
    value: string;
}

interface HealthItemCardProps {
    title: string;
    details: DetailItem[];
    onEdit: () => void;
}

const HealthItemCard: React.FC<HealthItemCardProps> = ({ title, details, onEdit }) => {
    return (
        <View style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                <EditButton onPress={onEdit} />
            </View>

            <View style={styles.details}>
                {details.map((detail, index) => (
                    <DetailRow key={index} label={detail.label} value={detail.value} />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: FONT_SIZES.h4,
        fontWeight: 'bold',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textSecondary,
        flex: 1,
        marginRight: 12,
    },
    details: {
        gap: 8,
    },
});

export default HealthItemCard;
