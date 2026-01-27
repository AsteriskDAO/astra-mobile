import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { FONT_SIZES } from '../constants/fontSizes';

interface EditButtonProps {
    onPress: () => void;
    style?: any;
}

const EditButton: React.FC<EditButtonProps> = ({ onPress, style }) => {
    return (
        <TouchableOpacity style={[styles.editButton, style]} onPress={onPress}>
            <Ionicons name="pencil" size={16} color={theme.colors.asteriskPink} />
            <Text style={styles.editButtonText}>edit</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.asteriskPink,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        justifyContent: 'center',
        gap: 4,
    },
    editButtonText: {
        fontSize: FONT_SIZES.subtitle,
        lineHeight: 15,
        fontWeight: '500',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.asteriskPink,
    },
});

export default EditButton;
