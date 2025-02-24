import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Resources = () => {
    const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../assets/images/back.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Resources</Text>
        <Text style={styles.content}>Find all the resources and materials you need here.</Text>
      </View>
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={50} color="white" />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 36, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  content: { fontSize: 18, color: 'white', textAlign: 'center' },
  homeButton: { position: 'absolute', bottom: 20, alignSelf: 'center' },
});

export default Resources;
