import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableNativeFeedback,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {revoke} from 'react-native-app-auth';
import {LoginManager} from 'react-native-fbsdk';
import {connect} from 'react-redux';

const {RNTwitterSignIn} = NativeModules;

import TextComponent from '../../components/Shared/TextComponent';
import {FontType, IconType, AppVariables} from '../../constants/AppConstants';
import {Colors} from '../../constants/ThemeConstants';
import IconComponent from '../../components/Shared/IconComponent';
import ButtonComponent from '../../components/Shared/ButtonComponent';
import PoweredBY from '../../components/Shared/PoweredBy';
import {removeData} from '../../helpers/utils';
import {removeUser} from '../../store/actions';
import {getVersion} from 'react-native-device-info';
import {AppAuthConfig} from '../../config/B2C';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountList: [
        {
          name: 'Alfred Information',
          lists: [
            {
              name: 'Points Activity',
              route: '',
            },
            {
              name: 'Personal Information',
              route: 'PersonalInformation',
            },
            {
              name: 'Member Benefits',
              route: 'MemberBenefits',
            },
            {
              name: 'Alfred Card',
              route: '',
            },
          ],
        },
        {
          name: 'Preferences',
          lists: [
            {
              name: 'Feedback',
              route: 'Feedback',
            },
            {
              name: 'Favourites',
              route: 'Favorites',
            },
            {
              name: 'Dream Hotel Benefits',
              route: '',
            },
            {
              name: 'Room Preferences',
              route: 'Preferences',
            },
            {
              name: 'Security',
              route: 'Security',
            },
          ],
        },
        {
          name: 'About',
          lists: [
            {
              name: 'Legal',
              route: '',
            },
            {
              name: 'Version',
              route: '',
            },
          ],
        },
      ],
    };
  }

  logout = async () => {
    const {current_user, removeUser} = this.props;
    // switch (current_user.providerId) {
    //   case 'facebook.com':
    //     LoginManager.logOut();
    //     break;
    //   default:
    //     RNTwitterSignIn.logOut();
    // }
    // auth()
    //   .signOut()
    //   .then(() => console.log('User signed out!'));
    // removeData(AppVariables.USER);
    // removeUser();
    try {
      await revoke(AppAuthConfig, {
        tokenToRevoke: current_user.accessToken,
        sendClientId: true,
      });
      this.setState(
        {
          accessToken: null,
        },
        () => {
          removeData(AppVariables.USER);
          removeUser();
        },
      );
      // this.animateState({
      //   accessToken: "",
      //   accessTokenExpirationDate: "",
      //   refreshToken: "",
      // });
    } catch (error) {
      Alert.alert('Failed to revoke token', error.message);
    }
  };

  renderList = () => {
    const {accountList} = this.state;
    return accountList.map((list, i) => (
      <View style={{paddingBottom: 10}} key={i}>
        <TextComponent
          style={{fontSize: 15, paddingBottom: 10}}
          type={FontType.BOLD}>
          {list.name}
        </TextComponent>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.accordionBorderColor,
            borderRadius: 5,
            paddingBottom: 10,
          }}>
          {list.lists.map((list, i) => (
            // <TouchableNativeFeedback
            //   key={i}
            //   onPress={() =>
            //     list.route && this.props.navigation.navigate(list.route)
            //   }>
            <TouchableOpacity
              activeOpacity={0.8}
              key={i}
              onPress={() =>
                list.route && this.props.navigation.navigate(list.route)
              }
              style={{flex: 1}}
              key={i}>
              <View
                style={{
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  // paddingHorizontal: 15,
                  paddingVertical: 15,
                  //   backgroundColor: 'green',
                  flex: 1,
                }}>
                <TextComponent style={{fontSize: 13}}>
                  {`${list.name} ${list.name === 'Version' && getVersion()}`}
                </TextComponent>
                <IconComponent type={IconType.AntDesign} name="right" />
              </View>
              <View
                style={{
                  position: 'absolute',
                  height: 1,
                  backgroundColor: Colors.accordionBorderColor,
                  alignSelf: 'center',
                  width: '96%',
                  left: '2%',
                  bottom: 0,
                }}></View>
            </TouchableOpacity>
            // </TouchableNativeFeedback>
          ))}
        </View>
      </View>
    ));
  };
  render() {
    return (
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 15,
          paddingTop: 10,
          backgroundColor: Colors.white,
          paddingBottom: 60,
        }}>
        {this.renderList()}
        <ButtonComponent
          onPress={this.logout}
          borderRadius={50}
          style={{
            backgroundColor: Colors.themeBlack,
            width: '30%',
            fontSize: 13,
            // height: 40,
            color: Colors.white,
            elevation: 0,
            alignSelf: 'center',
          }}>
          Log Out
        </ButtonComponent>
        <View style={{paddingBottom: 15}}>
          <PoweredBY />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({user: {current_user}}) => {
  return {
    current_user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeUser: () => dispatch(removeUser()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Account);
