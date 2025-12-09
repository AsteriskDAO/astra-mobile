import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Label from '../components/Label';
import SecondaryHeader from '../components/SecondaryHeader';
import { RootStackParamList } from '../types/navigation';
import { Condition } from '../types/health';
import { theme } from '../theme/theme';

type AddConditionScreenRouteProp = RouteProp<RootStackParamList, 'AddConditionScreen'>;

const AddConditionScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute<AddConditionScreenRouteProp>();
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

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title={isEdit ? 'Edit condition' : 'Add new condition'}
                    onBack={handleBack}
                    icon={{
                        name: 'medical-outline',
                        size: 20,
                        color: '#999999',
                    }}
                />

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <Input
                        label="Condition Name"
                        value={formData.conditionName}
                        onChangeText={(text) => handleInputChange('conditionName', text)}
                        placeholder="Start typing"
                    />

                    <View style={styles.inputGroup}>
                        <Label>Date Diagnosed</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.dateDiagnosed && styles.placeholder]}>
                                {formData.dateDiagnosed || 'Select Date'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Type</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.type && styles.placeholder]}>
                                {formData.type || 'Select Type'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Status</Label>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.status && styles.placeholder]}>
                                {formData.status || 'Select Status'}
                            </Text>
                            <Ionicons name="chevron-down" size={20} color="#999999" />
                        </TouchableOpacity>
                    </View>

                    <Input
                        label="Notes"
                        value={formData.notes}
                        onChangeText={(text) => handleInputChange('notes', text)}
                        placeholder="You can write anything relevant to your condition here"
                        multiline
                        numberOfLines={4}
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
    formContainer: {
        marginTop: 20,
    },
    inputGroup: {
        marginBottom: 20,
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
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    placeholder: {
        color: '#999999',
    },
    buttonContainer: {
        marginTop: 20,
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
    discardButton: {
        backgroundColor: theme.colors.asteriskPink,
    },
    cancelButton: {
        backgroundColor: 'white',
        borderColor: theme.colors.asteriskPink,
        borderWidth: 1,
    },
});

export default AddConditionScreen;