import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import Button from '../components/Button';
import BackgroundPattern from '../components/BackgroundPattern';
import BackButton from '../components/BackButton';
import { theme } from '../theme/theme';
import { commonStyles } from '../styles/common';

const IDVerificationScreen: React.FC = () => {
    const navigation = useNavigation();
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={styles.headerContainer}>
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

                {showTooltip && (
                    <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>
                            Why we ask this? We are the first female-only health tracker in the world.
                            To get started, we need to verify your gender.
                        </Text>
                    </View>
                )}

                <Text style={styles.privacyText}>
                    Your privacy is protected: Astra never sees your documents, and Self does not store them.
                    Verification happens instantly and only once.
                </Text>

                <View style={styles.buttonContainer}>
                    <Button
                        title="Verify my ID"
                        onPress={() => {
                            // Simulate verification process - wait 1 second
                            setTimeout(() => {
                                navigation.navigate('VerificationSuccess' as never);
                            }, 1000);
                        }}
                        variant="outline"
                        style={styles.verifyButton}
                        textStyle={styles.verifyButtonText}
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
        ...commonStyles.headerContainer,
    },
    backButton: {
        marginRight: theme.spacing.md,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.titleMarginTop,
        justifyContent: 'space-between',
        paddingBottom: theme.spacing.formMarginBottom,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        ...theme.typography.presets.h1,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },
    instructionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: theme.spacing.sm,
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
    tooltip: {
        backgroundColor: theme.colors.white,
        padding: theme.spacing.base,
        borderRadius: theme.spacing.radius.base,
        marginTop: theme.spacing.base,
        shadowColor: '#000',
        shadowOffset: { width: theme.spacing.spacing0, height: theme.spacing.shadowOffsetY },
        shadowOpacity: 0.1,
        shadowRadius: theme.spacing.xs,
        elevation: 3,
    },
    tooltipText: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textLight,
    },
    privacyText: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textLight,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    buttonContainer: {
        width: theme.spacing.buttonWidth,
        alignSelf: 'center',
    },
    verifyButton: {
        ...commonStyles.buttonBase,
        ...commonStyles.buttonOutline,
    },
    verifyButtonText: {
        ...commonStyles.buttonTextSecondary,
    },
});

export default IDVerificationScreen;

