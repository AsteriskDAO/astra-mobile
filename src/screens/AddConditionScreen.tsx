import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';

const AddConditionScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        conditionName: '',
        dateDiagnosed: '',
        type: '',
        status: '',
        notes: '',
    });
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const isEdit = route.params?.condition;

    useEffect(() => {
        if (isEdit) {
            setFormData({
                conditionName: isEdit.name || '',
                dateDiagnosed: isEdit.dateDiagnosed || '',
                type: isEdit.type || '',
                status: isEdit.status || '',
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
            setShowDiscardModal(true);
        } else {
            navigation.goBack();
        }
    };

    const handleDiscard = () => {
        setShowDiscardModal(false);
        navigation.goBack();
    };

    const handleSave = () => {
        // Handle save logic
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
                    <TouchableOpacity onPress={handleBack}>
                        <Ionicons name="chevron-back" size={24} color="#999999" />
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Ionicons name="medical-outline" size={20} color="#999999" />
                        <Text style={styles.headerTitle}>
                            {isEdit ? 'Edit condition' : 'Add new condition'}
                        </Text>
                    </View>
                    <Text style={styles.asterisk}>*</Text>
                </View>

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={[
                            styles.label,
                            focusedInput === 'conditionName' && styles.labelFocused
                        ]}>
                            Condition Name
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'conditionName' && styles.inputFocused
                            ]}
                            value={formData.conditionName}
                            onChangeText={(text) => handleInputChange('conditionName', text)}
                            placeholder="Start typing"
                            onFocus={() => setFocusedInput('conditionName')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Date Diagnosed</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.dateDiagnosed && styles.placeholder]}>
                                {formData.dateDiagnosed || 'Select Date'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Type</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.type && styles.placeholder]}>
                                {formData.type || 'Select Type'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Status</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.status && styles.placeholder]}>
                                {formData.status || 'Select Status'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[
                            styles.label,
                            focusedInput === 'notes' && styles.labelFocused
                        ]}>
                            Notes
                        </Text>
                        <TextInput
                            style={[
                                styles.textArea,
                                focusedInput === 'notes' && styles.inputFocused
                            ]}
                            value={formData.notes}
                            onChangeText={(text) => handleInputChange('notes', text)}
                            placeholder="You can write anything relevant to your condition here"
                            multiline
                            numberOfLines={4}
                            onFocus={() => setFocusedInput('notes')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>
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

            {/* Discard Changes Modal */}
            <Modal
                visible={showDiscardModal}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDiscardModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Discard changes?</Text>
                        <Text style={styles.modalMessage}>
                            You have unsaved changes to your profile. Are you sure you want to go back?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Button
                                title="Discard"
                                onPress={handleDiscard}
                                style={styles.discardButton}
                            />
                            <Button
                                title="Cancel"
                                onPress={() => setShowDiscardModal(false)}
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
        color: '#999999',
        marginLeft: 8,
    },
    asterisk: {
        fontSize: 18,
        color: '#E91E63',
    },
    formContainer: {
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#9C9C9C',
        marginBottom: 8,
    },
    labelFocused: {
        color: '#61ABC5',
    },
    input: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: 'white',
        color: '#333333',
    },
    inputFocused: {
        borderColor: '#61ABC5',
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
        color: '#333333',
    },
    placeholder: {
        color: '#999999',
    },
    textArea: {
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: 'white',
        color: '#333333',
        height: 100,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 20,
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
    discardButton: {
        backgroundColor: '#E91E63',
    },
    cancelButton: {
        backgroundColor: 'white',
        borderColor: '#E91E63',
        borderWidth: 1,
    },
});

export default AddConditionScreen;