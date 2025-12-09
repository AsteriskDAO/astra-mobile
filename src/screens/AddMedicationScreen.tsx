import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';
import SecondaryHeader from '../components/SecondaryHeader';
import { RootStackParamList } from '../types/navigation';
import { Medication } from '../types/health';
import { theme } from '../theme/theme';

type AddMedicationScreenRouteProp = RouteProp<RootStackParamList, 'AddMedicationScreen'>;

const AddMedicationScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<AddMedicationScreenRouteProp>();
    const [formData, setFormData] = useState({
        medicationName: '',
        startDate: '',
        type: '',
        status: '',
        frequency: '',
        notes: '',
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const isEdit = route.params?.medication;

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
    }, [isEdit]);

    const handleInputChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
        setHasChanges(true);
    };

    const handleBack = () => {
        if (hasChanges) {
            setShowDeleteModal(true);
        } else {
            navigation.goBack();
        }
    };

    const handleDiscard = () => {
        setShowDeleteModal(false);
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
                    <Input
                        label="Medication Name"
                        value={formData.medicationName}
                        onChangeText={(text) => handleInputChange('medicationName', text)}
                        placeholder="Enter medication name"
                    />

                    <View style={styles.inputGroup}>
                        <Label>When did you begin taking it?</Label>
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
                        onChangeText={(text) => handleInputChange('notes', text)}
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
                            onPress={handleDelete}
                            variant="outline"
                            style={styles.deleteButton}
                        />
                    )}
                </View>
            </ScrollView>

            {/* Delete Confirmation Modal */}
            <Modal
                visible={showDeleteModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Delete medication?</Text>
                        <Text style={styles.modalMessage}>
                            You are about to delete the entire card for this medication. Are you sure?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Button
                                title="Yes, delete"
                                onPress={handleDelete}
                                style={styles.deleteConfirmButton}
                            />
                            <Button
                                title="Cancel"
                                onPress={() => setShowDeleteModal(false)}
                                variant="outline"
                                style={styles.cancelButton}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 14,
        color: '#666666',
        lineHeight: 20,
        marginBottom: 24,
        textAlign: 'center',
    },
    modalButtons: {
        gap: 12,
    },
    deleteConfirmButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
    cancelButton: {
        backgroundColor: 'white',
        borderColor: theme.colors.asteriskPink,
        borderWidth: 1,
    },
});

export default AddMedicationScreen;