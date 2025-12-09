/**
 * Typography system for Asterisk application
 * All font families, sizes, weights, and line heights
 */
export const typography = {
    // Font Families
    fontFamily: {
        prompt: 'Prompt',
        playfairDisplay: 'Playfair Display',
    },

    // Font Sizes (only used ones)
    fontSize: {
        base: 10,
        md: 12,
    },

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
            fontSize: 30,
            lineHeight: 31,
            fontWeight: '500',
        },
        h2: {
            fontFamily: 'Prompt',
            fontSize: 22,
            lineHeight: 23,
            fontWeight: '400',
        },
        h3: {
            fontFamily: 'Prompt',
            fontSize: 15,
            lineHeight: 16,
            fontWeight: '500',
        },

        // Body Text
        body: {
            fontFamily: 'Prompt',
            fontSize: 12,
            lineHeight: 18,
            fontWeight: '400',
        },
        bodySmall: {
            fontFamily: 'Prompt',
            fontSize: 11,
            lineHeight: 13,
            fontWeight: '400',
        },

        // Labels
        label: {
            fontFamily: 'Prompt',
            fontSize: 10,
            lineHeight: 15,
            fontWeight: '400',
        },
        labelFocused: {
            fontFamily: 'Prompt',
            fontSize: 10,
            lineHeight: 15,
            fontWeight: '400',
        },

        // Button Text
        button: {
            fontFamily: 'Prompt',
            fontSize: 11,
            lineHeight: 17,
            fontWeight: '500',
        },

        // Navigation
        navLabel: {
            fontFamily: 'Prompt',
            fontSize: 8,
            lineHeight: 8,
            fontWeight: '400',
        },

        // Special
        welcomeTitle: {
            fontFamily: 'Playfair Display',
            fontSize: 30,
            lineHeight: 40,
            fontWeight: '400',
        },
    },
} as const;

