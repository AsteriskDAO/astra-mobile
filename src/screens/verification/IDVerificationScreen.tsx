import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '../../components/Header';
import Button from '../../components/Button';
import BackgroundPattern from '../../components/BackgroundPattern';
import BackButton from '../../components/BackButton';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';

const IDVerificationScreen: React.FC = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
                <BackButton
                    onPress={() => navigation.goBack()}
                    size={17}
                    style={styles.backButton}
                />
                <Header
                    currentStep={2}
                    totalSteps={3}
                />
            </View>

            <View style={styles.content}>
                {/* First view - empty spacer */}
                <View style={styles.spacer} />

                {/* Second view - content (title, instruction, privacy text) */}
                <View style={styles.contentSection}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>A quick check!</Text>
                        <View style={styles.instructionContainer}>
                            <Text style={styles.instruction}>
                                To continue, please confirm your gender with Self.
                            </Text>
                            <TouchableOpacity
                                style={styles.infoButton}
                                onPress={() => setShowTooltip(!showTooltip)}
                            >
                                <Ionicons name="information-circle-outline" size={theme.spacing.iconSizeXl} color={theme.colors.ocean} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Modal
                        visible={showTooltip}
                        transparent={true}
                        animationType="fade"
                        onRequestClose={() => setShowTooltip(false)}
                    >
                        <Pressable
                            style={styles.modalOverlay}
                            onPress={() => setShowTooltip(false)}
                        >
                            <Pressable
                                style={styles.tooltip}
                                onPress={(e) => e.stopPropagation()}
                            >
                                <View style={styles.tooltipContent}>
                                    <Text style={styles.tooltipTitle}>Why we ask this?</Text>
                                    <Text style={styles.tooltipText}>
                                        We are the first female-only health tracker in the world. To get started, we need to verify your gender.
                                    </Text>
                                </View>
                            </Pressable>
                        </Pressable>
                    </Modal>

                    <Text style={styles.privacyText}>
                        Your privacy is protected: Astra never sees your documents, and Self does not store them.
                        Verification happens instantly and only once.
                    </Text>
                </View>

                {/* Third view - button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Verify my ID"
                        onPress={() => {
                            // Simulate verification process - wait 1 second
                            // TODO: Add Self integration here
                            setTimeout(() => {
                                navigation.navigate('FinalVerificationSuccess' as never);
                            }, 1000);
                        }}
                        variant="outline"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    headerContainer: {
        paddingHorizontal: 35,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    content: {
        flex: 1,
        paddingHorizontal: 35,
        paddingTop: theme.spacing.titleMarginTop,
        paddingBottom: theme.spacing.formMarginBottom,
    },
    spacer: {
        flex: 0.1,
    },
    contentSection: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        ...theme.typography.presets.h1,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: 15,
    },
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
    },
    instruction: {
        ...theme.typography.presets.h2,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    infoButton: {
        marginLeft: theme.spacing.sm,
        padding: theme.spacing.xs,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltip: {
        position: 'absolute',
        width: 190,
        height: 90,
        left: 36,
        top: 371,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        shadowColor: '#2E2E2E',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6.1,
        elevation: 5,
    },
    tooltipContent: {
        width: 167,
        paddingLeft: 13,
        paddingRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tooltipTitle: {
        fontFamily: 'Prompt',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 15.6, // 120% of 13px
        textAlign: 'center',
        color: '#484848',
        marginBottom: 4.18,
    },
    tooltipText: {
        fontFamily: 'Prompt',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 11,
        lineHeight: 13.2, // 120% of 11px
        color: '#484848',
        width: 167,
        textAlign: 'left',
    },
    privacyText: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textLight,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
});

export default IDVerificationScreen;

