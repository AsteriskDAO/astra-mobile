/**
 * Common reusable styles
 * Shared style patterns used across multiple components
 */
import { StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

export const commonStyles = StyleSheet.create({
    // Container styles
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        position: 'relative',
    },

    // Header styles
    headerContainer: {
        paddingTop: theme.spacing.headerPaddingTop,
        paddingHorizontal: theme.spacing.headerPaddingHorizontal,
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Content styles
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.contentPaddingHorizontal,
    },

    scrollContent: {
        paddingBottom: theme.spacing.contentPaddingBottom,
    },

    // Input styles
    inputBase: {
        height: theme.spacing.inputHeight,
        backgroundColor: theme.colors.inputBackground,
        borderRadius: theme.spacing.radius.base,
        paddingHorizontal: theme.spacing.inputPaddingHorizontal,
        paddingVertical: theme.spacing.inputPaddingVertical,
        fontSize: theme.typography.fontSize.md,
        lineHeight: theme.typography.lineHeight.large,
        fontFamily: theme.typography.fontFamily.prompt,
        color: theme.colors.textSecondary,
        borderWidth: theme.spacing.borderWidth.none,
        borderColor: 'transparent', // Default: transparent border
    },

    inputFocused: {
        borderWidth: theme.spacing.borderWidth.none,
        borderColor: theme.colors.ocean,
    },

    inputUnfocused: {
        borderColor: 'transparent',
    },

    // Button styles
    buttonBase: {
        width: 260,
        height: theme.spacing.buttonHeight,
        borderRadius: theme.spacing.radius.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: theme.spacing.buttonHeight,
        paddingVertical: 0,
    },

    buttonOutline: {
        backgroundColor: theme.colors.buttonSecondary,
        borderColor: theme.colors.buttonPrimary,
        borderWidth: theme.spacing.borderWidth.thin,
    },

    buttonPrimary: {
        backgroundColor: theme.colors.buttonPrimary,
    },

    buttonText: {
        ...theme.typography.presets.button,
    },

    buttonTextPrimary: {
        ...theme.typography.presets.button,
        color: theme.colors.buttonPrimaryText,
    },

    buttonTextSecondary: {
        ...theme.typography.presets.button,
        color: theme.colors.buttonSecondaryText,
    },

    // Text styles
    title: {
        ...theme.typography.presets.h1,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },

    subtitle: {
        ...theme.typography.presets.h2,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },

    body: {
        ...theme.typography.presets.body,
        color: theme.colors.textPrimary,
    },

    bodySmall: {
        ...theme.typography.presets.bodySmall,
        color: theme.colors.textLight,
    },

    label: {
        ...theme.typography.presets.label,
        color: theme.colors.textPlaceholder,
    },

    labelFocused: {
        ...theme.typography.presets.labelFocused,
        color: theme.colors.ocean,
    },

    // Layout helpers
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Form styles
    formContainer: {
        width: 260,
        alignSelf: 'center',
        marginBottom: theme.spacing.formMarginBottom,
    },

    inputWrapper: {
        marginBottom: theme.spacing.lg,
    },
});

