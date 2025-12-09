import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import { Condition } from '../../types/health';
import { theme } from '../../theme/theme';

const ConditionsScreen: React.FC = () => {
    const navigation = useNavigation();
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
        navigation.navigate('AddConditionScreen' as never);
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
                        color: '#333333',
                    }}
                />

                {/* Conditions List */}
                <View style={styles.conditionsContainer}>
                    {conditions.map((condition) => (
                        <View key={condition.id} style={styles.conditionCard}>
                            <View style={styles.conditionHeader}>
                                <Text style={styles.conditionName}>{condition.name}</Text>
                                <TouchableOpacity
                                    style={styles.editButton}
                                    onPress={() => handleEditCondition(condition)}
                                >
                                    <Ionicons name="pencil" size={16} color="white" />
                                    <Text style={styles.editButtonText}>edit</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.conditionDetails}>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Date diagnosed:</Text>
                                    <Text style={styles.detailValue}>{condition.dateDiagnosed}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Type:</Text>
                                    <Text style={styles.detailValue}>{condition.type}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Status:</Text>
                                    <Text style={styles.detailValue}>{condition.status}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Notes:</Text>
                                    <Text style={styles.detailValue}>{condition.notes}</Text>
                                </View>
                            </View>
                        </View>
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
            <Modal
                visible={showDeleteModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDeleteModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Delete condition?</Text>
                        <Text style={styles.modalMessage}>
                            You are about to delete the entire card for this condition. Are you sure?
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
    conditionsContainer: {
        marginTop: 20,
    },
    conditionCard: {
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
    conditionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    conditionName: {
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
    conditionDetails: {
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

export default ConditionsScreen;