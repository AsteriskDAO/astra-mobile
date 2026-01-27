import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import HealthItemCard from '../../components/HealthItemCard';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { Treatment } from '../../types/health';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';

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
                        <HealthItemCard
                            key={treatment.id}
                            title={treatment.name}
                            details={[
                                { label: 'Start Date:', value: treatment.startDate },
                                { label: 'Type:', value: treatment.type },
                                { label: 'Status:', value: treatment.status },
                                { label: 'Frequency:', value: treatment.frequency },
                                { label: 'Notes:', value: treatment.notes },
                            ]}
                            onEdit={() => handleEditTreatment(treatment)}
                        />
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