import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import  colors  from '../components/Common/Colors'
import ScreenHome from '../components/HomeScreens/ScreenHome';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScreenHome />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.background
  },
});
