import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import WhatsNextSection from '../../components/WhatsNextSection';
import { theme } from '../../theme/theme';
import { useFixedHeaderHeight } from '../../hooks/useFixedHeaderHeight';
import { FONT_SIZES } from '../../constants/fontSizes';
import { RootStackParamList } from '../../types/navigation';

type NotificationsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainContainer'>;

const NotificationsScreen: React.FC = () => {
    const navigation = useNavigation<NotificationsScreenNavigationProp>();
    const headerHeight = useFixedHeaderHeight();

    return (
        <View style={styles.container}>
            <ScrollView
                style={[styles.content, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Action Cards */}
                <WhatsNextSection
                    title=""
                    items={[
                        {
                            iconSource: require('../../../assets/research-invite.svg'),
                            title: 'Research invitation',
                            subtitle: 'You have been selected to participate in study X.',
                            onPress: () => navigation.navigate('ResearchInvite'),
                        },
                        {
                            iconSource: require('../../../assets/vote.svg'),
                            title: 'Cast your vote',
                            subtitle: 'We are deciding our next X.',
                            onPress: () => {
                                // Navigate to voting screen when implemented
                            },
                        },
                        {
                            icon: {
                                name: 'trophy-outline',
                                size: 24,
                                color: theme.colors.ocean,
                            },
                            title: 'Congrats!',
                            subtitle: 'You have completed your first check-in.',
                            showChevron: false,
                        },
                    ]}
                />
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
    scrollContent: {
        paddingBottom: theme.spacing.lg,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        gap: theme.spacing.xs,
    },
    headerTitle: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: FONT_SIZES.h4,
        fontWeight: '500',
        color: theme.colors.textPrimary,
    },
});

export default NotificationsScreen;

