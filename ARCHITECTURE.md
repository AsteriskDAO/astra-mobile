# Asterisk App Architecture

## Folder Structure

```
src/
├── components/          # Reusable UI components
├── constants/           # App-wide constants (layout, config)
│   └── layout.ts       # Layout constants (padding, dimensions)
├── contexts/           # React Context providers
│   └── TabContext.tsx  # Tab navigation state management
├── hooks/              # Custom React hooks
│   └── useFixedHeaderHeight.ts
├── screens/            # Screen components
├── styles/             # Shared style definitions
│   └── common.ts       # Common reusable styles
├── theme/              # Theme configuration
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── theme.ts        # Main theme export
├── types/              # TypeScript type definitions
│   ├── navigation.ts   # Navigation types
│   ├── settings.ts     # Settings-related types
│   └── index.ts        # Central type exports
└── utils/              # Utility functions
    └── navigation.ts   # Navigation helpers
```

## Key Improvements

### 1. Constants Organization

- **Location**: `src/constants/layout.ts`
- **Purpose**: Centralized layout constants (padding, dimensions)
- **Benefits**:
  - Single source of truth for spacing values
  - Easy to update across entire app
  - Type-safe constants

### 2. Type Definitions

- **Location**: `src/types/`
- **Purpose**: Centralized TypeScript types
- **Files**:
  - `navigation.ts`: React Navigation types
  - `settings.ts`: Settings screen types
  - `index.ts`: Central export point

### 3. Code Organization Principles

- **Separation of Concerns**: Components, screens, utilities are clearly separated
- **DRY (Don't Repeat Yourself)**: Common styles and constants are centralized
- **Type Safety**: TypeScript types ensure type safety across the app
- **Maintainability**: Clear folder structure makes it easy to find and update code

## Constants Usage

### Layout Constants

```typescript
import { LAYOUT } from '../constants/layout';

// Use in styles
paddingHorizontal: LAYOUT.CONTENT_PADDING_HORIZONTAL, // 25px
paddingHorizontal: LAYOUT.AUTH_CONTENT_PADDING_HORIZONTAL, // 35px
paddingTop: LAYOUT.LOGIN_TITLE_TOP_PADDING, // 60px
marginTop: LAYOUT.SIGNUP_TITLE_TOP_PADDING, // 80px
```

### Benefits

- Consistent spacing across all screens
- Easy to update values globally
- Self-documenting code
- Prevents magic numbers

## Navigation Structure

### Main Navigation Flow

1. **Onboarding**: Splash → Welcome → GenderVerification → IDVerification → VerificationSuccess → ProfileSetup
2. **Authentication**: Login / CreateAccount → MainContainer
3. **Main App**: MainContainer (with tab switching via TabContext)
4. **Sub-screens**: Pushed on top of MainContainer (Profile, Settings, etc.)

### Tab Management

- Uses `TabContext` for state management
- `MainContainerScreen` renders content based on active tab
- `PersistentBottomNav` handles tab switching
- No actual navigation between main tabs (performance optimization)

## Best Practices

1. **Import Constants**: Always use constants from `constants/layout.ts` instead of hardcoded values
2. **Type Safety**: Use types from `types/` folder for props and navigation
3. **Component Reusability**: Extract common patterns into reusable components
4. **Style Consistency**: Use `commonStyles` and theme values for consistent styling
5. **Code Organization**: Keep related code together (screens, components, types)
