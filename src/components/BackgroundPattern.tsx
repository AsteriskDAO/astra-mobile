import React from 'react';
import { View, StyleSheet } from 'react-native';
import { theme } from '../theme/theme';

const BackgroundPattern: React.FC = () => {
    // Create multiple layers to simulate the complex vector pattern
    // This is a simplified version of the complex CSS transforms
    return (
        <View style={styles.container}>
            {/* Base layer */}
            <View style={styles.baseLayer} />

            {/* Pattern layer 1 - Bottom left transformed vectors */}
            <View style={[styles.patternLayer, styles.layer1]} />

            {/* Pattern layer 2 - Top right transformed vectors */}
            <View style={[styles.patternLayer, styles.layer2]} />

            {/* Additional subtle layers for depth */}
            <View style={[styles.patternLayer, styles.layer3]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
    },
    baseLayer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.background,
    },
    patternLayer: {
        position: 'absolute',
        backgroundColor: theme.colors.backgroundPattern,
        borderRadius: theme.spacing.radius.full,
        opacity: 0.15,
    },
    layer1: {
        width: 400,
        height: 600,
        left: -150,
        bottom: -200,
        transform: [{ rotate: '-15deg' }, { skewX: '-10deg' }],
    },
    layer2: {
        width: 500,
        height: 700,
        right: -200,
        top: -300,
        transform: [{ rotate: '20deg' }, { skewX: '15deg' }],
    },
    layer3: {
        width: 350,
        height: 500,
        left: '50%',
        top: '50%',
        marginLeft: -175,
        marginTop: -250,
        transform: [{ rotate: '5deg' }],
        opacity: 0.08,
    },
});

export default BackgroundPattern;

