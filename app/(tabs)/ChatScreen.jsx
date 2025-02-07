import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, getDocs } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';

const ChatScreen = () => {
  const route = useRoute();
  const { scenarioId, roleId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roleNames, setRoleNames] = useState({});
  const flatListRef = useRef(null);

  useEffect(() => {
    const messagesRef = collection(db, `scenarios/${scenarioId}/messages`);
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    // Realtime listener for new messages
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [scenarioId]);

  // Fetch Role Names
  useEffect(() => {
    const fetchRoleNames = async () => {
      try {
        const rolesSnapshot = await getDocs(collection(db, `scenarios/${scenarioId}/roles`));
        const names = {};
        rolesSnapshot.docs.forEach(doc => {
          names[doc.id] = doc.data().name;
        });
        setRoleNames(names);
      } catch (error) {
        console.error('Error fetching role names:', error);
      }
    };
    fetchRoleNames();
  }, [scenarioId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      await addDoc(collection(db, `scenarios/${scenarioId}/messages`), {
        text: newMessage,
        roleId,
        userId: auth.currentUser?.uid || 'anonymous',
        timestamp: serverTimestamp(),
      });

      setNewMessage('');
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 50 }}
        renderItem={({ item }) => (
          <View style={[styles.messageRow, item.roleId === roleId ? styles.myMessageRow : styles.otherMessageRow]}>
            <View style={[styles.messageContainer, item.roleId === roleId ? styles.myMessage : styles.otherMessage]}>
              <Text style={styles.roleName}>
                {roleNames[item.roleId] || 'Unknown Role'}
              </Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#ccc"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e1e', paddingHorizontal: 10 },
  messageRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
  myMessageRow: { justifyContent: 'flex-end' },
  otherMessageRow: { justifyContent: 'flex-start' },
  messageContainer: { padding: 10, borderRadius: 8, maxWidth: '70%' },
  myMessage: { backgroundColor: '#007AFF', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#444', alignSelf: 'flex-start' },
  roleName: { color: '#FFD700', fontWeight: 'bold', marginBottom: 2, fontSize: 12 },
  messageText: { color: 'white', fontSize: 16 },
  inputContainer: { flexDirection: 'row', padding: 10, borderTopWidth: 1, borderColor: '#333' },
  input: { flex: 1, color: 'white', fontSize: 16, padding: 10, backgroundColor: '#333', borderRadius: 5 },
  sendButton: { marginLeft: 10, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: '#007AFF', borderRadius: 5 },
  sendButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default ChatScreen;
