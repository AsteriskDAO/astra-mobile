/**
 * Types for Settings screen
 */

export interface SettingItem {
    id: string;
    icon: string;
    label: string;
    onPress: () => void;
    value?: string;
    showCopyButton?: boolean;
    onCopy?: () => void;
}

