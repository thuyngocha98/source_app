import React from 'react';
import { View, StyleSheet, ScrollView,  Platform, } from 'react-native';
// import { ExpoLinksView } from '@expo/samples';
import User from '../components/user/Login';
import  colors  from '../components/Common/Colors'

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
export default function UserScreen() {
  return (
    <ScrollView style={styles.container}>
      <User/>
    </ScrollView>
  );
}

UserScreen.navigationOptions = {
  title: 'Đăng nhập',
  headerTintColor: colors.white,
  headerStyle: {
    backgroundColor: colors.green,
    elevation: 0,
    height: APPBAR_HEIGHT,
    textAlign : 'center',
  },
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});