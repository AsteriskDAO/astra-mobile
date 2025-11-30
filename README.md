# Astra - Women's Health App

A React Native application for women's health tracking and management, built with Expo and TypeScript.

## Features

### Onboarding Flow

- **Welcome Screen**: Initial landing with options for new users or existing users
- **Gender Verification**: Confirms the app is for women's health
- **ID Verification**: Integration with Self for identity verification
- **Account Creation**: User registration with email and password
- **Profile Setup**: Multi-step profile configuration including:
  - Personal information (name, age, ethnicity, location)
  - Health information (conditions, medications, treatments)
  - Caretaker status
  - Research participation preferences
- **Daily Check-in**: Chat-based interface for health tracking

### Key Screens

1. **WelcomeScreen** - Landing page with login/signup options
2. **GenderVerificationScreen** - Confirms app purpose
3. **IDVerificationScreen** - Self integration for verification
4. **VerificationSuccessScreen** - Success confirmation
5. **VerificationFailedScreen** - Error handling with support options
6. **CreateAccountScreen** - User registration
7. **LoginScreen** - User authentication
8. **TelegramLoginScreen** - Telegram integration
9. **ProfileSetupScreen** - Multi-step profile configuration
10. **DailyCheckinScreen** - Chat interface for health tracking

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **Expo Vector Icons** for icons
- **React Native Safe Area Context** for safe area handling

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Custom button component
│   ├── Input.tsx       # Custom input component
│   ├── ProgressBar.tsx # Progress indicator
│   ├── Header.tsx      # Screen header with navigation
│   └── BackgroundPattern.tsx # Background decoration
├── screens/            # Screen components
│   ├── WelcomeScreen.tsx
│   ├── GenderVerificationScreen.tsx
│   ├── IDVerificationScreen.tsx
│   ├── VerificationSuccessScreen.tsx
│   ├── VerificationFailedScreen.tsx
│   ├── CreateAccountScreen.tsx
│   ├── LoginScreen.tsx
│   ├── TelegramLoginScreen.tsx
│   ├── ProfileSetupScreen.tsx
│   └── DailyCheckinScreen.tsx
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm start
   ```

3. **Run on specific platforms**:
   ```bash
   npm run ios      # iOS simulator
   npm run android  # Android emulator
   npm run web      # Web browser
   ```

## Design System

### Colors

- **Primary Pink**: `#E91E63` - Main brand color
- **Blue**: `#2196F3` - Secondary actions and links
- **Background**: `#F5F5F5` - Light gray background
- **Text Dark**: `#333333` - Primary text
- **Text Light**: `#666666` - Secondary text

### Typography

- **Headings**: Bold, 24-32px
- **Body Text**: Regular, 14-18px
- **Labels**: Medium weight, 14px

### Components

- **Buttons**: Rounded corners (12px), consistent padding
- **Inputs**: Light gray background, blue borders
- **Progress Bar**: Blue indicator, gray track
- **Cards**: White background, subtle shadows

## Navigation Flow

```
WelcomeScreen
├── GenderVerificationScreen (new users)
│   └── IDVerificationScreen
│       ├── VerificationSuccessScreen
│       │   └── CreateAccountScreen
│       │       └── ProfileSetupScreen
│       │           └── DailyCheckinScreen
│       └── VerificationFailedScreen
└── LoginScreen (existing users)
    ├── TelegramLoginScreen
    │   └── ProfileSetupScreen
    └── DailyCheckinScreen
```

## Future Enhancements

- Real Self integration for ID verification
- Telegram bot integration
- Backend API integration
- Data persistence
- Push notifications
- Advanced health tracking features
- Research study integration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is private and proprietary.

