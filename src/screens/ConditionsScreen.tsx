import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';

interface Condition {
    id: string;
    name: string;
    dateDiagnosed: string;
    type: string;
    status: string;
    notes: string;
}

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
        navigation.navigate('AddConditionScreen' as never, { condition });
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

    const handleTabPress = (tab: string) => {
        console.log('Tab pressed:', tab);
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
                        <Text style={styles.headerTitle}>Conditions</Text>
                    </View>
                    <Text style={styles.asterisk}>*</Text>
                </View>

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

                    <TouchableOpacity style={styles.addButton} onPress={handleAddCondition}>
                        <Ionicons name="add" size={20} color="#E91E63" />
                        <Text style={styles.addButtonText}>Add new condition</Text>
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

            <BottomNavigation activeTab="settings" onTabPress={handleTabPress} />
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
        paddingHorizontal: 20,
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

export default ConditionsScreen;