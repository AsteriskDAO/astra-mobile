import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../components/Logo';
import { theme } from '../theme/theme';

const SplashScreen: React.FC = () => {
    const navigation = useNavigation();

    useEffect(() => {
        // Navigate to welcome screen after 2-3 seconds
        const timer = setTimeout(() => {
            navigation.navigate('Welcome' as never);
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <LinearGradient
            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
            start={{ x: 0.1, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={styles.container}
        >
            <View style={styles.content}>
                <Logo size={120} tintColor={theme.colors.white} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SplashScreen;

