import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Dropdown from '../../components/Dropdown';
import SearchableInput from '../../components/SearchableInput';
import SecondaryHeader from '../../components/SecondaryHeader';
import DiscardChangesModal from '../../components/modals/DiscardChangesModal';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import DatePickerModal from '../../components/modals/DatePickerModal';
import { useFormState } from '../../hooks/useFormState';
import { RootStackParamList } from '../../types/navigation';
import { Medication } from '../../types/health';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';
import { MEDICATIONS } from '../../constants/medications';

type AddMedicationScreenRouteProp = RouteProp<RootStackParamList, 'AddMedicationScreen'>;

const AddMedicationScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<AddMedicationScreenRouteProp>();
    const isEdit = route.params?.medication;

    const { formData, handleChange, hasChanges, setFormData } = useFormState({
        medicationName: '',
        startDate: '',
        type: '',
        status: '',
        frequency: '',
        notes: '',
    });

    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const medicationTypeOptions = [
        { label: 'Prescription', value: 'Prescription' },
        { label: 'Over-the-counter', value: 'Over-the-counter' },
        { label: 'Supplement', value: 'Supplement' },
        { label: 'Herbal', value: 'Herbal' },
    ];

    const medicationStatusOptions = [
        { label: 'Ongoing', value: 'Ongoing' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Paused', value: 'Paused' },
        { label: 'Discontinued', value: 'Discontinued' },
    ];

    useEffect(() => {
        if (isEdit) {
            setFormData({
                medicationName: isEdit.name || '',
                startDate: isEdit.startDate || '',
                type: isEdit.type || '',
                status: isEdit.status || '',
                frequency: isEdit.frequency || '',
                notes: isEdit.notes || '',
            });
        }
    }, [isEdit, setFormData]);

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
        handleChange('startDate', formatDate(date));
        setShowDatePicker(false);
    };

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

    const handleDelete = () => {
        // Handle delete logic
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title={isEdit ? 'Edit medication' : 'Add medication'}
                    onBack={handleBack}
                    icon={{
                        name: 'medical-outline',
                        size: 20,
                        color: '#333333',
                    }}
                />

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <SearchableInput
                            label="Medication Name"
                            value={formData.medicationName}
                            options={MEDICATIONS}
                            onSelect={(value) => handleChange('medicationName', value)}
                            placeholder="Type to search medications"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>When did you begin taking it?</Label>
                        <TouchableOpacity 
                            style={styles.dropdown}
                            onPress={() => setShowDatePicker(true)}
                        >
                            <Text style={[styles.dropdownText, !formData.startDate && styles.placeholder]}>
                                {formData.startDate || 'Select Date'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Type</Label>
                        <Dropdown
                            value={formData.type}
                            options={medicationTypeOptions}
                            onSelect={(value) => handleChange('type', value)}
                            placeholder="Select Type"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Status</Label>
                        <Dropdown
                            value={formData.status}
                            options={medicationStatusOptions}
                            onSelect={(value) => handleChange('status', value)}
                            placeholder="Select Status"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Frequency</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.frequency && styles.placeholder]}>
                                {formData.frequency || 'Select Frequency'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Notes"
                        value={formData.notes}
                        onChangeText={(text) => handleChange('notes', text)}
                        placeholder="You can write anything relevant to this medication here"
                        multiline
                        numberOfLines={4}
                    />
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                        style={styles.saveButton}
                    />

                    {isEdit && (
                        <Button
                            title="Delete this medication"
                            onPress={() => setShowDeleteModal(true)}
                            variant="outline"
                            style={styles.deleteButton}
                        />
                    )}
                </View>
            </ScrollView>

            {/* Discard Changes Modal */}
            <DiscardChangesModal
                visible={showDiscardModal}
                onDiscard={handleDiscard}
                onCancel={() => setShowDiscardModal(false)}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                visible={showDeleteModal}
                title="Delete medication?"
                message="You are about to delete the entire card for this medication. Are you sure?"
                itemName={isEdit?.name}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                confirmText="Yes, delete"
                cancelText="Cancel"
            />

            {/* Date Picker Modal */}
            <DatePickerModal
                visible={showDatePicker}
                initialDate={parseDate(formData.startDate)}
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
        gap: 16,
    },
    saveButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
    deleteButton: {
        backgroundColor: 'white',
        borderColor: theme.colors.asteriskPink,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddMedicationScreen;