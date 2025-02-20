import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Debate = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const showModal = (content) => {
        setModalContent(content);
        setModalVisible(true);
    };

    return (
        <ImageBackground source={require('../../assets/images/back.png')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Debate & Strategy</Text>
                <TouchableOpacity style={styles.button} onPress={() => showModal("Points in MUN – Managing Debate Flow\n\nDelegates can raise different points to clarify, question, or challenge procedural matters.\n● Point of Order: Raised when the Chair makes a procedural mistake.\n● Point of Inquiry: Used to ask about rules or procedures.\n● Point of Personal Privilege: Raised when a delegate faces discomfort affecting participation. These points ensure fairness and efficiency in debates.")}>                    
                    <Text style={styles.buttonText}>⚖️ Points in MUN</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("Voting Procedure – Passing or Rejecting Resolutions\n\nAt the end of discussions, the committee votes on resolutions and amendments.\n● Types of Votes:\n○ Simple Majority (50%+1) – Required for most decisions.\n○ Two-Thirds Majority – Needed for major issues in specialized committees.\n● Voting Options:\n○ Yes – In favor of the resolution.\n○ No – Against the resolution.\n○ Abstain – Neutral, but only if marked 'Present' during roll call.")}>                    
                    <Text style={styles.buttonText}>🗳️ Voting Procedure</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("Crisis Committees – Real-Time Decision Making\n\nCrisis committees are high-pressure simulations where unexpected global events unfold, requiring immediate responses.\n● Example: If a cyberattack disrupts UN operations, delegates must draft emergency responses.\n● Skills Required: Quick thinking, adaptability, and strategic alliances. Crisis committees test a delegate’s ability to handle real-world emergencies under time constraints.")}>                    
                    <Text style={styles.buttonText}>🚨 Crisis Committees</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("Directives in Crisis Committees – Taking Immediate Action\n\nUnlike traditional resolutions, directives are short, action-based commands issued in crisis committees.\n📌 Types:\n● Military Directives: Deploying troops or imposing sanctions.\n● Economic Directives: Freezing assets or imposing trade restrictions.\n● Covert Operations: Cyberattacks or intelligence gathering.\n● Example: 'Deploy a UN peacekeeping force to stabilize the disputed region within 48 hours.' Directives must be precise, realistic, and aligned with your country's policies.")}>                    
                    <Text style={styles.buttonText}>📜 Directives</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("FINAL CHECKLIST: Are You Ready for MUN?\n\n✅ Do you understand your country’s policies and alliances?\n✅ Can you write resolutions and propose amendments effectively?\n✅ Are you prepared for public speaking and debating under pressure?\n✅ Can you respond to crisis situations with strategic solutions?")}>                    
                    <Text style={styles.buttonText}>✅ Final Checklist</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
                <Icon name="home" size={50} color="white" />
            </TouchableOpacity>
            
            {/* Modal */}
            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <ScrollView>
                            <Text style={styles.modalText}>{modalContent}</Text>
                        </ScrollView>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    scrollContainer: { padding: 20 },
    title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop: 50, color: 'white' },
    button: { backgroundColor: '#3498db', padding: 15, marginVertical: 5, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    homeButton: { position: 'absolute', bottom: 30, right: 30 },
    modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 15, width: '80%', maxHeight: '70%' },
    modalText: { fontSize: 16, lineHeight: 24 },
    closeButton: { marginTop: 15, backgroundColor: '#e74c3c', padding: 10, borderRadius: 10, alignItems: 'center' },
    closeButtonText: { color: 'white', fontWeight: 'bold' }
});

export default Debate;
