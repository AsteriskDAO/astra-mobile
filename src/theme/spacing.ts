/**
 * Spacing system for Asterisk application
 * All spacing, padding, and margin values
 */
export const spacing = {
    // Base spacing unit (4px)
    xs: 4,
    sm: 8,
    md: 13,
    base: 16,
    lg: 20,
    xl: 30,
    '2xl': 40,
    '4xl': 60,
    '5xl': 96,

    // Specific measurements from Figma
    buttonHeight: 35,
    inputHeight: 30,
    inputPaddingHorizontal: 13,
    inputPaddingVertical: 6,
    progressBarHeight: 5,
    progressBarWidth: 200,

    // Layout
    headerPaddingTop: 44,
    headerPaddingHorizontal: 30,
    contentPaddingHorizontal: 30,
    contentPaddingBottom: 40,
    // Note: Use useFixedHeaderHeight() hook instead of fixedHeaderHeight for dynamic safe area support

    // Screen specific
    titleMarginTop: 96,
    titleMarginBottom: 8,
    formMarginBottom: 40,
    buttonContainerMarginBottom: 40,

    // Additional common spacing values (only used ones)
    spacing0: 0,
    spacing2: 2,
    spacing7: 7,
    spacing60: 60,
    spacing80: 80,
    spacing198: 198,
    spacing242: 242,
    spacing269: 269,
    spacing276: 276,

    // Component dimensions (only used ones)
    formWidth: 260,
    buttonWidth: 260,
    iconSizeXl: 15,
    iconSize3xl: 20,
    bottomNavHeight: 62,
    bottomNavIndicatorWidth: 30,
    bottomNavIndicatorHeight: 2,
    shadowOffsetY: 2,

    // Border radius (only used ones)
    radius: {
        xs: 1,
        sm: 3,
        base: 8,
        md: 10,
        full: 150,
    },

    // Border width
    borderWidth: {
        none: 0,
        thin: 1,
        base: 2,
    },
} as const;

