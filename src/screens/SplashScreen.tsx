import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { getApiForSearchTree } from '../actions/action';
import colors from '../components/Common/Colors';
import { screenWidth } from '../components/Common/Dimension';

type props = { navigation: any, getdata: any };
type State = { placeName: string };

class SplashScreen extends React.Component<props, State>{
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    const data = await this.props.getdata();
    if (data !== null) {
      this.props.navigation.navigate('Main');
    }
  }
  render() {
    return (
      <View style={styles.viewStyles}>
        <Image
          style={{ width: 300, height: 300 }}
          source={require('../../assets/images/logo_company.png')} />
        <View style={styles.indicator}>
          <ActivityIndicator animating size="small" color={colors.white} />
        </View>
      </View>
    );
  }
}

//gọi action để thực hiện get api về
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getdata: getApiForSearchTree
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(SplashScreen)

const styles = StyleSheet.create({
  viewStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#087524'
  },
  textStyles: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold'
  },
  indicator: {
    paddingTop: screenWidth/7.2,
    justifyContent: "center",
    alignItems: 'center'
  }
})

