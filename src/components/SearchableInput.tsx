import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import Label from './Label';
import { FONT_SIZES } from '../constants/fontSizes';

interface SearchableInputProps {
    label?: string;
    value: string;
    options: string[];
    onSelect: (value: string) => void;
    onAdd?: (value: string) => void;
    onRemove?: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
    numberOfLines?: number;
    allowMultiple?: boolean;
    selectedValues?: string[];
}

const SearchableInput: React.FC<SearchableInputProps> = ({
    label,
    value,
    options,
    onSelect,
    onAdd,
    onRemove,
    placeholder = 'Start typing',
    multiline = false,
    numberOfLines = 3,
    allowMultiple = false,
    selectedValues = [],
}) => {
    const [searchText, setSearchText] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // Sync searchText with value when value changes externally (for single select)
    useEffect(() => {
        if (!allowMultiple && !isFocused) {
            setSearchText(value || '');
        }
    }, [value, allowMultiple, isFocused]);

    // Initialize searchText on mount
    useEffect(() => {
        if (!allowMultiple && value) {
            setSearchText(value);
        }
    }, []);

    const filteredOptions = useMemo(() => {
        if (!searchText.trim()) {
            // Show all options when search is empty (up to 50)
            return options
                .filter(opt => !selectedValues.includes(opt))
                .slice(0, 50);
        }
        const lowerSearch = searchText.toLowerCase();
        return options
            .filter(opt =>
                opt.toLowerCase().includes(lowerSearch) &&
                !selectedValues.includes(opt)
            )
            .slice(0, 50); // Limit to 50 suggestions
    }, [searchText, options, selectedValues]);

    const handleSelect = (option: string) => {
        if (allowMultiple && onAdd) {
            onAdd(option);
            setSearchText('');
            setShowSuggestions(false);
        } else {
            onSelect(option);
            setSearchText(option);
            setShowSuggestions(false);
            setIsFocused(false);
        }
    };

    const handleTextChange = (text: string) => {
        setSearchText(text);
        // For single select, update parent as user types
        if (!allowMultiple) {
            onSelect(text);
        }
    };

    const handleInputPress = () => {
        setIsFocused(true);
        // Initialize searchText with current value when opening
        if (!allowMultiple && value && !searchText) {
            setSearchText(value);
        } else if (!searchText) {
            setSearchText('');
        }
        // Always open modal when clicking input
        setShowSuggestions(true);
    };

    const handleCloseModal = () => {
        setShowSuggestions(false);
        setIsFocused(false);
        // If no selection was made and we have a value, keep the typed text or restore value
        if (!allowMultiple) {
            // If user typed something but didn't select, keep what they typed
            // Only restore if they closed without typing anything
            if (!searchText && value) {
                setSearchText(value);
            }
        }
    };

    return (
        <View style={styles.container}>
            {label && <Label>{label}</Label>}
            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.input,
                        multiline && styles.multilineInput,
                        isFocused && styles.inputFocused,
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#949494"
                    value={searchText}
                    onChangeText={handleTextChange}
                    onFocus={handleInputPress}
                    editable={true}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                />
                <TouchableOpacity
                    style={styles.searchIcon}
                    onPress={handleInputPress}
                >
                    <Ionicons name="chevron-down" size={20} color={theme.colors.textDisabled} />
                </TouchableOpacity>
            </View>
            {allowMultiple && selectedValues.length > 0 && (
                <View style={styles.selectedTags}>
                    {selectedValues.map((val, index) => (
                        <View key={index} style={styles.tag}>
                            <Text style={styles.tagText}>{val}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    onRemove?.(val);
                                }}
                            >
                                <Ionicons name="close-circle" size={16} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}

            {/* Modal for suggestions */}
            <Modal
                visible={showSuggestions}
                transparent={true}
                animationType="fade"
                onRequestClose={handleCloseModal}
            >
                <Pressable
                    style={styles.modalOverlay}
                    onPress={handleCloseModal}
                >
                    <Pressable
                        style={styles.modalContent}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Select medication</Text>
                            <TouchableOpacity onPress={handleCloseModal}>
                                <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.searchInputContainer}>
                            <Ionicons name="search" size={20} color={theme.colors.textDisabled} style={styles.searchIconModal} />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search medications..."
                                placeholderTextColor="#949494"
                                value={searchText}
                                onChangeText={handleTextChange}
                                autoFocus
                            />
                        </View>
                        <FlatList
                            data={filteredOptions}
                            keyExtractor={(item, index) => `${item}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.suggestionItem}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.suggestionText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            style={styles.suggestionsList}
                            keyboardShouldPersistTaps="handled"
                        />
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    inputContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingRight: 40,
        paddingVertical: 12,
        fontSize: FONT_SIZES.input,
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
    searchIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    selectedTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        gap: 8,
    },
    tag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.ocean,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 6,
    },
    tagText: {
        fontSize: FONT_SIZES.subtitle,
        color: theme.colors.white,
        fontFamily: theme.typography.fontFamily.prompt,
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
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    searchIconModal: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: FONT_SIZES.body,
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
    },
    suggestionsList: {
        maxHeight: 400,
    },
    suggestionItem: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    suggestionText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textPrimary,
    },
});

export default SearchableInput;
