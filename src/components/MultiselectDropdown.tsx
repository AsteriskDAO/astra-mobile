import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import { FONT_SIZES } from '../constants/fontSizes';

interface DropdownOption {
    label: string;
    value: string;
}

interface MultiselectDropdownProps {
    values: string[];
    options: DropdownOption[];
    onSelect: (values: string[]) => void;
    placeholder?: string;
    style?: any;
}

const MultiselectDropdown: React.FC<MultiselectDropdownProps> = ({
    values,
    options,
    onSelect,
    placeholder = 'Select options',
    style,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOptions = options.filter(opt => values.includes(opt.value));
    const displayText = selectedOptions.length > 0 
        ? selectedOptions.map(opt => opt.label).join(', ')
        : placeholder;

    const handleToggle = (value: string) => {
        if (values.includes(value)) {
            onSelect(values.filter(v => v !== value));
        } else {
            onSelect([...values, value]);
        }
    };

    return (
        <>
            <TouchableOpacity
                style={[styles.dropdown, style]}
                onPress={() => setIsOpen(true)}
            >
                <Text 
                    style={[
                        styles.dropdownText, 
                        values.length === 0 && styles.placeholder,
                        values.length > 0 && styles.selectedText
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {displayText}
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
                            <Text style={styles.modalTitle}>Select options</Text>
                            <TouchableOpacity onPress={() => setIsOpen(false)}>
                                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.optionsList}>
                            {options.map((option) => {
                                const isSelected = values.includes(option.value);
                                return (
                                    <TouchableOpacity
                                        key={option.value}
                                        style={[
                                            styles.option,
                                            isSelected && styles.selectedOption,
                                        ]}
                                        onPress={() => handleToggle(option.value)}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                isSelected && styles.selectedOptionText,
                                            ]}
                                        >
                                            {option.label}
                                        </Text>
                                        {isSelected && (
                                            <Ionicons name="checkmark" size={20} color={theme.colors.asteriskPink} />
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
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
        flex: 1,
        marginRight: 8,
    },
    placeholder: {
        color: '#949494',
    },
    selectedText: {
        color: '#272727',
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

export default MultiselectDropdown;
