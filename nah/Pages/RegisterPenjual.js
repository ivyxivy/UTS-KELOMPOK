import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import HeaderBeforeLogin from '../components/HeaderBeforeLogin';
import TextLogRes from '../components/TextLogRes';
import BoxInput from '../components/BoxInput';
import Tombol from '../components/Tombol';
import { TextCoklat } from '../Utils/color';
import { auth, db } from '../firebase';

const RegisterPenjual = ({ navigation }) => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [kantin, setKantin] = useState('');
  const [error, setError] = useState(null);

  const handleBack = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        db.collection('penjual')
          .doc(user.uid)
          .set({
            nama: nama,
            email: email,
            kantin: kantin
          })
          .then(() => {
            setNama('');
            setEmail('');
            setKantin('');
            setPassword('');
          });
        user
          .updateProfile({
            displayName: nama,
          })
          .then(() => {
            console.log('sukses register', user);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });

    if (handleRegister) {
      return navigation.navigate('Login');
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
          Register Sebagai Penjual
        </Text>
        <TextLogRes text="Silahkan Isi Data Diri Anda Dengan Benar!" />
        <BoxInput
          type="register"
          placeholder="e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <BoxInput placeholder="Nama" value={nama} onChangeText={setNama} />
        <BoxInput
          placeholder="Password"
          secureTextEntry="true"
          value={password}
          onChangeText={setPassword}
        />
        <BoxInput
          placeholder="Nama Canteen"
          value={kantin}
          onChangeText={setKantin}
        />
        <Tombol text="Sign Up" onPress={handleRegister} />
      </View>
    </ScrollView>
  );
};

export default RegisterPenjual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1CBA9',
  },
});
