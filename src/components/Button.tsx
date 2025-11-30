import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme/theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                styles[variant],
                disabled && styles.disabled,
                style,
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.spacing.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        height: theme.spacing.buttonHeight,
        minHeight: theme.spacing.buttonHeight,
        paddingVertical: 0,
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
        opacity: 0.5,
    },
    text: {
        ...theme.typography.presets.button,
    },
    primaryText: {
        ...theme.typography.presets.button,
        color: theme.colors.buttonPrimaryText,
    },
    secondaryText: {
        ...theme.typography.presets.button,
        color: theme.colors.buttonSecondaryText,
    },
    outlineText: {
        ...theme.typography.presets.button,
        color: theme.colors.buttonSecondaryText,
    },
});

export default Button;

