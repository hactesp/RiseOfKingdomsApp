//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet,Dimensions, FlatList } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

import {fonts,colors} from './../theme/theme';
import Header from './../Components/Header/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { SliderBox } from "react-native-image-slider-box";
import listCommanderVi from './../database/ListCommander';
import listCommanderEpicVi from './../database/ListCommanderEpic';

import listCommanderEn from './../database/ListCommander';
import listCommanderEpicEn from './../database/ListCommanderEpic';
import CardCommanders from './../Components/Items/CardCommander2';
import AppText from './../Components/AppText';
import {LocalizationContext} from './../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';

import ListCommanderEn from '../database/ListCommanderEn';
import { firebase } from '@react-native-firebase/admob';

const imagess =  [
    require("./../../assets/images/events/event2.jpg"),
    require("./../../assets/images/events/event1.jpg"),
    require("./../../assets/images/events/event3.jpg"),
    require("./../../assets/images/events/event4.jpg"),
    require("./../../assets/images/events/event5.jpg")
  ]

const {width} = Dimensions.get('window');
// create a component
const HomeScreen = ({ navigation }) => {
    const {t,locale, setLocale} = React.useContext(LocalizationContext);
    const [listCommander,setListCommander] = useState([]);
    const [listCommanderEpic,setListCommanderEpic] = useState([]);

    useEffect(() => {
        changeDrop();
    },[])
    const changeDrop = () => {
        if(locale == 'vi') {
            setListCommander(listCommanderVi)
            setListCommanderEpic(listCommanderEpicVi)

        }else {
            setListCommander(ListCommanderEn);
            setListCommanderEpic(listCommanderEpicEn)

        }
    }
    return (
        <View style={styles.container}>
           <Header navigation={navigation} ></Header>
                <ScrollView style={{width : '100%'}}>
                <View style={{height : 200}}>
                    <SliderBox images={imagess} 
                    autoplay
                    circleLoop
                    dotColor="orange"
                    resizeMethod={'resize'}
                    resizeMode={'cover'} />
                </View>

                <View style={{width : '100%', alignItems : 'flex-start', paddingHorizontal : '5%',paddingVertical : 30, flexDirection : 'row'}}>
                    <IconFA5 name='chess-king' size={21} color='orange' ></IconFA5>
                    <AppText i18nKey='chi_huy_huyen_thoai' style={{...styles.textStyle,color : 'orange', marginLeft : 8}}>
                      
                    </AppText>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <FlatList 
                    data={listCommander}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({item, index, separators}) => (
                        <View
                        style={{width : width}}
                            onTouchEndCapture={() => {navigation.navigate('CommanderD',{items : item})}}
                          >
                              <CardCommanders items={item}></CardCommanders>
                        </View>
                      )}
                >

                </FlatList>
                <View style={{flexDirection : 'row', marginTop : 10}}>
                    <AppText i18nKey='vuot_de_xem' style={{fontFamily : fonts.light, fontSize : 10, color : '#FFF'}}>  </AppText>
                    <Icon name='page-next-outline' size={13} color={'#FFF'}></Icon>
                </View>
                </View>

                <View style={{width : '100%', alignItems : 'flex-start', paddingHorizontal : '5%',paddingVertical : 30, flexDirection : 'row'}}>
                    <IconFA5 name='chess-queen' size={21} color='#ae52d4' ></IconFA5>
                    <AppText i18nKey='chi_huy_anh_hung' style={{...styles.textStyle,color : '#ae52d4', marginLeft : 8}}>
                       
                    </AppText>
                </View>
                <View style={{justifyContent : 'center', alignItems : 'center'}}>
                <FlatList 
                    data={listCommanderEpic}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={item => item.id}
                    renderItem={({item, index, separators}) => (
                        <View
                        style={{width : width}}
                            onTouchEndCapture={() => {navigation.navigate('CommanderD',{items : item,checkEpic : true})}}
                          >
                              <CardCommanders items={item} checkEpic={true}></CardCommanders>
                        </View>
                      )}
                >

                </FlatList>
                <View style={{flexDirection : 'row', marginTop : 10, marginBottom : 20}}>
                    <AppText i18nKey='vuot_de_xem' style={{fontFamily : fonts.light, fontSize : 10, color : '#FFF'}}>  </AppText>
                    <Icon name='page-next-outline' size={13} color={'#FFF'}></Icon>
                </View>
                </View>

                <BannerAd
                    unitId='ca-app-pub-7033028927124341/5474292886'
                    size={BannerAdSize.FULL_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                    onAdLoaded={() => {
                        console.log('Advert loaded');
                    }}
                    onAdFailedToLoad={(error) => {
                       console.log(error);
                                               
                    }}
                    />
                
                </ScrollView>
                
               

        
            
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width : '100%',
        height : '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
       backgroundColor : colors.MainColor,
      
    },
    textStyle :{
        fontFamily : fonts.black,
        fontSize : 20,
        
    }
});

//make this component available to the app
export default HomeScreen;