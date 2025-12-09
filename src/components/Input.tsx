import React, { useState, ReactNode } from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../theme/theme';
import Label from './Label';

interface InputProps {
    label?: string | ReactNode;
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    style?: ViewStyle;
    labelStyle?: TextStyle;
    inputStyle?: TextStyle;
    multiline?: boolean;
    numberOfLines?: number;
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    variant?: 'default' | 'compact'; // default = white background (medication style), compact = smaller padding/font
    height?: number; // Custom height override
    required?: boolean; // Show pink asterisk for required fields
    onFocus?: () => void;
    onBlur?: () => void;
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
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    variant = 'default',
    height,
    required = false,
    onFocus,
    onBlur,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={[styles.container, style]}>
            {label && (
                <Label
                    focused={isFocused}
                    required={required}
                    style={labelStyle}
                >
                    {label}
                </Label>
            )}
            <TextInput
                style={[
                    styles.input,
                    variant === 'compact' && styles.inputCompact,
                    isFocused && styles.inputFocused,
                    multiline && styles.multilineInput,
                    height !== undefined && { height },
                    inputStyle,
                ]}
                placeholder={placeholder}
                placeholderTextColor="#949494"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                multiline={multiline}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onFocus={() => {
                    setIsFocused(true);
                    onFocus?.();
                }}
                onBlur={() => {
                    setIsFocused(false);
                    onBlur?.();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        fontWeight: '400',
        backgroundColor: theme.colors.white,
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    inputFocused: {
        borderColor: theme.colors.ocean,
        borderWidth: 1,
    },
    multilineInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    inputCompact: {
        paddingHorizontal: 13,
        paddingVertical: 6,
        fontSize: 12,
        backgroundColor: theme.colors.inputBackground,
    },
});

export default Input;

