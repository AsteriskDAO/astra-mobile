/**
 * Font size constants for consistent typography across the application
 * All font sizes should use these constants instead of hardcoded values
 */

export const FONT_SIZES = {
    // Main text sizes
    title: 16,           // For card titles, section titles, main headings
    subtitle: 14,        // For secondary text, descriptions, labels
    body: 16,            // For body text, input text, main content
    label: 14,           // For form labels, small descriptions

    // Heading sizes
    h1: 30,              // Page titles (large)
    h2: 22,              // Section headings (medium)
    h3: 15,              // Subsection headings (small)
    h4: 18,              // Card titles (medium-large)

    // Special sizes
    small: 9,            // Very small UI elements (date chips, etc.)
    button: 16,          // Button text
    input: 16,           // Input field text
    navLabel: 12,         // Navigation labels

    // Display sizes (for large display elements)
    displayLarge: 48,    // Large display numbers (streak count, etc.)
    displayMedium: 40,   // Medium display elements (icons, etc.)

    // Legacy/alternative sizes (for compatibility)
    bodySmall: 11,       // Small body text
    buttonSmall: 11,     // Small button text
} as const;
