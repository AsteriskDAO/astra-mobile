import React from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';

interface LogoProps {
    size?: number;
    style?: ViewStyle | ImageStyle;
    tintColor?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 24, style, tintColor }) => {
    return (
        <View style={[styles.container, { width: size, height: size }, style]}>
            <Image
                source={require('../../assets/asterisk.png')}
                style={[
                    styles.image,
                    { width: size, height: size },
                    tintColor && { tintColor },
                ]}
                resizeMode="contain"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        // Keep original colors unless tintColor is provided
    },
});

export default Logo;

