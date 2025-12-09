import React from 'react';
import { View, Text, StyleSheet, TextStyle, ImageSourcePropType } from 'react-native';
import ActionCard from './ActionCard';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export interface ActionItem {
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
}

interface WhatsNextSectionProps {
    title?: string;
    items: ActionItem[];
    titleStyle?: TextStyle;
}

const WhatsNextSection: React.FC<WhatsNextSectionProps> = ({
    title = "What's next for you",
    items,
    titleStyle,
}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            {items.map((item, index) => (
                <ActionCard
                    key={index}
                    icon={item.icon}
                    iconSource={item.iconSource}
                    title={item.title}
                    subtitle={item.subtitle}
                    onPress={item.onPress}
                    showChevron={item.showChevron}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    title: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 13,
        fontWeight: '500',
        color: '#232323',
        marginBottom: 16,
    },
});

export default WhatsNextSection;

