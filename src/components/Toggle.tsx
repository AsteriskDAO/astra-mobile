import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme/theme';

interface ToggleProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ value, onValueChange, disabled = false }) => {
    return (
        <TouchableOpacity
            style={[
                styles.toggle,
                value && styles.toggleActive,
                disabled && styles.toggleDisabled,
            ]}
            onPress={() => !disabled && onValueChange(!value)}
            activeOpacity={0.7}
            disabled={disabled}
        >
            <View style={[
                styles.toggleThumb,
                value && styles.toggleThumbActive,
            ]} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    toggle: {
        width: 30,
        height: 16,
        backgroundColor: theme.colors.oceanLight,
        borderRadius: 8,
        justifyContent: 'center',
        paddingHorizontal: 1,
    },
    toggleActive: {
        backgroundColor: theme.colors.ocean,
    },
    toggleDisabled: {
        opacity: 0.5,
    },
    toggleThumb: {
        width: 12,
        height: 14,
        backgroundColor: theme.colors.white,
        borderRadius: 7,
        alignSelf: 'flex-start',
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
});

export default Toggle;

