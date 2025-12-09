import React, { ReactNode } from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../theme/theme';

interface LabelProps {
    children: string | ReactNode;
    required?: boolean;
    style?: TextStyle;
    focused?: boolean; // For input labels that change color when focused
}

const Label: React.FC<LabelProps> = ({
    children,
    required = false,
    style,
    focused = false,
}) => {
    return (
        <Text style={[
            styles.label,
            focused && styles.labelFocused,
            style
        ]}>
            {typeof children === 'string' ? children : children}
            {required && <Text style={styles.required}>*</Text>}
        </Text>
    );
};

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9C9C9C',
        marginBottom: 8,
    },
    labelFocused: {
        color: theme.colors.ocean,
    },
    required: {
        color: theme.colors.asteriskPink,
    },
});

export default Label;

