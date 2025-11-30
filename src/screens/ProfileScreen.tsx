import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import BottomNavigation from '../components/BottomNavigation';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation();

    const profileData = {
        nickname: 'username',
        age: '18-25 years',
        ethnicity: '-',
        region: 'Europe',
        pregnancy: 'No',
        caretaker: '-',
    };

    const handleTabPress = (tab: string) => {
        if (tab === 'settings') {
            // Already on profile/settings
        } else if (tab === 'home') {
            navigation.navigate('Dashboard' as never);
        } else if (tab === 'notifications') {
            navigation.navigate('DailyCheckin' as never);
        } else if (tab === 'community') {
            navigation.navigate('Profile' as never);
        }
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
                {/* Header */}
                <View style={styles.header}>
                    <BackButton
                        onPress={() => navigation.goBack()}
                        size={17}
                    />
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>username</Text>
                        <Logo size={13} tintColor="#FF01B4" />
                    </View>
                    <Ionicons name="person-outline" size={14} color="#61ABC5" />
                </View>

                {/* Profile Information Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}>
                            <Ionicons name="person-outline" size={15} color="#232323" />
                            <Text style={styles.cardTitle}>Profile Information</Text>
                        </View>
                        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                            <Ionicons name="create-outline" size={10} color="#FF01B4" />
                            <Text style={styles.editButtonText}>edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileGrid}>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Nickname:</Text>
                            <Text style={styles.profileValue}>{profileData.nickname}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Age:</Text>
                            <Text style={styles.profileValue}>{profileData.age}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Ethnicity:</Text>
                            <Text style={styles.profileValue}>{profileData.ethnicity}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Region:</Text>
                            <Text style={styles.profileValue}>{profileData.region}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Pregnancy:</Text>
                            <Text style={styles.profileValue}>{profileData.pregnancy}</Text>
                        </View>
                        <View style={styles.profileItem}>
                            <Text style={styles.profileLabel}>Caretaker:</Text>
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
                        <Ionicons name="pills-outline" size={15} color="#232323" />
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
                <View style={styles.metricsContainer}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricNumber}>12</Text>
                        <Text style={styles.metricLabel}>points earned</Text>
                    </View>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricNumber}>#23</Text>
                        <Text style={styles.metricLabel}>ranked today</Text>
                    </View>
                </View>

                {/* Day Streak */}
                <TouchableOpacity style={styles.streakCard} onPress={handleDayStreakPress}>
                    <View style={styles.streakContent}>
                        <Ionicons name="flame" size={15} color="#FF01B4" />
                        <Text style={styles.streakTitle}>Day Streak</Text>
                    </View>
                    <View style={styles.streakRight}>
                        <Text style={styles.streakNumber}>3</Text>
                        <Ionicons name="chevron-forward" size={8} color="#949494" />
                    </View>
                </TouchableOpacity>

                {/* Research Invites */}
                <View style={styles.researchCard}>
                    <Text style={styles.researchTitle}>Research Invites</Text>
                    <Text style={styles.researchDescription}>
                        Researchers may invite you to compensated focus groups in the future.
                        Would you like to receive invitations?
                    </Text>
                    <View style={styles.toggleContainer}>
                        <View style={styles.toggle}>
                            <View style={styles.toggleThumb} />
                        </View>
                    </View>
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
        paddingHorizontal: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingTop: 42,
        marginBottom: 8,
    },
    headerTitleContainer: {
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
        textAlign: 'center',
    },
    asterisk: {
        fontSize: 13,
        color: '#FF01B4',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 12,
        marginBottom: 16,
        width: 270,
        alignSelf: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
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
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
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
    },
    profileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 270,
        alignSelf: 'center',
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
    metricsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        paddingHorizontal: 25,
    },
    metricCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 16,
        width: 133,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
    },
    metricNumber: {
        fontSize: 15,
        lineHeight: 16,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
        marginBottom: 4,
        textAlign: 'center',
    },
    metricLabel: {
        fontSize: 10,
        lineHeight: 10,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: '#949494',
        textAlign: 'center',
    },
    streakCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 270,
        alignSelf: 'center',
    },
    streakContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    streakTitle: {
        fontSize: 13,
        lineHeight: 14,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    streakRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    streakNumber: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: '#232323',
    },
    researchCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 13,
        marginBottom: 20,
        width: 270,
        alignSelf: 'center',
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
        marginBottom: 16,
    },
    toggleContainer: {
        alignItems: 'flex-end',
    },
    toggle: {
        width: 30,
        height: 16,
        borderRadius: 6,
        backgroundColor: '#CAE0E7',
        justifyContent: 'center',
    },
    toggleThumb: {
        position: 'absolute',
        left: 1,
        width: 12,
        height: 14,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
});

export default ProfileScreen;