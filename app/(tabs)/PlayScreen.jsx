import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Ensure Firebase is configured properly

const PlayScreen = () => {
  const navigation = useNavigation();
  const [scenarios, setScenarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch scenarios from Firebase
  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'scenarios'));
        const scenariosList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setScenarios(scenariosList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scenarios:', error);
      }
    };
    fetchScenarios();
  }, []);

  // Fetch roles when a scenario is selected
  const handleScenarioSelect = async (scenarioId) => {
    setLoading(true);
    try {
      const rolesSnapshot = await getDocs(collection(db, `scenarios/${scenarioId}/roles`));
      const rolesList = rolesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoles(rolesList);
      setSelectedScenario(scenarioId);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  // Navigate to the chat forum after selecting a role
  const handleRoleSelect = (roleId) => {
    navigation.navigate('ChatScreen', { scenarioId: selectedScenario, roleId });
  };

  return (
    <ImageBackground source={require('../../assets/images/back.gif')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {selectedScenario ? 'Select Your Role' : 'Select a Scenario'}
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : selectedScenario ? (
          // Display Roles After Selecting a Scenario
          roles.map(role => (
            <TouchableOpacity
              key={role.id}
              style={styles.button}
              onPress={() => handleRoleSelect(role.id)} // Navigate to chat with selected role
            >
              <Text style={styles.buttonText}>{role.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          // Display Scenarios List Initially
          scenarios.map(scenario => (
            <TouchableOpacity
              key={scenario.id}
              style={styles.button}
              onPress={() => handleScenarioSelect(scenario.id)}
            >
              <Text style={styles.buttonText}>{scenario.name}</Text>
            </TouchableOpacity>
          ))
        )}

        {/* Back Button */}
        {selectedScenario && (
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedScenario(null)}>
            <Text style={styles.backButtonText}>Back to Scenarios</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default PlayScreen;
