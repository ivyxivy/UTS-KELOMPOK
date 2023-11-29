import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import TextPillOpsi from '../components/TextPillOpsi';
import { Logo1, Logo2 } from '../assets/index';
import { useNavigation } from '@react-navigation/native';
import BottomTab from '../components/BottomTab';
import { auth, db } from '../firebase';

const HomePenjual = ({navigation}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // navigate to login page if user is not logged in
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container}>
        <View style={styles.img}>
          <Image style={styles.img1} source={Logo1} />
          <Image style={styles.img2} source={Logo2} />
          <TextPillOpsi text="Anda Log in Sebagai Penjual " />
          <TextPillOpsi text={user.displayName} />
        </View>
      </TouchableOpacity>
      <View style={{ alignItems: 'end' }}>
        <BottomTab />
      </View>
    </View>
  );
};

export default HomePenjual;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E1CBA9',
    justifyContent: 'center',
  },
  img: {
    alignItems: 'center',
  },
  img1: {
    width: 143,
    height: 139,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 100,
    boxShadow: '0px 0px 10px #503106',
  },
  img2: {
    width: 341,
    height: 110,
  },
});
