/**
 * Typography system for Asterisk application
 * All font families, sizes, weights, and line heights
 */
import { FONT_SIZES } from '../constants/fontSizes';

export const typography = {
    // Font Families
    fontFamily: {
        prompt: 'Prompt',
        playfairDisplay: 'Playfair Display',
    },

    // Font Sizes - use FONT_SIZES constants
    fontSize: FONT_SIZES,

    // Font Weights
    fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },

    // Line Heights (only used ones)
    lineHeight: {
        large: 18,
        '3xl': 33,
    },

    // Typography Presets
    presets: {
        // Headings
        h1: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.h1,
            lineHeight: 31,
            fontWeight: '500',
        },
        h2: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.h2,
            lineHeight: 23,
            fontWeight: '400',
        },
        h3: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.h3,
            lineHeight: 16,
            fontWeight: '500',
        },

        // Body Text
        body: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.subtitle,
            lineHeight: 13,
            fontWeight: '400',
        },
        bodySmall: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.bodySmall,
            lineHeight: 13,
            fontWeight: '400',
        },

        // Labels
        label: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.label,
            lineHeight: 15,
            fontWeight: '400',
        },
        labelFocused: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.label,
            lineHeight: 15,
            fontWeight: '400',
        },

        // Button Text
        button: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.buttonSmall,
            lineHeight: 17,
            fontWeight: '500',
        },

        // Navigation
        navLabel: {
            fontFamily: 'Prompt',
            fontSize: FONT_SIZES.navLabel,
            lineHeight: 8,
            fontWeight: '400',
        },

        // Special
        welcomeTitle: {
            fontFamily: 'Playfair Display',
            fontSize: FONT_SIZES.h1,
            lineHeight: 40,
            fontWeight: '400',
        },
    },
} as const;

