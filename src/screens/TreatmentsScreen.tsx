import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';

interface Treatment {
    id: string;
    name: string;
    startDate: string;
    type: string;
    status: string;
    frequency: string;
    notes: string;
}

const TreatmentsScreen: React.FC = () => {
    const navigation = useNavigation();
    const [treatments, setTreatments] = useState<Treatment[]>([
        {
            id: '1',
            name: 'Cognitive Behavioural Therapy (CBT)',
            startDate: '1/04/2023',
            type: 'Clinical',
            status: 'Ongoing',
            frequency: 'Once per day',
            notes: '-',
        },
    ]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);

    const handleAddTreatment = () => {
        navigation.navigate('AddTreatmentScreen' as never);
    };

    const handleEditTreatment = (treatment: Treatment) => {
        navigation.navigate('AddTreatmentScreen' as never, { treatment });
    };

    const handleDeleteTreatment = (treatment: Treatment) => {
        setSelectedTreatment(treatment);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedTreatment) {
            setTreatments(treatments.filter(t => t.id !== selectedTreatment.id));
            setShowDeleteModal(false);
            setSelectedTreatment(null);
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
                        <Ionicons name="refresh-outline" size={20} color="#333333" />
                        <Text style={styles.headerTitle}>Treatments</Text>
                    </View>
                    <Text style={styles.asterisk}>*</Text>
                </View>

                {/* Treatments List */}
                <View style={styles.treatmentsContainer}>
                    {treatments.map((treatment) => (
                        <View key={treatment.id} style={styles.treatmentCard}>
                            <View style={styles.treatmentHeader}>
                                <Text style={styles.treatmentName}>{treatment.name}</Text>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEditTreatment(treatment)}
                                >
                                    <Ionicons name="pencil" size={16} color="white" />
                                    <Text style={styles.editButtonText}>edit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.treatmentDetails}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Start Date:</Text>
                                    <Text style={styles.detailValue}>{treatment.startDate}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Type:</Text>
                                    <Text style={styles.detailValue}>{treatment.type}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Status:</Text>
                                    <Text style={styles.detailValue}>{treatment.status}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Frequency:</Text>
                                    <Text style={styles.detailValue}>{treatment.frequency}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Notes:</Text>
                                    <Text style={styles.detailValue}>{treatment.notes}</Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    <TouchableOpacity style={styles.addButton} onPress={handleAddTreatment}>
                        <Ionicons name="add" size={20} color="#E91E63" />
                        <Text style={styles.addButtonText}>Add new treatment</Text>
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
                        <Text style={styles.modalTitle}>Delete treatment?</Text>
                        <Text style={styles.modalMessage}>
                            You are about to delete the entire card for this treatment. Are you sure?
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
    treatmentsContainer: {
        marginTop: 20,
    },
    treatmentCard: {
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
    treatmentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    treatmentName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        flex: 1,
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
    treatmentDetails: {
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

export default TreatmentsScreen;