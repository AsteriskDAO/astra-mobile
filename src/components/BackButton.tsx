import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { theme } from '../theme/theme';

interface BackButtonProps {
    onPress: () => void;
    size?: number;
    style?: StyleProp<ViewStyle>;
    color?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
    onPress, 
    size = 17, 
    style,
    color = theme.colors.ocean 
}) => {
    // SVG path from arrow-back-ios.svg
    // Original viewBox is 17x17, path dimensions are width: 8.266, height: 14.025
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, { width: size, height: size }, style]}
            activeOpacity={0.7}
        >
            <Svg
                width={size}
                height={size}
                viewBox="0 0 17 17"
                fill="none"
            >
                <Path
                    d="M8.26625 2.74124L7.0125 1.48749L0 8.49999L7.0125 15.5125L8.26625 14.2587L2.5075 8.49999L8.26625 2.74124Z"
                    fill={color}
                />
            </Svg>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BackButton;

