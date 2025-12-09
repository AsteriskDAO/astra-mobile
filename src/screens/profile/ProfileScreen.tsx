import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';
import Toggle from '../../components/Toggle';
import MetricsCards from '../../components/MetricsCards';
import DayStreakCard from '../../components/DayStreakCard';
import { theme } from '../../theme/theme';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();
    const [researchInvitesEnabled, setResearchInvitesEnabled] = useState(true);

    const profileData = {
        nickname: 'username',
        age: '18-25 years',
        ethnicity: '-',
        region: 'Europe',
        pregnancy: 'No',
        caretaker: '-',
    };

    const handleEditProfile = () => {
        navigation.navigate('ProfileInformation' as never);
    };

    const handleConditionsPress = () => {
        navigation.navigate('ConditionsScreen' as never);
    };

    const handleMedicationsPress = () => {
        navigation.navigate('MedicationsScreen' as never);
    };

    const handleTreatmentsPress = () => {
        navigation.navigate('TreatmentsScreen' as never);
    };

    const handleDayStreakPress = () => {
        navigation.navigate('DayStreakScreen' as never);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title="username"
                    onBack={() => navigation.goBack()}
                />

                {/* Profile Information Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}>
                            <View style={styles.profileIconSmall}>
                                <View style={styles.profileIconInner} />
                            </View>
                            <Text style={styles.cardTitle}>Profile Information</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                            <Ionicons name="create-outline" size={10} color="#FF01B4" />
                            <Text style={styles.editButtonText}>edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileGrid}>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Nickname</Text>
                            <Text style={styles.profileValue}>{profileData.nickname}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Age</Text>
                            <Text style={styles.profileValue}>{profileData.age}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Ethnicity</Text>
                            <Text style={styles.profileValue}>{profileData.ethnicity}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Region</Text>
                            <Text style={styles.profileValue}>{profileData.region}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Pregnancy</Text>
                            <Text style={styles.profileValue}>{profileData.pregnancy}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Caretaker</Text>
                            <Text style={styles.profileValue}>{profileData.caretaker}</Text>
                        </View>
                    </View>
                </View>

                {/* Health Sections */}
                <TouchableOpacity style={styles.healthCard} onPress={handleConditionsPress}>
                    <View style={styles.healthCardContent}>
                        <Ionicons name="medical-outline" size={15} color="#232323" />
                        <Text style={styles.healthCardTitle}>Conditions</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={8} color="#949494" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.healthCard} onPress={handleMedicationsPress}>
                    <View style={styles.healthCardContent}>
                        <Ionicons name="medical-outline" size={15} color="#232323" />
                        <Text style={styles.healthCardTitle}>Medications</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={8} color="#949494" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.healthCard} onPress={handleTreatmentsPress}>
                    <View style={styles.healthCardContent}>
                        <Ionicons name="medical-outline" size={15} color="#232323" />
                        <Text style={styles.healthCardTitle}>Treatments</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={8} color="#949494" />
                </TouchableOpacity>

                {/* Engagement Metrics */}
                <MetricsCards pointsEarned="12" rank="#23" />

                {/* Day Streak */}
                <DayStreakCard streakCount={3} onPress={handleDayStreakPress} />

                {/* Research Invites */}
                <View style={styles.researchCard}>
                    <View style={styles.researchContent}>
                        <View style={styles.researchTextContainer}>
                            <Text style={styles.researchTitle}>Research Invites</Text>
                            <Text style={styles.researchDescription}>
                                Researchers may invite you to compensated focus groups in the future. Would you like to receive invitations?
                            </Text>
                        </View>
                        <Toggle
                            value={researchInvitesEnabled}
                            onValueChange={setResearchInvitesEnabled}
                        />
                    </View>
                </View>
            </ScrollView>
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
        paddingHorizontal: 25,
    },
    profileIconContainer: {
        position: 'absolute',
        right: 0,
        width: 14,
        height: 14,
    },
    profileIconCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIconInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1.2,
        borderColor: '#61ABC5',
        backgroundColor: '#61ABC5',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 12,
        marginTop: 30,
        marginBottom: 20,
        width: '100%',
        minHeight: 151,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 23,
    },
    cardTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    profileIconSmall: {
        width: 15,
        height: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileIconInner: {
        width: 11,
        height: 12,
        borderWidth: 1.2,
        borderColor: '#232323',
        borderRadius: 5.5,
    },
    cardTitle: {
        fontSize: 13,
        lineHeight: 14,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF01B4',
        paddingHorizontal: 4,
        paddingVertical: 2.5,
        borderRadius: 6,
        width: 40,
        height: 20,
        justifyContent: 'center',
        gap: 4,
    },
    editButtonText: {
        fontSize: 10,
        lineHeight: 15,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#FF01B4',
    },
    profileGrid: {
        flexDirection: 'column',
        gap: 3,
        paddingLeft: 20,
    },
    profileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 123,
        height: 15,
    },
    profileLabel: {
        fontSize: 10,
        lineHeight: 15,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#949494',
    },
    profileValue: {
        fontSize: 10,
        lineHeight: 15,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    healthCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        height: 40,
        paddingHorizontal: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    healthCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    healthCardTitle: {
        fontSize: 13,
        lineHeight: 14,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    researchCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        width: '100%',
        height: 80,
        marginBottom: 20,
    },
    researchContent: {
        flex: 1,
        flexDirection: 'row',
        padding: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    researchTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    researchTitle: {
        fontSize: 13,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
        marginBottom: 8,
    },
    researchDescription: {
        fontSize: 10,
        lineHeight: 12,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#949494',
        width: 199,
    },
});

export default ProfileScreen;