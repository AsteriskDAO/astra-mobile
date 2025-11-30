import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

interface ProgressBarProps {
    progress: number; // 0 to 1
    totalSteps?: number;
    currentStep?: number;
    style?: any;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    totalSteps,
    currentStep,
    style,
}) => {
    const progressWidth = totalSteps && currentStep
        ? (currentStep / totalSteps) * 100
        : progress * 100;

    return (
        <View style={[styles.container, style]}>
            <View style={styles.track}>
                <View
                    style={[
                        styles.progress,
                        { width: `${progressWidth}%` }
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: theme.spacing.progressBarWidth,
        height: theme.spacing.progressBarHeight,
    },
    track: {
        height: theme.spacing.progressBarHeight,
        backgroundColor: theme.colors.oceanLight,
        borderRadius: theme.spacing.radius.sm,
        overflow: 'hidden',
    },
    progress: {
        height: '100%',
        backgroundColor: theme.colors.ocean,
        borderRadius: theme.spacing.radius.sm,
    },
});

export default ProgressBar;

