import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import HeaderBeforeLogin from '../components/HeaderBeforeLogin';
import BoxOpsi from '../components/BoxOpsi';
import TextLogRes from '../components/TextLogRes';
import BoxInput from '../components/BoxInput';
import Tombol from '../components/Tombol';
import { TextCoklat } from '../Utils/color';
import { auth } from '../firebase';

const LoginPenjual = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleBack = () => {
    navigation.navigate('Login');
  };

  const handleLogin = () => {
    // Validate email and password and perform login action
    if (!email || !password) {
      return alert('mohon masukkan  email dan password.');
    }
    // Sign in with email and password
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('sukses Login', user.displayName );
      })
      .catch((error) => {
        // Handle error
        alert(error.message);
      });
    if (handleLogin) {
      return navigation.navigate('HomePenjual');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBeforeLogin onPress={handleBack} />
      <View style={{ alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: TextCoklat,
            margin: 10,
          }}>
          Login Sebagai Penjual
        </Text>
        <TextLogRes text="Inputkan Email dan Password Anda!" />
        <BoxInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <BoxInput
          placeholder="Password"
          secureTextEntry="true"
          alue={password}
          onChangeText={setPassword}
        />
        <Tombol text="Log In" onPress={handleLogin} />
      </View>
    </ScrollView>
  );
};

export default LoginPenjual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1CBA9',
  },
});
