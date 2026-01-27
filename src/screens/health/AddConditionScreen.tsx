import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import SearchableInput from '../../components/SearchableInput';
import SecondaryHeader from '../../components/SecondaryHeader';
import DiscardChangesModal from '../../components/modals/DiscardChangesModal';
import DatePickerModal from '../../components/modals/DatePickerModal';
import { useFormState } from '../../hooks/useFormState';
import { RootStackParamList } from '../../types/navigation';
import { Condition } from '../../types/health';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';
import { HEALTH_CONDITIONS } from '../../constants/healthConditions';

type AddConditionScreenRouteProp = RouteProp<RootStackParamList, 'AddConditionScreen'>;

const AddConditionScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<AddConditionScreenRouteProp>();
    const isEdit = route.params?.condition;

    const { formData, handleChange, hasChanges, setFormData } = useFormState({
        conditionName: '',
        dateDiagnosed: '',
        type: '',
        status: '',
        notes: '',
    });

    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setFormData({
                conditionName: isEdit.name || '',
                dateDiagnosed: isEdit.dateDiagnosed || '',
                type: isEdit.type || '',
                status: isEdit.status || '',
                notes: isEdit.notes || '',
            });
        }
    }, [isEdit, setFormData]);

    const handleBack = () => {
        if (hasChanges) {
            setShowDiscardModal(true);
        } else {
            navigation.goBack();
        }
    };

    const handleDiscard = () => {
        setShowDiscardModal(false);
        navigation.goBack();
    };

    const handleSave = () => {
        // Handle save logic
        navigation.goBack();
    };

    const formatDate = (date: Date): string => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    };

    const parseDate = (dateString: string): Date | undefined => {
        if (!dateString) return undefined;
        const parts = dateString.split('/');
        if (parts.length === 3) {
            const month = parseInt(parts[0]) - 1;
            const day = parseInt(parts[1]);
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
        }
        return undefined;
    };

    const handleDateSelect = (date: Date) => {
        handleChange('dateDiagnosed', formatDate(date));
        setShowDatePicker(false);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title={isEdit ? 'Edit condition' : 'Add new condition'}
                    onBack={handleBack}
                    icon={{
                        name: 'medical-outline',
                        size: 20,
                        color: '#999999',
                    }}
                />

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <SearchableInput
                            label="Condition Name"
                            value={formData.conditionName}
                            options={HEALTH_CONDITIONS}
                            onSelect={(value) => handleChange('conditionName', value)}
                            placeholder="Type to search conditions"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Date Diagnosed</Label>
                        <TouchableOpacity 
                            style={styles.dropdown}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={[styles.dropdownText, !formData.dateDiagnosed && styles.placeholder]}>
                                {formData.dateDiagnosed || 'Select Date'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Type</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.type && styles.placeholder]}>
                                {formData.type || 'Select Type'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Status</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.status && styles.placeholder]}>
                                {formData.status || 'Select Status'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Notes"
                        value={formData.notes}
                        onChangeText={(text) => handleChange('notes', text)}
                        placeholder="You can write anything relevant to your condition here"
                        multiline
                        numberOfLines={4}
                    />
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                        style={styles.saveButton}
                    />
                </View>
            </ScrollView>

            {/* Discard Changes Modal */}
            <DiscardChangesModal
                visible={showDiscardModal}
                onDiscard={handleDiscard}
                onCancel={() => setShowDiscardModal(false)}
            />

            {/* Date Picker Modal */}
            <DatePickerModal
                visible={showDatePicker}
                initialDate={parseDate(formData.dateDiagnosed)}
                onSave={handleDateSelect}
                onCancel={() => setShowDatePicker(false)}
                title="Select date"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    formContainer: {
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
    },
    dropdownText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    placeholder: {
        color: '#999999',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
    },
    saveButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
});

export default AddConditionScreen;