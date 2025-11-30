/**
 * Main theme file combining all design tokens
 * This is the single source of truth for all styling values
 */
import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';

export const theme = {
    colors,
    typography,
    spacing,
} as const;

export default theme;

