import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import HealthItemCard from '../../components/HealthItemCard';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { Medication } from '../../types/health';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type MedicationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MedicationsScreen'>;

const MedicationsScreen: React.FC = () => {
    const navigation = useNavigation<MedicationsScreenNavigationProp>();
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
        navigation.navigate('AddMedicationScreen', {});
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
                        color: theme.colors.textPrimary,
                    }}
                />

                {/* Medications List */}
                <View style={styles.medicationsContainer}>
                    {medications.map((medication) => (
                        <HealthItemCard
                            key={medication.id}
                            title={medication.name}
                            details={[
                                { label: 'Start Date:', value: medication.startDate },
                                { label: 'Type:', value: medication.type },
                                { label: 'Status:', value: medication.status },
                                { label: 'Dosage:', value: medication.dosage },
                                { label: 'Frequency:', value: medication.frequency },
                                { label: 'Notes:', value: medication.notes },
                            ]}
                            onEdit={() => handleEditMedication(medication)}
                        />
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
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    medicationsContainer: {
        marginTop: 20,
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