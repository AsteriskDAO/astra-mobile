import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

interface HeaderProps {
    progress?: number;
    totalSteps?: number;
    currentStep?: number;
    showProgress?: boolean;
}

const Header: React.FC<HeaderProps> = ({
    progress,
    totalSteps,
    currentStep,
    showProgress = true,
}) => {
    return (
        <View style={styles.container}>
            {showProgress && (
                <View style={styles.progressContainer}>
                    <ProgressBar
                        progress={progress}
                        totalSteps={totalSteps}
                        currentStep={currentStep}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    progressContainer: {
        width: 200,
        alignSelf: 'center',
    },
});

export default Header;

