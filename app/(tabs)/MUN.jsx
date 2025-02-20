import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const MUN = () => {
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
                <Text style={styles.title}>Model United Nations</Text>
                <TouchableOpacity style={styles.button} onPress={() => showModal("Model United Nations (MUN) is an academic simulation of the United Nations, where students represent different countries, debate global issues, and propose resolutions to solve world problems. Delegates research their assigned country's stance on international topics and participate in structured debates that follow UN protocols. The objective is to learn diplomacy, negotiation, and public speaking while gaining a deep understanding of global affairs.")}>                    
                    <Text style={styles.buttonText}>🌍 What is MUN?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("At the beginning of each MUN session, the Chair conducts roll call to check which delegates are present. When called, a delegate can respond in two ways:\n● 'Present' – The delegate is attending the session and can choose to abstain from voting later.\n● 'Present and Voting' – The delegate is attending and must vote on all resolutions and amendments, without the option to abstain. This distinction is crucial because it determines the voting rights of each delegate during formal decisions. If a delegate is absent during roll call, they cannot participate in the debate until recognized later by the Chair.")}>                    
                    <Text style={styles.buttonText}>📢 Roll Call & Its Importance</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("The General Speakers’ List (GSL) is the main forum for formal debate. Delegates are added to the list upon request and deliver structured speeches on the committee’s agenda. Each speech should include:\n● An Introduction – Address the Chair and fellow delegates, stating your country’s stance.\n● Arguments & Evidence – Use data, past treaties, and policies to support your position.\n● Proposed Solutions – Outline realistic steps your country supports to resolve the issue. Speeches are timed, and exceeding the limit results in a warning. After each speech, other delegates may ask Points of Information (questions) to challenge or clarify statements.")}>                    
                    <Text style={styles.buttonText}>📜 General Speakers’ List (GSL)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("A moderated caucus is a structured discussion where the committee shifts from the GSL to short, focused speeches on a specific subtopic. The Chair moderates the session, and each delegate is given a fixed amount of time to speak.\n● Purpose: To explore specific aspects of the issue in greater detail.\n● Example: If the topic is 'Cybersecurity,' a moderated caucus may focus on 'Regulation of AI in Warfare.'\n● Strategy: Delegates should use persuasive arguments and concise language, ensuring their points are clear within the time limit.")}>                    
                    <Text style={styles.buttonText}>🗣️ Moderated Caucus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("An unmoderated caucus is an informal session where delegates freely move around the room, form alliances, and negotiate policies.\n● Purpose: To build coalitions, discuss ideas, and draft resolutions.\n● Effective Strategies:\n○ Find like-minded countries to support your policies.\n○ Approach opposing blocs diplomatically to seek compromises.\n○ Work with delegates who have strong research to strengthen your proposals. Since no formal rules apply, communication and persuasion skills are essential.")}>                    
                    <Text style={styles.buttonText}>🤝 Unmoderated Caucus</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => showModal("A position paper is a one-page document outlining your country’s perspective on the topic, past actions, and proposed solutions. It serves as your reference throughout the debate.\n📌 Structure:\n1. Introduction – Briefly introduce the issue.\n2. Past Actions – Highlight what has been done by your country or the UN.\n3. Your Country’s Stance – Explain your nation's policies and voting history.\n4. Proposed Solutions – Offer diplomatic, economic, or security-based solutions. A well-researched position paper strengthens your credibility and helps in debates.")}>                    
                    <Text style={styles.buttonText}>📝 Position Paper</Text>
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
    title: { fontSize: 30, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, marginTop:50, color: 'white' },
    button: { backgroundColor: '#3498db', padding: 15, marginVertical: 5, borderRadius: 10, alignItems: 'center' },
    buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
    homeButton: { position: 'absolute', bottom: 30, right: 30 },
    modalContainer: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 15, width: '80%', maxHeight: '70%' },
    modalText: { fontSize: 16, lineHeight: 24 },
    closeButton: { marginTop: 15, backgroundColor: '#e74c3c', padding: 10, borderRadius: 10, alignItems: 'center' },
    closeButtonText: { color: 'white', fontWeight: 'bold' }
});

export default MUN;