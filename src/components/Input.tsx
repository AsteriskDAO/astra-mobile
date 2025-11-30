import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme/theme';

interface InputProps {
    label?: string;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    multiline?: boolean;
    numberOfLines?: number;
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    secureTextEntry = false,
    style,
    labelStyle,
    inputStyle,
    multiline = false,
    numberOfLines = 1,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Text style={[
                    styles.label,
                    isFocused && styles.labelFocused,
                    labelStyle
                ]}>
                    {label}
                </Text>
            )}
            <TextInput
                style={[
                    styles.input,
                    isFocused && styles.inputFocused,
                    multiline && styles.multilineInput,
                    inputStyle,
                ]}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textPlaceholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.base,
    },
    label: {
        ...theme.typography.presets.label,
        color: theme.colors.textPlaceholder,
        marginBottom: theme.spacing.sm,
    },
    labelFocused: {
        color: theme.colors.ocean,
    },
    input: {
        borderWidth: theme.spacing.borderWidth.thin,
        borderColor: 'transparent',
        borderRadius: theme.spacing.radius.base,
        paddingHorizontal: theme.spacing.base,
        paddingVertical: 12,
        fontSize: theme.typography.fontSize.base,
        backgroundColor: theme.colors.inputBackground,
        color: theme.colors.textPrimary,
    },
    inputFocused: {
        borderColor: theme.colors.ocean,
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
});

export default Input;

