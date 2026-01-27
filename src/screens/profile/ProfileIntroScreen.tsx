import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Button from '../../components/Button';
import BackgroundPattern from '../../components/BackgroundPattern';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';
import { RootStackParamList } from '../../types/navigation';

type ProfileIntroScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileIntro'>;

const ProfileIntroScreen: React.FC = () => {
    const navigation = useNavigation<ProfileIntroScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={styles.content}>
                {/* First view - empty spacer */}
                <View style={styles.spacer} />

                {/* Second view - content (description) */}
                <View style={styles.contentSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>
                            Let's get your profile set up so Astra understands your health status.
                        </Text>
                    </View>
                </View>

                {/* Third view - button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Continue"
                        onPress={() => navigation.navigate('ProfileSetup')}
                        variant="outline"
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
        paddingTop: theme.spacing.titleMarginTop,
        paddingBottom: theme.spacing.formMarginBottom,
    },
    spacer: {
        flex: 0.3,
    },
    contentSection: {
        flex: 1,
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
    },
    description: {
        ...theme.typography.presets.h2,
        color: theme.colors.textPrimary,
        textAlign: 'center',
        alignSelf: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
});

export default ProfileIntroScreen;

