import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const DailyCheckinScreen: React.FC = () => {
    const navigation = useNavigation();
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
                <View style={styles.botIcon}>
                    <Text style={styles.asterisk}>*</Text>
                </View>
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
            <View style={styles.header}>
                <Text style={styles.title}>Daily Check-in</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close" size={24} color="#2196F3" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
                {messages.map(renderMessage)}

                {isTyping && (
                    <View style={[styles.messageContainer, styles.botMessage]}>
                        <View style={styles.botIcon}>
                            <Text style={styles.asterisk}>*</Text>
                        </View>
                        <View style={[styles.messageBubble, styles.botBubble]}>
                            <Text style={[styles.messageText, styles.botText]}>typing...</Text>
                        </View>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={[
                        styles.textInput,
                        isInputFocused && styles.textInputFocused
                    ]}
                    placeholder="type"
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                />
                <TouchableOpacity style={styles.micButton}>
                    <Ionicons name="mic" size={20} color="#2196F3" />
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 60,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    messagesContainer: {
        flex: 1,
        paddingHorizontal: 20,
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
    botIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#E91E63',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    asterisk: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'transparent',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 8,
        maxHeight: 100,
        fontSize: 16,
    },
    textInputFocused: {
        borderColor: '#61ABC5',
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
        backgroundColor: '#E91E63',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 20,
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default DailyCheckinScreen;

