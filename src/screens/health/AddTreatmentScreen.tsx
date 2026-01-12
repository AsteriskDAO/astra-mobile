import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Label from '../../components/Label';
import SecondaryHeader from '../../components/SecondaryHeader';
import DiscardChangesModal from '../../components/modals/DiscardChangesModal';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { useFormState } from '../../hooks/useFormState';
import { RootStackParamList } from '../../types/navigation';
import { Treatment } from '../../types/health';
import { theme } from '../../theme/theme';

type AddTreatmentScreenRouteProp = RouteProp<RootStackParamList, 'AddTreatmentScreen'>;

const AddTreatmentScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<AddTreatmentScreenRouteProp>();
    const isEdit = route.params?.treatment;
    
    const { formData, handleChange, hasChanges, setFormData } = useFormState({
        treatmentName: '',
        startDate: '',
        type: '',
        status: '',
        frequency: '',
        notes: '',
    });
    
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        if (isEdit) {
            setFormData({
                treatmentName: isEdit.name || '',
                startDate: isEdit.startDate || '',
                type: isEdit.type || '',
                status: isEdit.status || '',
                frequency: isEdit.frequency || '',
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

    const handleDelete = () => {
        // Handle delete logic
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title={isEdit ? 'Edit treatment' : 'Add treatment'}
                    onBack={handleBack}
                    icon={{
                        name: 'refresh-outline',
                        size: 20,
                        color: '#333333',
                    }}
                />

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <Input
                        label="Treatment Name"
                        value={formData.treatmentName}
                        onChangeText={(text) => handleChange('treatmentName', text)}
                        placeholder="Enter treatment name"
                    />

                    <View style={styles.inputGroup}>
                        <Label>When did you begin this treatment?</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.startDate && styles.placeholder]}>
                                {formData.startDate || 'Select Date'}
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
                        placeholder="You can write anything relevant to this treatment here"
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
                            title="Delete this treatment"
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
                title="Delete treatment?"
                message="You are about to delete the entire card for this treatment. Are you sure?"
                itemName={isEdit?.name}
                onConfirm={handleDelete}
                onCancel={() => setShowDeleteModal(false)}
                confirmText="Yes, delete"
                cancelText="Cancel"
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
        fontSize: 16,
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

export default AddTreatmentScreen;

