import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import Input from '../../components/Input';
import Label from '../../components/Label';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';

const ProfileInformationScreen: React.FC = () => {
    const navigation = useNavigation();
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
                <SecondaryHeader
                    title="Profile Information"
                    onBack={() => navigation.goBack()}
                    titleColor={theme.colors.textSecondary}
                />

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <Input
                        label="Nickname"
                        placeholder="nickname"
                        value={formData.nickname}
                        onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                        required
                    />

                    <Input
                        label="Age Range"
                        placeholder="20-25"
                        value={formData.ageRange}
                        onChangeText={(text) => setFormData({ ...formData, ageRange: text })}
                        required
                    />

                    <View style={styles.inputGroup}>
                        <Label required>Ethnicity</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.ethnicity && styles.placeholder]}>
                                {formData.ethnicity || 'Select your ethnicity'}
                            </Text>
                            <Ionicons name="chevron-down" size={12} color="#232323" />
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Location"
                        placeholder="Europe"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        required
                    />

                    <View style={styles.inputGroup}>
                        <Label>Pregnant (optional)</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{formData.pregnancy}</Text>
                            <Ionicons name="chevron-down" size={12} color="#232323" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Are you a caretaker (optional)</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.caretaker && styles.placeholder]}>
                                {formData.caretaker || 'Choose an option'}
                            </Text>
                            <Ionicons name="chevron-down" size={12} color="#232323" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <Button
                    title="Save"
                    onPress={handleSave}
                    variant="primary"
                />
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
    formContainer: {
        ...commonStyles.formContainer,
        marginTop: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    dropdownText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
        flex: 1,
    },
    placeholder: {
        color: theme.colors.textPlaceholder,
    },

});

export default ProfileInformationScreen;