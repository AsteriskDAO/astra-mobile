import React, { ReactNode } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';

interface ButtonProps {
    title?: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
    disabledBackgroundColor?: string;
    children?: ReactNode;
    icon?: {
        name: keyof typeof Ionicons.glyphMap;
        size?: number;
        color?: string;
        position?: 'left' | 'right';
    };
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    disabled = false,
    disabledBackgroundColor,
    children,
    icon,
}) => {
    const renderContent = () => {
        if (children) {
            return children;
        }

        if (icon && title) {
            const iconElement = (
                <Ionicons
                    name={icon.name}
                    size={icon.size || 20}
                    color={icon.color || (disabled ? theme.colors.buttonDisabledText : (variant === 'outline' ? theme.colors.asteriskPink : theme.colors.buttonPrimaryText))}
                />
            );

            return (
                <View style={styles.iconButtonContent}>
                    {icon.position === 'right' ? (
                        <>
                            <Text style={[styles.text, styles[`${variant}Text`], disabled && styles.disabledText, textStyle]}>
                                {title}
                            </Text>
                            {iconElement}
                        </>
                    ) : (
                        <>
                            {iconElement}
                            <Text style={[styles.text, styles[`${variant}Text`], disabled && styles.disabledText, textStyle]}>
                                {title}
                            </Text>
                        </>
                    )}
                </View>
            );
        }

        if (title) {
            return (
                <Text style={[styles.text, styles[`${variant}Text`], disabled && styles.disabledText, textStyle]}>
                    {title}
                </Text>
            );
        }

        return null;
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[variant],
                disabled && (disabledBackgroundColor ? { backgroundColor: disabledBackgroundColor } : styles.disabled),
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {renderContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.spacing.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
    },
    primary: {
        backgroundColor: theme.colors.buttonPrimary,
    },
    secondary: {
        backgroundColor: theme.colors.buttonSecondary,
        borderWidth: theme.spacing.borderWidth.thin,
        borderColor: theme.colors.buttonPrimary,
    },
    outline: {
        backgroundColor: theme.colors.buttonSecondary,
        borderWidth: theme.spacing.borderWidth.thin,
        borderColor: theme.colors.buttonPrimary,
    },
    disabled: {
        backgroundColor: theme.colors.buttonDisabled,
        opacity: 1,
    },
    text: {
        ...theme.typography.presets.button,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    primaryText: {
        ...theme.typography.presets.button,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: theme.colors.buttonPrimaryText,
        fontFamily: theme.typography.fontFamily.prompt,
    },
    secondaryText: {
        ...theme.typography.presets.button,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: theme.colors.buttonSecondaryText,
        fontFamily: theme.typography.fontFamily.prompt,
    },
    outlineText: {
        ...theme.typography.presets.button,
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        color: theme.colors.buttonSecondaryText,
        fontFamily: theme.typography.fontFamily.prompt,
    },
    disabledText: {
        color: theme.colors.buttonDisabledText,
    },
    iconButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
});

export default Button;

