import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

interface Medication {
    id: string;
    name: string;
    startDate: string;
    type: string;
    status: string;
    dosage: string;
    frequency: string;
    notes: string;
}

const MedicationsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [medications, setMedications] = useState<Medication[]>([
        {
            id: '1',
            name: 'Sertraline (Zoloft)',
            startDate: '1/04/2023',
            type: 'Prescription',
            status: 'Ongoing',
            dosage: '50mg',
            frequency: 'Once per day',
            notes: '-',
        },
    ]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);

    const handleAddMedication = () => {
        navigation.navigate('AddMedicationScreen' as never);
    };

    const handleEditMedication = (medication: Medication) => {
        navigation.navigate('AddMedicationScreen' as never, { medication });
    };

    const handleDeleteMedication = (medication: Medication) => {
        setSelectedMedication(medication);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedMedication) {
            setMedications(medications.filter(m => m.id !== selectedMedication.id));
            setShowDeleteModal(false);
            setSelectedMedication(null);
        }
    };

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="chevron-back" size={24} color="#2196F3" />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Ionicons name="medical-outline" size={20} color="#333333" />
                        <Text style={styles.headerTitle}>Medications</Text>
                    </View>
                    <Text style={styles.asterisk}>*</Text>
                </View>

                {/* Medications List */}
                <View style={styles.medicationsContainer}>
                    {medications.map((medication) => (
                        <View key={medication.id} style={styles.medicationCard}>
                            <View style={styles.medicationHeader}>
                                <Text style={styles.medicationName}>{medication.name}</Text>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEditMedication(medication)}
                                >
                                    <Ionicons name="pencil" size={16} color="white" />
                                    <Text style={styles.editButtonText}>edit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.medicationDetails}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Start Date:</Text>
                                    <Text style={styles.detailValue}>{medication.startDate}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Type:</Text>
                                    <Text style={styles.detailValue}>{medication.type}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Status:</Text>
                                    <Text style={styles.detailValue}>{medication.status}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Dosage:</Text>
                                    <Text style={styles.detailValue}>{medication.dosage}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Frequency:</Text>
                                    <Text style={styles.detailValue}>{medication.frequency}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Notes:</Text>
                                    <Text style={styles.detailValue}>{medication.notes}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.addButton} onPress={handleAddMedication}>
                        <Ionicons name="add" size={20} color="#E91E63" />
                        <Text style={styles.addButtonText}>Add another medication</Text>
                    </TouchableOpacity>
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
                                onPress={confirmDelete}
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingTop: 60,
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginLeft: 8,
    },
    asterisk: {
        fontSize: 18,
        color: '#E91E63',
    },
    medicationsContainer: {
        marginTop: 20,
    },
    medicationCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    medicationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    medicationName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E91E63',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    medicationDetails: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailLabel: {
        fontSize: 14,
        color: '#666666',
    },
    detailValue: {
        fontSize: 14,
        color: '#333333',
        fontWeight: '500',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E91E63',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#E91E63',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    buttonContainer: {
        marginBottom: 40,
    },
    saveButton: {
        backgroundColor: '#E91E63',
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
        backgroundColor: '#E91E63',
    },
    cancelButton: {
        backgroundColor: 'white',
        borderColor: '#E91E63',
        borderWidth: 1,
    },
});

export default MedicationsScreen;