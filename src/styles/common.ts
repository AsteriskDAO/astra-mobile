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
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },

    // Content styles
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },

    scrollContent: {
        paddingBottom: theme.spacing.contentPaddingBottom,
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
        width: '100%',
        marginBottom: theme.spacing.formMarginBottom,
    },

    inputWrapper: {
        marginBottom: theme.spacing.lg,
    },
});

