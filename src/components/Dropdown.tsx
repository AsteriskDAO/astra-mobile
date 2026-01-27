import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { FONT_SIZES } from '../constants/fontSizes';

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    value: string;
    options: DropdownOption[];
    onSelect: (value: string) => void;
    placeholder?: string;
    style?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
    value,
    options,
    onSelect,
    placeholder = 'Select an option',
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === value);

    return (
        <>
            <TouchableOpacity
                style={[styles.dropdown, style]}
                onPress={() => setIsOpen(true)}
            >
                <Text style={[styles.dropdownText, !value && styles.placeholder]}>
                    {selectedOption ? selectedOption.label : placeholder}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#949494" />
            </TouchableOpacity>

            <Modal
                visible={isOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={() => setIsOpen(false)}
                >
                    <Pressable
                        style={styles.modalContent}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select an option</Text>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.optionsList}>
                            {options.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={[
                                        styles.option,
                                        value === option.value && styles.selectedOption,
                                    ]}
                                    onPress={() => {
                                        onSelect(option.value);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Text
                                        style={[
                                            styles.optionText,
                                            value === option.value && styles.selectedOptionText,
                                        ]}
                                    >
                                        {option.label}
                                    </Text>
                                    {value === option.value && (
                                        <Ionicons name="checkmark" size={20} color={theme.colors.asteriskPink} />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    dropdownText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: '#272727',
    },
    placeholder: {
        color: '#949494',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        width: '85%',
        maxHeight: '70%',
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalTitle: {
        fontSize: FONT_SIZES.h4,
        fontWeight: '600',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
    },
    optionsList: {
        maxHeight: 400,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    selectedOption: {
        backgroundColor: '#F5F5F5',
    },
    optionText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
    },
    selectedOptionText: {
        fontWeight: '500',
    },
});

export default Dropdown;
