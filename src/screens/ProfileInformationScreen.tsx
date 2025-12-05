import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import { theme } from '../theme/theme';
import { commonStyles } from '../styles/common';

const ProfileInformationScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nickname: 'nickname',
        ageRange: '20-25',
        ethnicity: '',
        location: 'Europe',
        pregnancy: 'No',
        caretaker: '',
    });

    const handleSave = () => {
        // Handle save logic
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                        size={17}
                        style={StyleSheet.flatten([styles.backButton, { top: insets.top }])}
                    />
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Profile Information</Text>
                        <Logo size={13} tintColor="#FF01B4" style={styles.asteriskLogo} />
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.labelRequired}>
                            Nickname<Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'nickname' && styles.inputFocused
                            ]}
                            value={formData.nickname}
                            onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                            placeholder="nickname"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput('nickname')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.labelRequired}>
                            Age Range<Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'ageRange' && styles.inputFocused
                            ]}
                            value={formData.ageRange}
                            onChangeText={(text) => setFormData({ ...formData, ageRange: text })}
                            placeholder="20-25"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput('ageRange')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.labelRequired}>
                            Ethnicity<Text style={styles.required}>*</Text>
                        </Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.ethnicity && styles.placeholder]}>
                                {formData.ethnicity || 'Select your ethnicity'}
                            </Text>
                            <Ionicons name="chevron-down" size={12} color="#232323" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.labelRequired}>
                            Location<Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'location' && styles.inputFocused
                            ]}
                            value={formData.location}
                            onChangeText={(text) => setFormData({ ...formData, location: text })}
                            placeholder="Europe"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput('location')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pregnant (optional)</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{formData.pregnancy}</Text>
                            <Ionicons name="chevron-down" size={12} color="#232323" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Are you a caretaker (optional)</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.caretaker && styles.placeholder]}>
                                {formData.caretaker || 'Choose an option'}
                            </Text>
                            <Ionicons name="chevron-down" size={12} color="#232323" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                        variant="primary"
                        style={styles.saveButton}
                        textStyle={styles.saveButtonText}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: theme.spacing.base,
        position: 'relative',
        width: '100%',
    },
    backButton: {
        position: 'absolute',
        left: 0,
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    headerTitle: {
        ...theme.typography.presets.h3,
        color: theme.colors.textSecondary,
        textAlign: 'center',
    },
    asteriskLogo: {
        marginLeft: 2,
    },
    formContainer: {
        ...commonStyles.formContainer,
        marginTop: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        ...theme.typography.presets.label,
        color: theme.colors.textPlaceholder,
        marginBottom: 0,
    },
    labelRequired: {
        ...theme.typography.presets.label,
        color: theme.colors.ocean,
        marginBottom: 0,
    },
    labelFocused: {
        ...commonStyles.labelFocused,
    },
    required: {
        color: theme.colors.asteriskPink,
    },
    input: {
        ...commonStyles.inputBase,
        backgroundColor: theme.colors.white,
        marginTop: 0,
        borderWidth: theme.spacing.borderWidth.thin,
        borderColor: 'transparent',
    },
    inputFocused: {
        ...commonStyles.inputFocused,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: theme.spacing.inputHeight,
        backgroundColor: theme.colors.white,
        borderRadius: theme.spacing.radius.base,
        paddingHorizontal: theme.spacing.inputPaddingHorizontal,
        paddingVertical: theme.spacing.inputPaddingVertical,
        borderWidth: theme.spacing.borderWidth.thin,
        borderColor: 'transparent',
    },
    dropdownText: {
        ...theme.typography.presets.body,
        color: theme.colors.textSecondary,
        flex: 1,
    },
    placeholder: {
        color: theme.colors.textPlaceholder,
    },
    buttonContainer: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.formMarginBottom,
        width: theme.spacing.buttonWidth,
        alignSelf: 'center',
    },
    saveButton: {
        ...commonStyles.buttonBase,
        ...commonStyles.buttonPrimary,
    },
    saveButtonText: {
        ...commonStyles.buttonTextPrimary,
    },
});

export default ProfileInformationScreen;