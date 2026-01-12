import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { Treatment } from '../../types/health';
import { theme } from '../../theme/theme';

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
        navigation.navigate('AddTreatmentScreen', {});
    };

    const handleEditTreatment = (treatment: Treatment) => {
        navigation.navigate('AddTreatmentScreen', { treatment });
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
                <SecondaryHeader
                    title="Treatments"
                    onBack={() => navigation.goBack()}
                    icon={{
                        name: 'refresh-outline',
                        size: 20,
                        color: '#333333',
                    }}
                />

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

                    <Button
                        variant="outline"
                        title="Add new treatment"
                        icon={{
                            name: 'add',
                            size: 20,
                            color: theme.colors.asteriskPink,
                        }}
                        onPress={handleAddTreatment}
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
                title="Delete treatment?"
                message="You are about to delete the entire card for this treatment. Are you sure?"
                itemName={selectedTreatment?.name}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setSelectedTreatment(null);
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

export default TreatmentsScreen;