import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={require('../../assets/images/back.gif')} style={styles.background}>
      <View style={styles.container}>
        {/* Play Image */}
        <TouchableOpacity onPress={() => navigation.navigate('Play')}>
          <Image source={require('../../assets/images/play.png')} style={styles.image} />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Power Play</Text>

        {/* Learn Image */}
        <TouchableOpacity onPress={() => navigation.navigate('Learn')}>
          <Image source={require('../../assets/images/learn.png')} style={styles.image} />
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 40, // Adds space between images and text
    fontFamily: 'cursive',
  },
  image: {
    width: 200, // Adjust width as needed
    height: 200, // Adjust height as needed
    resizeMode: 'contain',
    marginBottom: 20, // Adds space between images and title
  },
});

export default HomeScreen;
