import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import TextComponent from '../components/Shared/TextComponent';
import {Colors} from '../constants/ThemeConstants';
import ImageComponent from '../components/Shared/ImageComponent';
import {Images} from '../assets/images';
import {widthPerc, heightPerc} from '../helpers/styleHelper';
import IconComponent from '../components/Shared/IconComponent';
import {IconType} from '../constants/AppConstants';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import PoweredBY from '../components/Shared/PoweredBy';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
        <View
          style={{
            height: 80,
            backgroundColor: Colors.white,
            width: widthPerc(100),
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 10,
          }}>
          <View
            style={{
              width: widthPerc(60),
              height: 60,
            }}>
            <ImageComponent
              source={Images.LogoDark}
              style={{width: undefined, height: undefined, flex: 1}}
              resizeMode="contain"
            />
          </View>
          <View style={{position: 'absolute', right: '5%'}}>
            <TouchableNativeFeedback style={{padding: 10}}>
              <IconComponent
                type={IconType.Ionicons}
                name="ios-menu"
                style={{fontSize: 30}}
              />
            </TouchableNativeFeedback>
          </View>
        </View>
        <ImageBackground source={Images.Home} style={styles.image}>
          <View style={{flex: 1}}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <View>
                <TextComponent style={{fontSize: 16, color: Colors.white}}>
                  Hi, John
                </TextComponent>
                <TextComponent style={{fontSize: 10, color: Colors.white}}>
                  Alfred Loyality Points 1500
                </TextComponent>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextComponent
                  style={{fontSize: 32, paddingRight: 10, color: Colors.white}}>
                  73°F
                </TextComponent>
                <View>
                  <TextComponent style={{fontSize: 10, color: Colors.white}}>
                    Partly cloudy
                  </TextComponent>
                  <TextComponent style={{fontSize: 10, color: Colors.white}}>
                    Sat, Mar 21
                  </TextComponent>
                  <TextComponent style={{fontSize: 10, color: Colors.white}}>
                    Nashville
                  </TextComponent>
                </View>
              </View>
            </View>
            <TouchableOpacity activeOpacity={1}>
              <View
                style={{
                  backgroundColor: Colors.white,
                  borderRadius: 50,
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}>
                <TextComponent style={{fontSize: 13, color: Colors.searchText}}>
                  Search your Location
                </TextComponent>
                <IconComponent
                  style={{fontSize: 15, color: Colors.searchText}}
                  type={IconType.Feather}
                  name="search"
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{paddingVertical: 10}}>
            <PoweredBY />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
  },
});