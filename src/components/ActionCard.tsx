import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, Image, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface ActionCardProps {
    icon?: {
        name: keyof typeof Ionicons.glyphMap;
        size?: number;
        color?: string;
    };
    iconSource?: ImageSourcePropType;
    title: string;
    subtitle: string;
    onPress?: () => void;
    showChevron?: boolean;
    style?: ViewStyle;
}

const ActionCard: React.FC<ActionCardProps> = ({
    icon,
    iconSource,
    title,
    subtitle,
    onPress,
    showChevron = true,
    style,
}) => {
    const CardComponent = onPress ? TouchableOpacity : View;

    return (
        <CardComponent
            style={[styles.card, style]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            {iconSource ? (
                <Image source={iconSource} style={styles.iconImage} resizeMode="contain" />
            ) : icon ? (
                <Ionicons
                    name={icon.name}
                    size={icon.size || 24}
                    color={icon.color || '#232323'}
                />
            ) : null}
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
            </View>
            {showChevron && (
                <Ionicons name="chevron-forward" size={20} color="#949494" />
            )}
        </CardComponent>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        marginBottom: 12,
    },
    iconImage: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 1,
        marginLeft: 12,
    },
    title: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 13,
        fontWeight: '500',
        color: '#232323',
        marginBottom: 4,
    },
    subtitle: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 10,
        color: '#949494',
    },
});

export default ActionCard;

