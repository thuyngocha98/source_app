import React from 'react';
import { Platform, Alert } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SettingScreen from '../screens/SettingScreen';
import ServicesScreen from '../screens/ServicesScreen';
import colors from '../components/Common/Colors'
import { screenWidth, APPBAR_HEIGHT } from '../components/Common/Dimension'
import NewsDetail from '../components/HomeScreens/NewsDetails/NewsDetail'

import DetailCommunity from '../components/Community/DetailCommunity';
import GroupFacebook from '../components/Community/GroupFacebook';
import QuestionComponrnt from '../components/Community/QuestionComponent';
import ViewTree from '../components/TreeLibraryScreen/ViewTree';
import DetailsScreen from '../components/TreeLibraryScreen/InfoDetailTree/InfoDetailTree';
import SearchTreeScreen from '../components/TreeLibraryScreen/SearchTreeScreen/SearchTreeScreen';
import properties from '../components/properties/properties'
import Login from '../components/user/Login'
import NewsScreen from '../components/HomeScreens/NewsScreen/NewsScreen';
import ScreenHome from '../components/HomeScreens/ScreenHome';
import AuthLoadingUserScreen from '../AuthLoading/AuthLoadingUserScreen';
import AuthLoadingCommunityScreen from '../AuthLoading/AuthLoadingCommunityScreen'

const HomeStack = createStackNavigator(
  {
    ScreenHome: {
      screen: ScreenHome,
      navigationOptions: {
        title: 'Chợ Cây Xanh',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
          textAlign: 'center',
        },
        headerTitleStyle: {
          // textAlign: 'left',
        },
      }
    },
    NewsScreen: {
      screen: NewsScreen,
      navigationOptions: {
        title: 'Tin tức',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
          textAlign: 'center',
        },
        headerTitleStyle: {
          //fontSize: 20,
        },
      }
    },
    NewsDetail: {
      screen: NewsDetail,
      navigationOptions: {
        title: 'Chi tiết tin tức',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
          textAlign: 'center',
        },
        headerTitleStyle: {
          //fontSize: 20,
        },
      }
    }
  },
  // config
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "NewsScreen") {
        tabBarVisible = false;
      }
      else if (route.routeName === "NewsDetail") {
        tabBarVisible = false;
      }
      else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Trang chủ',
    tabBarOptions: {
      activeTintColor: colors.green,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        borderTopColor: colors.white,
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      },
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />
    ),

  };
};



const LibraryStack = createStackNavigator(
  {
    ViewTree: {
      screen: ViewTree,
      navigationOptions: {
        title: 'Thư viện cây',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
        },
        headerTitleStyle: {
        },
      }
    },
    InfoDetailTree: {
      screen: DetailsScreen,
      navigationOptions: {
        title: 'Thông tin chi tiết cây',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
        },
        headerTitleStyle: {
          //fontSize: 20,
        },
      }
    },
    SearchTreeScreen: {
      screen: SearchTreeScreen,
      navigationOptions: {
        title: 'Tìm kiếm cây',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
          textAlign: 'center',
        },
        headerTitleStyle: {
          //fontSize: 20,
        },
      }
    }
  },
  {
    initialRouteName: 'ViewTree',
  },

  // config
);

LibraryStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "InfoDetailTree") {
        tabBarVisible = false;
      }
      else if (route.routeName === "SearchTreeScreen") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Thư viện cây',
    tabBarOptions: {
      activeTintColor: colors.green,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        borderTopColor: colors.white,
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      },
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-leaf' : 'md-leaf'} />
    ),

  };
};

// LinksStack.path = '';

const ServicesStack = createStackNavigator(
  {
    Services: ServicesScreen,
  },
  // config
);

ServicesStack.navigationOptions = {
  tabBarLabel: 'Dịch vụ',
  tabBarOptions: {
    activeTintColor: colors.green,
    labelStyle: {
      paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
    },
    style: {
      borderTopColor: colors.white,
      height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
    },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  ),
};

// LinksStack.path = '';

const SettingStack = createStackNavigator(
  {
    Settings: SettingScreen,
  },
  // config
);

SettingStack.navigationOptions = {
  tabBarLabel: 'Cài đặt',
  tabBarOptions: {
    activeTintColor: colors.green,
    labelStyle: {
      paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : 0,
    },
    style: {
      height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 8,
    }
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

// SettingStack.path = '';

const UserStack = createStackNavigator(
  {
  
    // Login:{
    //   screen: Login,
    //   navigationOptions: {
    //     title: 'Đăng nhập',
    //     headerTintColor: colors.white,
    //     headerStyle: {
    //       backgroundColor: colors.green,
    //       elevation: 0,
    //       height: APPBAR_HEIGHT,
    //       textAlign : 'center',
    //     },
    //   }
    // },
    properties:{
      screen: properties,
      navigationOptions: {
        title: 'Thông tin của bạn',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
          textAlign : 'center',
        },
      }
  },
  // config
  });
  


const CommunityStack = createStackNavigator({
  
    Community:{
      screen: GroupFacebook,
      navigationOptions: {
        title: 'Cộng Đồng',
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.green,
          elevation: 0,
          height: APPBAR_HEIGHT,
          textAlign : 'center',
        },
      }
  },
  DetailCommunity: {
    screen: DetailCommunity,
    navigationOptions: {
      title: 'Chi tiết câu hỏi',
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.green,
        elevation: 0,
        height: APPBAR_HEIGHT,
        textAlign: 'center',
      }
    }
  },
  Question: {
    screen: QuestionComponrnt,
    navigationOptions: {
      title: 'Đặt câu hỏi',
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.green,
        elevation: 0,
        height: APPBAR_HEIGHT,
        textAlign: 'center',
      }
    }
  },
  // config
});

const AuthLoadingUserStack = createAppContainer(createSwitchNavigator(
  {
    AuthLoadingUser: AuthLoadingUserScreen,
    login: Login,
    properties: UserStack,
  },
  {
    initialRouteName: 'AuthLoadingUser',
  }
));


 AuthLoadingUserStack.navigationOptions = {
tabBarLabel: 'Người dùng',
tabBarOptions: {
  activeTintColor: colors.green,
  labelStyle: {
    paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
  },
  style: {
    borderTopColor: colors.white,
    height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
  },
},
tabBarIcon: ({ focused }) => (
  <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'} />
),
};
const AuthLoadingCommunityStack = createAppContainer(createSwitchNavigator(
  {
    AuthLoadingCommunity: AuthLoadingCommunityScreen,
    login: Login,
    community: CommunityStack,
  },
  {
    initialRouteName: 'AuthLoadingCommunity',
  }
));


AuthLoadingCommunityStack.navigationOptions = ({ navigation }) =>  {
  // tabBarLabel: 'Cộng Đồng',
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  // ),
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "DetailCommunity") {
        tabBarVisible = false;
      }
      else if (route.routeName === "Question") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Cộng Đồng',
    tabBarOptions: {
      activeTintColor: colors.green,
      labelStyle: {
        paddingBottom: Platform.OS === 'ios' ? screenWidth / 41.4 : screenWidth / 80,
      },
      style: {
        borderTopColor: colors.white,
        height: Platform.OS === 'ios' ? screenWidth / 7.52 : screenWidth / 7.2,
      }
    },
    tabBarIcon: ({ focused }) => (
      <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'}/>
    ),
    
  };
}

const tabNavigator = createBottomTabNavigator({
  HomeStack,

  //ProductsScreen,
  LibraryStack,
  AuthLoadingCommunityStack,
  AuthLoadingUserStack,
});

export default tabNavigator;
