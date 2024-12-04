import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import Toast from 'react-native-toast-message';

const LoginPage = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSignIn = async () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Both fields are required.');
      return;
    }

    try {
      // Attempt Firebase sign-in (assuming passwordless or password is pre-configured)
      await signInWithEmailAndPassword(auth, email, 'defaultPassword'); // Replace 'defaultPassword' if needed

      Toast.show({
        type: 'success',
        text1: 'Welcome!',
        text2: `Hello, ${name}!`,
      });

      // Navigate to Home or Dashboard
      navigation.navigate('Home');
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again.';
      if (error.code === 'auth/user-not-found') errorMessage = 'No account found for this email.';
      if (error.code === 'auth/invalid-email') errorMessage = 'Invalid email format.';
      if (error.code === 'auth/wrong-password') errorMessage = 'Incorrect password.';

      Alert.alert('Login Failed', errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: errorMessage,
      });
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/back.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Login</Text>
        <Text style={styles.subTitle}>Sign in to continue</Text>

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

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignupPageWithBackground')}>
          <Text style={styles.subText}>Don't have an account? Sign up here.</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 32, color: 'white', fontWeight: '700', marginBottom: 10 },
  subTitle: { fontSize: 18, color: 'white', marginBottom: 40 },
  inputContainer: { width: '80%', marginBottom: 20 },
  label: { fontSize: 16, color: 'white', marginBottom: 5 },
  input: { height: 50, backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', paddingHorizontal: 15, borderRadius: 8 },
  button: { backgroundColor: 'black', paddingVertical: 15, paddingHorizontal: 80, borderRadius: 30, marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: '500' },
  subText: { color: 'white', fontSize: 16, marginTop: 20, textDecorationLine: 'underline' },
});

export default LoginPage;
