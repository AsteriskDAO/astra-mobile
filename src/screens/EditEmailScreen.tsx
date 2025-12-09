import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackgroundPattern from '../components/BackgroundPattern';
import SecondaryHeader from '../components/SecondaryHeader';
import Input from '../components/Input';
import Button from '../components/Button';
import { theme } from '../theme/theme';
import { LAYOUT } from '../constants/layout';

const EditEmailScreen: React.FC = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('hi@asterisk.xyz');

    const handleSave = () => {
        // Handle email change logic
        if (email) {
            // Save email
            navigation.goBack();
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <BackgroundPattern />
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title="Edit Email"
                    onBack={() => navigation.goBack()}
                />

                {/* Email Input */}
                <Input
                    label="Email"
                    placeholder="Enter email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.inputGroup}
                />

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                        variant="primary"
                        disabled={!email}
                        style={styles.button}
                    />
                    <Button
                        title="Cancel"
                        onPress={handleCancel}
                        variant="outline"
                        style={styles.button}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: LAYOUT.CONTENT_PADDING_HORIZONTAL,
        paddingBottom: theme.spacing.bottomNavHeight + theme.spacing.base,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        gap: 10,
    },
    button: {
        width: '100%',
    },
});

export default EditEmailScreen;

