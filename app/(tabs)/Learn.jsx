import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Material Icons

const Learn = () => {
  const navigation = useNavigation();
  
  return (
    <ImageBackground source={require('../../assets/images/back.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Learn</Text>

        <View style={styles.grid}>
          <TouchableOpacity onPress={() => navigation.navigate('MUN')}>
            <Image source={require('../../assets/images/mun.png')} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Debate')}>
            <Image source={require('../../assets/images/debate.png')} style={styles.image} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Home Icon */}
      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={50} color="white" />
      </TouchableOpacity>
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
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 50,
  },
  grid: {
    flexDirection: 'column', // Change to column to stack vertically
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    width: 180,
    height: 180,
    margin: 15,
    resizeMode: 'contain',
  },
  homeButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default Learn;
