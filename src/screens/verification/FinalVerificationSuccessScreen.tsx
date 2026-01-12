import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import BackgroundPattern from '../../components/BackgroundPattern';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';

const FinalVerificationSuccessScreen: React.FC = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <View style={styles.content}>
                {/* First view - empty spacer */}
                <View style={styles.spacer} />

                {/* Second view - content (title) */}
                <View style={styles.contentSection}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>All verified!</Text>
                    </View>
                </View>

                {/* Third view - button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Start your daily check-in"
                        onPress={() => navigation.navigate('MainContainer' as never)}
                        variant="primary"
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
        paddingHorizontal: 25,
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
    title: {
        ...theme.typography.presets.h1,
        color: theme.colors.textPrimary,
        textAlign: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
});

export default FinalVerificationSuccessScreen;

