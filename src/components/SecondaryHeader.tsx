import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BackButton from './BackButton';
import Logo from './Logo';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../theme/theme';

interface SecondaryHeaderProps {
    title: string;
    onBack: () => void;
    icon?: {
        name: keyof typeof Ionicons.glyphMap;
        size?: number;
        color?: string;
    };
    rightElement?: React.ReactNode; // e.g., asterisk (*)
    titleColor?: string;
}

const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({
    title,
    onBack,
    icon,
    rightElement,
    titleColor = theme.colors.textPrimary,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <BackButton
                onPress={onBack}
                size={17}
                style={styles.backButton}
            />
            <View style={styles.headerCenter}>
                {icon && (
                    <Ionicons
                        name={icon.name}
                        size={icon.size || 20}
                        color={icon.color || '#999999'}
                    />
                )}
                <Text style={[styles.headerTitle, { color: titleColor }]}>
                    {title}
                </Text>
            </View>
            {rightElement}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // paddingBottom: theme.spacing.base,
        marginBottom: 30,
    },
    backButton: {
        width: 17,
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    asterisk: {
        fontSize: 18,
        color: theme.colors.asteriskPink,
    },
});

export default SecondaryHeader;

