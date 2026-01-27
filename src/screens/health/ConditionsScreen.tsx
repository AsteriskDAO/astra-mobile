import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import HealthItemCard from '../../components/HealthItemCard';
import DeleteConfirmationModal from '../../components/modals/DeleteConfirmationModal';
import { Condition } from '../../types/health';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type ConditionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConditionsScreen'>;

const ConditionsScreen: React.FC = () => {
    const navigation = useNavigation<ConditionsScreenNavigationProp>();
    const [conditions, setConditions] = useState<Condition[]>([
        {
            id: '1',
            name: 'PCOS',
            dateDiagnosed: '1/04/2023',
            type: 'Clinically diagnosed',
            status: 'Past',
            notes: 'Lorem ipsum',
        },
        {
            id: '2',
            name: 'Endometriosis',
            dateDiagnosed: 'n/a',
            type: 'Suspected',
            status: 'Ongoing',
            notes: 'Awaiting laparoscopy results',
        },
    ]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);

    const handleAddCondition = () => {
        navigation.navigate('AddConditionScreen', {});
    };

    const handleEditCondition = (condition: Condition) => {
        navigation.navigate('AddConditionScreen', { condition });
    };

    const handleDeleteCondition = (condition: Condition) => {
        setSelectedCondition(condition);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (selectedCondition) {
            setConditions(conditions.filter(c => c.id !== selectedCondition.id));
            setShowDeleteModal(false);
            setSelectedCondition(null);
        }
    };

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title="Conditions"
                    onBack={() => navigation.goBack()}
                    icon={{
                        name: 'medical-outline',
                        size: 20,
                        color: theme.colors.textPrimary,
                    }}
                />

                {/* Conditions List */}
                <View style={styles.conditionsContainer}>
                    {conditions.map((condition) => (
                        <HealthItemCard
                            key={condition.id}
                            title={condition.name}
                            details={[
                                { label: 'Date diagnosed:', value: condition.dateDiagnosed },
                                { label: 'Type:', value: condition.type },
                                { label: 'Status:', value: condition.status },
                                { label: 'Notes:', value: condition.notes },
                            ]}
                            onEdit={() => handleEditCondition(condition)}
                        />
                    ))}

                    <Button
                        variant="outline"
                        title="Add new condition"
                        icon={{
                            name: 'add',
                            size: 20,
                            color: theme.colors.asteriskPink,
                        }}
                        onPress={handleAddCondition}
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
                title="Delete condition?"
                message="You are about to delete the entire card for this condition. Are you sure?"
                itemName={selectedCondition?.name}
                onConfirm={confirmDelete}
                onCancel={() => {
                    setShowDeleteModal(false);
                    setSelectedCondition(null);
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
    conditionsContainer: {
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

export default ConditionsScreen;