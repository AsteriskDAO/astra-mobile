# Theme Architecture

This directory contains the centralized theme system for the Asterisk application. All design tokens (colors, typography, spacing) are defined here and should be used throughout the app instead of hardcoded values.

## Structure

```
theme/
├── colors.ts          # Color palette
├── typography.ts      # Font families, sizes, weights, line heights
├── spacing.ts         # Spacing, padding, margin, border radius
└── theme.ts           # Main theme file combining all tokens
```

## Usage

### Importing the Theme

```typescript
import { theme } from "../theme/theme";
```

### Using Colors

```typescript
// Instead of:
backgroundColor: "#FF01B4";

// Use:
backgroundColor: theme.colors.asteriskPink;
// or
backgroundColor: theme.colors.buttonPrimary;
```

### Using Typography

```typescript
// Instead of:
fontSize: 11,
fontFamily: 'Prompt',
fontWeight: '500',
lineHeight: 17,

// Use presets:
...theme.typography.presets.button

// Or individual values:
fontSize: theme.typography.fontSize.base,
fontFamily: theme.typography.fontFamily.prompt,
fontWeight: theme.typography.fontWeight.medium,
lineHeight: theme.typography.lineHeight.base,
```

### Using Spacing

```typescript
// Instead of:
padding: 30,
marginBottom: 40,
height: 35,

// Use:
padding: theme.spacing.xl,
marginBottom: theme.spacing.formMarginBottom,
height: theme.spacing.buttonHeight,
```

### Common Styles

For reusable style patterns, use the common styles from `../styles/common.ts`:

```typescript
import { commonStyles } from "../styles/common";

// In your StyleSheet:
const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  button: {
    ...commonStyles.buttonBase,
    ...commonStyles.buttonPrimary,
  },
});
```

## Available Design Tokens

### Colors

- **Brand**: `asteriskPink`, `ocean`, `oceanLight`
- **Background**: `background`, `white`, `inputBackground`
- **Text**: `textPrimary`, `textSecondary`, `textPlaceholder`, etc.
- **Buttons**: `buttonPrimary`, `buttonSecondary`, etc.

### Typography Presets

- `h1`, `h2`, `h3` - Headings
- `body`, `bodySmall` - Body text
- `label`, `labelFocused` - Form labels
- `button` - Button text
- `navLabel` - Navigation labels

### Spacing

- Base units: `xs: 4`, `sm: 8`, `md: 13`, `base: 16`, etc.
- Component-specific: `buttonHeight: 35`, `inputHeight: 30`, etc.
- Layout: `headerPaddingTop: 44`, `contentPaddingHorizontal: 30`, etc.
- Border radius: `radius.sm: 3`, `radius.base: 8`, `radius.md: 10`, etc.

## Best Practices

1. **Always use theme values** - Never hardcode colors, fonts, or spacing
2. **Use presets when possible** - Typography presets ensure consistency
3. **Extend common styles** - Use `commonStyles` as a base and extend with screen-specific styles
4. **Keep theme files updated** - When design changes, update the theme files, not individual components

## Adding New Values

When adding new design tokens:

1. Add to the appropriate file (`colors.ts`, `typography.ts`, or `spacing.ts`)
2. Use descriptive names that indicate usage (e.g., `buttonPrimary` not `pink`)
3. Export through `theme.ts`
4. Document in this README if it's a significant addition

## Migration Guide

To migrate existing components:

1. Import theme: `import { theme } from '../theme/theme';`
2. Replace hardcoded colors with `theme.colors.*`
3. Replace hardcoded spacing with `theme.spacing.*`
4. Replace typography with `theme.typography.presets.*` or individual values
5. Use `commonStyles` for reusable patterns
