import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import SecondaryHeader from '../../components/SecondaryHeader';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Dropdown from '../../components/Dropdown';
import MultiselectDropdown from '../../components/MultiselectDropdown';
import { useUser } from '../../contexts/UserContext';
import { theme } from '../../theme/theme';
import { commonStyles } from '../../styles/common';
import { ETHNICITY_OPTIONS } from '../../constants/ethnicity';
import { FONT_SIZES } from '../../constants/fontSizes';

const ProfileInformationScreen: React.FC = () => {
    const navigation = useNavigation();
    const { user, updateUser, updateHealthData } = useUser();
    
    // Initialize form data from user context or defaults
    const profile = user?.healthData?.profile;
    const [formData, setFormData] = useState({
        nickname: user?.nickname || 'nickname',
        ageRange: profile?.age_range || '20-25',
        ethnicity: profile?.ethnicity?.[0] || '',
        location: profile?.location || 'Europe',
        pregnancy: profile?.is_pregnant ? 'Yes' : 'No',
        caretaker: user?.healthData?.caretaker || [],
    });

    // Update form data when user data changes
    useEffect(() => {
        const currentProfile = user?.healthData?.profile;
        setFormData({
            nickname: user?.nickname || 'nickname',
            ageRange: currentProfile?.age_range || '20-25',
            ethnicity: currentProfile?.ethnicity?.[0] || '',
            location: currentProfile?.location || 'Europe',
            pregnancy: currentProfile?.is_pregnant ? 'Yes' : 'No',
            caretaker: user?.healthData?.caretaker || [],
        });
    }, [user]);

    const caretakerOptions = ['Kids', 'Parents', 'Partner', 'Friend', 'No', 'Other'];

    const handleSave = async () => {
        try {
            // Map age range - handle both "20-25" format and "20-25 years" format
            const ageRangeMap: Record<string, '18-20' | '20-25' | '25-30' | '30-35' | '35-40' | '40-45' | '45-50' | '50+'> = {
                '18-20': '18-20',
                '20-25': '20-25',
                '25-30': '25-30',
                '30-35': '30-35',
                '35-40': '35-40',
                '40-45': '40-45',
                '45-50': '45-50',
                '50+': '50+',
            };

            const ageRangeKey = formData.ageRange.replace(' years', '').trim();
            const mappedAgeRange = ageRangeMap[ageRangeKey] || (ageRangeKey as any) || '20-25';

            // Get current user or create default
            const currentUser = user || {
                user_id: `user_${Date.now()}`,
                user_hash: `hash_${Date.now()}`,
                checkIns: 0,
                points: 0,
                currentStreak: 0,
                longestStreak: 0,
                streakHistory: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                isGenderVerified: false,
                isRegistered: false,
            };

            // Prepare updated health data
            const currentHealthData = currentUser.healthData || {
                schema_version: 'v2' as const,
                healthDataId: currentUser.currentHealthDataId || `health_${Date.now()}`,
                user_hash: currentUser.user_hash,
                research_opt_in: false,
                timestamp: new Date().toISOString(),
            };

            const updatedHealthData = {
                ...currentHealthData,
                profile: {
                    age_range: mappedAgeRange,
                    ethnicity: formData.ethnicity ? [formData.ethnicity] : [],
                    location: formData.location,
                    is_pregnant: formData.pregnancy === 'Yes',
                },
                caretaker: formData.caretaker,
                timestamp: new Date().toISOString(),
            };

            // Update everything in one call to ensure consistency
            await updateUser({
                nickname: formData.nickname,
                healthData: updatedHealthData,
                currentHealthDataId: updatedHealthData.healthDataId,
            });

            navigation.goBack();
        } catch (error) {
            console.error('Failed to save profile:', error);
            Alert.alert('Error', 'Failed to save profile. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title="Profile Information"
                    onBack={() => navigation.goBack()}
                    titleColor={theme.colors.textSecondary}
                />

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <Input
                        label="Nickname"
                        placeholder="nickname"
                        value={formData.nickname}
                        onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                        required
                    />

                    <Input
                        label="Age Range"
                        placeholder="20-25"
                        value={formData.ageRange}
                        onChangeText={(text) => setFormData({ ...formData, ageRange: text })}
                        required
                    />

                    <View style={styles.inputGroup}>
                        <Label required>Ethnicity</Label>
                        <Dropdown
                            value={formData.ethnicity}
                            options={ETHNICITY_OPTIONS}
                            onSelect={(value) => setFormData({ ...formData, ethnicity: value })}
                            placeholder="Select your ethnicity"
                        />
                    </View>

                    <Input
                        label="Location"
                        placeholder="Europe"
                        value={formData.location}
                        onChangeText={(text) => setFormData({ ...formData, location: text })}
                        required
                    />

                    <View style={styles.inputGroup}>
                        <Label>Pregnant (optional)</Label>
                        <Dropdown
                            value={formData.pregnancy}
                            options={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                                { label: 'Prefer not to say', value: 'Prefer not to say' },
                            ]}
                            onSelect={(value) => setFormData({ ...formData, pregnancy: value })}
                            placeholder="Select"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Label>Are you a caretaker (optional)</Label>
                        <MultiselectDropdown
                            values={formData.caretaker}
                            options={caretakerOptions.map(option => ({ label: option, value: option }))}
                            onSelect={(values) => setFormData({ ...formData, caretaker: values })}
                            placeholder="Choose options"
                        />
                    </View>
                </View>

                {/* Save Button */}
                <Button
                    title="Save"
                    onPress={handleSave}
                    variant="primary"
                />
            </ScrollView>
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
    },
    formContainer: {
        ...commonStyles.formContainer,
        marginTop: theme.spacing.lg,
    },
    inputGroup: {
        marginBottom: theme.spacing.lg,
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    dropdownText: {
        fontSize: FONT_SIZES.body,
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
        flex: 1,
    },
    placeholder: {
        color: theme.colors.textPlaceholder,
    },

});

export default ProfileInformationScreen;