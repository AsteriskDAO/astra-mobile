import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Input from '../../components/Input';
import { Ionicons } from '@expo/vector-icons';
import { useFixedHeaderHeight } from '../../hooks/useFixedHeaderHeight';
import { theme } from '../../theme/theme';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const DailyCheckinScreen: React.FC = () => {
    const navigation = useNavigation();
    const headerHeight = useFixedHeaderHeight();
    const insets = useSafeAreaInsets();
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hey, how are you feeling today?",
            isUser: false,
            timestamp: new Date(),
        },
        {
            id: '2',
            text: "I'm doing alright",
            isUser: true,
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    const handleSend = () => {
        if (inputText.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                text: inputText,
                isUser: true,
                timestamp: new Date(),
            };

            setMessages([...messages, newMessage]);
            setInputText('');

            // Simulate bot response
            setIsTyping(true);
            setTimeout(() => {
                const botResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "That's great to hear! Is there anything specific you'd like to track today?",
                    isUser: false,
                    timestamp: new Date(),
                };
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
            }, 2000);
        }
    };

    const renderMessage = (message: Message) => (
        <View
            key={message.id}
            style={[
                styles.messageContainer,
                message.isUser ? styles.userMessage : styles.botMessage,
            ]}
        >
            {!message.isUser && (
                <Image
                    style={styles.asteriskLogo}
                    source={require('../../../assets/PinkAsterisk1.svg')}
                    resizeMode="contain"
                />
            )}
            <View
                style={[
                    styles.messageBubble,
                    message.isUser ? styles.userBubble : styles.botBubble,
                ]}
            >
                <Text
                    style={[
                        styles.messageText,
                        message.isUser ? styles.userText : styles.botText,
                    ]}
                >
                    {message.text}
                </Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={[styles.messagesContainer, { paddingTop: headerHeight }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {messages.map(renderMessage)}

                {isTyping && (
                    <View style={[styles.messageContainer, styles.botMessage]}>
                        <Image
                            style={styles.asteriskLogo}
                            source={require('../../../assets/PinkAsterisk1.svg')}
                            resizeMode="contain"

                        />
                        <View style={[styles.messageBubble, styles.botBubble]}>
                            <Text style={[styles.messageText, styles.botText]}>typing...</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={[styles.inputContainer, { paddingBottom: 16 + theme.spacing.bottomNavHeight }]}>
                <View style={styles.inputWrapper}>
                    <Input
                        placeholder="type"
                        value={inputText}
                        onChangeText={setInputText}
                        style={styles.inputWrapperStyle}
                        inputStyle={styles.textInput}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                </View>
                <TouchableOpacity style={styles.micButton}>
                    <Ionicons name="mic" size={20} color={theme.colors.ocean} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 25,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    messageContainer: {
        flexDirection: 'row',
        marginVertical: 8,
        alignItems: 'flex-end',
    },
    userMessage: {
        justifyContent: 'flex-end',
    },
    botMessage: {
        justifyContent: 'flex-start',
    },

    asteriskLogo: {
        width: 24.57,
        height: 28.67,
        // Centered within the 32x32 container using justifyContent and alignItems
    },
    messageBubble: {
        maxWidth: '80%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 20,
    },
    userBubble: {
        backgroundColor: '#E0E0E0',
    },
    botBubble: {
        backgroundColor: 'white',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    userText: {
        color: '#333333',
    },
    botText: {
        color: '#333333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 25,
        paddingTop: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    inputWrapper: {
        flex: 1,
        marginRight: 8,
    },
    inputWrapperStyle: {
        marginBottom: 0,
    },
    textInput: {
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        maxHeight: 100,
        borderWidth: 0,
        fontSize: 16,
        fontWeight: '400',
        color: '#272727',
        fontFamily: theme.typography.fontFamily.prompt,
    },
    micButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    sendButton: {
        backgroundColor: theme.colors.asteriskPink,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: theme.typography.fontFamily.prompt,
        textAlign: 'center',
    },
});

export default DailyCheckinScreen;

