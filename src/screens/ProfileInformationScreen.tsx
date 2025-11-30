import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../components/Button';
import BottomNavigation from '../components/BottomNavigation';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';

const ProfileInformationScreen: React.FC = () => {
    const navigation = useNavigation();
    const [focusedInput, setFocusedInput] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        nickname: 'nickname',
        ageRange: '20-25',
        ethnicity: '',
        location: 'Europe',
        pregnancy: 'No',
        caretaker: '',
    });

    const handleSave = () => {
        // Handle save logic
        navigation.goBack();
    };

    const handleTabPress = (tab: string) => {
        if (tab === 'settings') {
            navigation.navigate('Profile' as never);
        } else if (tab === 'home') {
            navigation.navigate('Dashboard' as never);
        } else if (tab === 'notifications') {
            navigation.navigate('DailyCheckin' as never);
        } else if (tab === 'community') {
            navigation.navigate('Profile' as never);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                        size={17}
                    />
                    <View style={styles.headerCenter}>
                        <Ionicons name="person-outline" size={15} color="#232323" />
                        <Text style={styles.headerTitle}>Profile Information</Text>
                        <Logo size={13} tintColor="#FF01B4" />
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={[
                            styles.label,
                            focusedInput === 'nickname' && styles.labelFocused
                        ]}>
                            Nickname<Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'nickname' && styles.inputFocused
                            ]}
                            value={formData.nickname}
                            onChangeText={(text) => setFormData({ ...formData, nickname: text })}
                            placeholder="nickname"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput('nickname')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[
                            styles.label,
                            focusedInput === 'ageRange' && styles.labelFocused
                        ]}>
                            Age Range<Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'ageRange' && styles.inputFocused
                            ]}
                            value={formData.ageRange}
                            onChangeText={(text) => setFormData({ ...formData, ageRange: text })}
                            placeholder="20-25"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput('ageRange')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>
                            Ethnicity<Text style={styles.required}>*</Text>
                        </Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.ethnicity && styles.placeholder]}>
                                {formData.ethnicity || 'Select your ethnicity'}
                            </Text>
                            <Ionicons name="chevron-down" size={10} color="#949494" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={[
                            styles.label,
                            focusedInput === 'location' && styles.labelFocused
                        ]}>
                            Location<Text style={styles.required}>*</Text>
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                focusedInput === 'location' && styles.inputFocused
                            ]}
                            value={formData.location}
                            onChangeText={(text) => setFormData({ ...formData, location: text })}
                            placeholder="Europe"
                            placeholderTextColor="#949494"
                            onFocus={() => setFocusedInput('location')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Pregnant (optional)</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={styles.dropdownText}>{formData.pregnancy}</Text>
                            <Ionicons name="chevron-down" size={10} color="#949494" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Are you a caretaker (optional)</Text>
                        <TouchableOpacity style={styles.dropdown}>
                            <Text style={[styles.dropdownText, !formData.caretaker && styles.placeholder]}>
                                {formData.caretaker || 'Choose an option'}
                            </Text>
                            <Ionicons name="chevron-down" size={10} color="#949494" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Save Button */}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save"
                        onPress={handleSave}
                        style={styles.saveButton}
                        textStyle={styles.saveButtonText}
                    />
                </View>
            </ScrollView>

            <BottomNavigation activeTab="settings" onTabPress={handleTabPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingTop: 44,
        width: '100%',
    },
    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    headerTitle: {
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    asterisk: {
        fontSize: 13,
        color: '#FF01B4',
    },
    formContainer: {
        marginTop: 20,
        width: 260,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 10,
        lineHeight: 15,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#9C9C9C',
        marginBottom: 0,
    },
    labelFocused: {
        color: '#61ABC5',
    },
    required: {
        color: '#FF01B4',
    },
    input: {
        height: 30,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 6,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Prompt',
        color: '#272727',
        marginTop: 0,
    },
    inputFocused: {
        borderColor: '#61ABC5',
    },
    dropdown: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 13,
        paddingVertical: 6,
    },
    dropdownText: {
        fontSize: 12,
        lineHeight: 18,
        fontFamily: 'Prompt',
        color: '#272727',
    },
    placeholder: {
        color: '#949494',
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 40,
        width: 260,
    },
    saveButton: {
        width: 260,
        height: 35,
        backgroundColor: '#FF01B4',
        borderRadius: 10,
        paddingVertical: 0,
        minHeight: 35,
    },
    saveButtonText: {
        fontSize: 11,
        lineHeight: 17,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#FFFFFF',
    },
});

export default ProfileInformationScreen;