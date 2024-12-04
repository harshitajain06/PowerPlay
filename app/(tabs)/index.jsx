import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Toast from 'react-native-toast-message';

const SignupPageWithBackground = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      Toast.show({
        type: 'success',
        text1: 'Account Created!',
        text2: 'Please check your email to verify your account.',
      });

      Alert.alert('Success', 'Account created successfully! Please verify your email.');

      navigation.navigate('Login');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') errorMessage = 'Email is already in use.';
      if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email format.';
      if (error.code === 'auth/weak-password') errorMessage = 'Password should be at least 6 characters.';

      Alert.alert('Signup Failed', errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: errorMessage,
      });
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/back.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Create New Account</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.subText}>Already Registered? Log in here.</Text>
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#ccc"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#ccc"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 32, color: 'white', fontWeight: '700', marginBottom: 20 },
  subText: { color: 'white', fontSize: 16, marginBottom: 40, textDecorationLine: 'underline' },
  inputContainer: { width: '80%', marginBottom: 20 },
  label: { fontSize: 16, color: 'white', marginBottom: 5 },
  input: { height: 50, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', paddingHorizontal: 15, borderRadius: 8 },
  button: { backgroundColor: 'black', paddingVertical: 15, paddingHorizontal: 80, borderRadius: 30, marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '500' },
});

export default SignupPageWithBackground;
