import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { theme } from '../../theme/theme';
import Button from '../Button';

interface DiscardChangesModalProps {
    visible: boolean;
    onDiscard: () => void;
    onCancel: () => void;
    title?: string;
    message?: string;
}

const DiscardChangesModal: React.FC<DiscardChangesModalProps> = ({
    visible,
    onDiscard,
    onCancel,
    title = 'Discard Changes?',
    message = 'You have unsaved changes. Are you sure you want to discard them?',
}) => {
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
                    <Text style={styles.message}>{message}</Text>
                    
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Cancel"
                            onPress={onCancel}
                            variant="outline"
                            style={styles.button}
                        />
                        <Button
                            title="Discard"
                            onPress={onDiscard}
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

export default DiscardChangesModal;

