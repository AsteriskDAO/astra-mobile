import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';
import Toggle from '../../components/Toggle';
import MetricsCards from '../../components/MetricsCards';
import DayStreakCard from '../../components/DayStreakCard';
import EditButton from '../../components/EditButton';
import { useUser } from '../../contexts/UserContext';
import { theme } from '../../theme/theme';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();
    const { user } = useUser();
    const [researchInvitesEnabled, setResearchInvitesEnabled] = useState(true);

    // Use user data from context, fallback to defaults
    const profile = user?.healthData?.profile;
    const profileData = {
        nickname: user?.nickname || 'username',
        age: profile?.age_range
            ? `${profile.age_range} years`
            : '18-25 years',
        ethnicity: profile?.ethnicity?.length
            ? profile.ethnicity.join(', ')
            : '-',
        region: profile?.location || 'Europe',
        pregnancy: profile?.is_pregnant ? 'Yes' : 'No',
        caretaker: user?.healthData?.caretaker?.length
            ? user.healthData.caretaker.join(', ')
            : '-',
    };

    const handleEditProfile = () => {
        navigation.navigate('ProfileInformation');
    };

    const handleConditionsPress = () => {
        navigation.navigate('ConditionsScreen');
    };

    const handleMedicationsPress = () => {
        navigation.navigate('MedicationsScreen');
    };

    const handleTreatmentsPress = () => {
        navigation.navigate('TreatmentsScreen');
    };

    const handleDayStreakPress = () => {
        navigation.navigate('DayStreakScreen');
    };

    const healthSections: Array<{
        title: string;
        onPress: () => void;
        iconSource?: ImageSourcePropType;
    }> = [
            {
                title: 'Conditions',
                onPress: handleConditionsPress,
                iconSource: require('../../../assets/conditions.svg') as ImageSourcePropType,
            },
            {
                title: 'Medications',
                onPress: handleMedicationsPress,
                iconSource: require('../../../assets/medications.svg') as ImageSourcePropType,
            },
            {
                title: 'Treatments',
                onPress: handleTreatmentsPress,
            },
        ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <SecondaryHeader
                    title={profileData.nickname}
                    onBack={() => navigation.goBack()}
                    rightElement={<Ionicons name="person-outline" size={20} color={theme.colors.ocean} />}
                />

                {/* Profile Information Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.cardTitleContainer}>
                            <Ionicons name="person-outline" size={15} color={theme.colors.ocean} />
                            <Text style={styles.cardTitle}>Profile Information</Text>
                        </View>
                        <EditButton onPress={handleEditProfile} />
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
                {healthSections.map((section) => (
                    <TouchableOpacity
                        key={section.title}
                        style={styles.healthCard}
                        onPress={section.onPress}
                    >
                        <View style={styles.healthCardContent}>
                            {section.iconSource ? (
                                <Image
                                    source={section.iconSource}
                                    style={styles.healthCardIcon}
                                    resizeMode="contain"
                                />
                            ) : (
                                <Ionicons
                                    name="medical-outline"
                                    size={15}
                                    color={theme.colors.textPrimary}
                                />
                            )}
                            <Text style={styles.healthCardTitle}>{section.title}</Text>
                        </View>
                        <Ionicons
                            name="chevron-forward"
                            size={8}
                            color={theme.colors.textDisabled}
                        />
                    </TouchableOpacity>
                ))}

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
        backgroundColor: theme.colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.spacing.lg,
    },
    card: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: theme.spacing.md,
        marginTop: 30,
        marginBottom: theme.spacing.lg,
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
        gap: theme.spacing.xs,
    },
    cardTitle: {
        fontSize: FONT_SIZES.title,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
    },
    profileGrid: {
        flexDirection: 'column',
        gap: 3,
        paddingLeft: theme.spacing.lg,
    },
    profileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 123,
        height: 15,
    },
    profileLabel: {
        fontSize: FONT_SIZES.subtitle,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: theme.colors.textDisabled,
    },
    profileValue: {
        fontSize: FONT_SIZES.body,
        lineHeight: 20,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
    },
    healthCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        height: 40,
        paddingHorizontal: theme.spacing.md,
        marginBottom: theme.spacing.sm,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    healthCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    healthCardIcon: {
        width: 15,
        height: 15,
    },
    healthCardTitle: {
        fontSize: FONT_SIZES.title,
        lineHeight: 18,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
    },
    researchCard: {
        backgroundColor: theme.colors.white,
        borderRadius: 8,
        width: '100%',
        minHeight: 80,
        marginBottom: theme.spacing.lg,
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
        marginRight: theme.spacing.sm,
    },
    researchTitle: {
        fontSize: FONT_SIZES.title,
        lineHeight: 20,
        fontWeight: '500',
        fontFamily: 'Prompt',
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
    },
    researchDescription: {
        fontSize: FONT_SIZES.subtitle,
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'Prompt',
        color: theme.colors.textDisabled,
        flex: 1,
        flexWrap: 'wrap',
    },
});

export default ProfileScreen;