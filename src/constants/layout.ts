/**
 * Layout constants for consistent spacing across the application
 * These values are used for padding, margins, and positioning
 */

export const LAYOUT = {
    // Content padding
    CONTENT_PADDING_HORIZONTAL: 25, // Standard content padding for main app screens
    AUTH_CONTENT_PADDING_HORIZONTAL: 35, // Padding for authentication/onboarding screens
    
    // Header spacing
    LOGIN_TITLE_TOP_PADDING: 60, // Top padding for "Log in to your account" text
    SIGNUP_TITLE_TOP_PADDING: 80, // Top padding for "Let's create your account!" text
    
    // Setting item dimensions
    SETTING_ITEM_HEIGHT: 40,
    SETTING_ITEM_ICON_SIZE: 16,
    SETTING_ITEM_ICON_LEFT: 10,
    SETTING_ITEM_ICON_TOP: 12,
    SETTING_ITEM_LABEL_LEFT: 33, // ICON_LEFT + ICON_SIZE + 7px padding
    SETTING_ITEM_LABEL_FONT_SIZE: 13,
    SETTING_ITEM_LABEL_LINE_HEIGHT: 14, // 105% of 13px
} as const;

