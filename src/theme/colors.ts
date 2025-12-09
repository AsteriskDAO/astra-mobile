/**
 * Color palette for Asterisk application
 * All colors used throughout the app should be defined here
 */
export const colors = {
    // Brand Colors
    asteriskPink: '#FF01B4',
    ocean: '#61ABC5',
    oceanLight: '#CAE0E7',

    // Background Colors
    background: '#F8F8F8',
    backgroundPattern: '#FAFCFC',
    white: '#FFFFFF',
    inputBackground: '#EFEFEF',

    // Text Colors
    textPrimary: '#1B1B1B',
    textSecondary: '#272727',
    textLight: '#484848',
    textPlaceholder: '#9C9C9C',
    textDisabled: '#949494',

    // Border Colors
    borderLight: '#E0E0E0',

    // Button Colors
    buttonPrimary: '#FF01B4',
    buttonPrimaryText: '#FFFFFF',
    buttonSecondary: '#F8F8F8',
    buttonSecondaryText: '#FF01B4',
    buttonDisabled: '#C6C6C6',
    buttonDisabledText: '#FFFFFF',

    // Status Colors (currently unused, but kept for future use)
    // success: '#4CAF50',
    // error: '#E91E63',

    // Gradient Colors
    gradientStart: '#FF01B4',
    gradientEnd: '#FFD1F3',
} as const;

export type ColorName = keyof typeof colors;

