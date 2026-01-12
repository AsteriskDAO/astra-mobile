import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { Medication } from '../../types/health';
import { theme } from '../../theme/theme';

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
        navigation.navigate('AddMedicationScreen', { medication });
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
                <SecondaryHeader
                    title="Medications"
                    onBack={() => navigation.goBack()}
                    icon={{
                        name: 'medical-outline',
                        size: 20,
                        color: '#333333',
                    }}
                />

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

                    <Button
                        variant="outline"
                        title="Add another medication"
                        icon={{
                            name: 'add',
                            size: 20,
                            color: theme.colors.asteriskPink,
                        }}
                        onPress={handleAddMedication}
                        style={styles.addButton}
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

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                visible={showDeleteModal}
                title="Delete medication?"
                message="You are about to delete the entire card for this medication. Are you sure?"
                itemName={selectedMedication?.name}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setSelectedMedication(null);
                }}
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
        backgroundColor: theme.colors.asteriskPink,
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
        marginBottom: 20,
        borderColor: theme.colors.asteriskPink,
    },
    buttonContainer: {
        marginBottom: 40,
    },
    saveButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
});

export default MedicationsScreen;