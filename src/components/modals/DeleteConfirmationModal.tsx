import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { theme } from '../../theme/theme';
import Button from '../Button';

interface DeleteConfirmationModalProps {
    visible: boolean;
    title?: string;
    message?: string;
    itemName?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    visible,
    title = 'Delete Item',
    message,
    itemName,
    onConfirm,
    onCancel,
    confirmText = 'Delete',
    cancelText = 'Cancel',
}) => {
    const displayMessage = message || (itemName ? `Are you sure you want to delete "${itemName}"?` : 'Are you sure you want to delete this item?');

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <Pressable
                style={styles.overlay}
                onPress={onCancel}
            >
                <Pressable
                    style={styles.modalContent}
                    onPress={(e) => e.stopPropagation()}
                >
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{displayMessage}</Text>
                    
                    <View style={styles.buttonContainer}>
                        <Button
                            title={cancelText}
                            onPress={onCancel}
                            variant="outline"
                            style={styles.button}
                        />
                        <Button
                            title={confirmText}
                            onPress={onConfirm}
                            style={styles.button}
                        />
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: theme.colors.white,
        borderRadius: 12,
        padding: 24,
        width: '85%',
        maxWidth: 400,
    },
    title: {
        ...theme.typography.presets.h2,
        fontSize: 20,
        fontWeight: '600',
        color: theme.colors.textPrimary,
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        ...theme.typography.presets.body,
        color: theme.colors.textSecondary,
        marginBottom: 24,
        textAlign: 'center',
        lineHeight: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
    },
});

export default DeleteConfirmationModal;

