import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import WhatsNextSection from '../components/WhatsNextSection';
import { theme } from '../theme/theme';
import { useFixedHeaderHeight } from '../hooks/useFixedHeaderHeight';

const NotificationsScreen: React.FC = () => {
    const navigation = useNavigation();
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
                            iconSource: require('../../assets/research-invite.svg'),
                            title: 'Research invitation',
                            subtitle: 'You have been selected to participate in study X.',
                            onPress: () => navigation.navigate('ResearchInvite' as never),
                        },
                        {
                            iconSource: require('../../assets/vote.svg'),
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
        backgroundColor: '#F8F8F8',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        gap: 4,
    },
    headerTitle: {
        fontFamily: theme.typography.fontFamily.prompt,
        fontSize: 18,
        fontWeight: '500',
        color: '#232323',
    },
});

export default NotificationsScreen;

