import React, {FunctionComponent, useEffect, useRef, useState} from "react"; 
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import topBackground from "../assets/HDListlogo.png";  
import NewsFeedItem from "../components/NewsFeedItem";
import {Image, Pressable, TouchableOpacity, View, Text, SafeAreaView, ActivityIndicator} from "react-native";
import * as SQLite from 'expo-sqlite';
import addNew from "../assets/addNew.png"; 
import search from "../assets/search.png"; 
import { colors } from "../components/colors";
import { DrawerActions, RouteProp, useRoute } from "@react-navigation/native";
import * as Notifications from 'expo-notifications'; 
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';


const db = SQLite.openDatabase("honeyDatabase.db");
//const adUnitid = 'ca-app-pub-3100142748400399/2823585482';
//const adUnitid = TestIds.INTERSTITIAL;

Notifications.setNotificationHandler({
  handleNotification:async()=> ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

interface NavProps{
    navigation : any;   
}


const LandingPageContainer = styled(Container)`
justify-content: space-between;
width:100%; 
height: 100%; 
`; 

const TopSection = styled.ImageBackground`
width: 100%; 
flex:1; 
`; 

const BottomSection = styled.View`
width: 100%; 
padding: 5px; 
flex:1; 
`;

const ButtonView = styled.View`
padding-left: 25px; 
padding-right: 20px; 
width: 100%; 
flex-direction: row;
justifyContent: space-between;
align-items: center; 
`; 

const ButtonText = styled.Text` 
font-family: GelasioReg;
font-size: 20px;
color: ${colors.textColor}; 
textAlign: center; 
paddingTop:2px;
`;

const TaskList = styled.FlatList`
margin-top: 10px; 
width: 100%;
flex:1; 
`;

// const interstitial = InterstitialAd.createForAdRequest(adUnitid, {
//   requestNonPersonalizedAdsOnly: true
// });

const LandingPage: FunctionComponent<NavProps> = (_props) =>{
  let route: RouteProp<{params: {refresh: boolean}}, 'params'> = useRoute();
  let refresh = route.params?.refresh; 
  let count= 0; 
  //push notifications
  const [notification, setNotification] = useState(
    {} as Notifications.Notification
  );
  const notificationListener = useRef<Notifications.Subscription | undefined>();
  const responseListener = useRef<Notifications.Subscription | undefined>();
  const todaysDate = new Date().toLocaleDateString("en-CA");

  //const [interstitialLoaded, setInterstitialLoaded] = useState(false); 

  const [dataSet, setDataSet] = useState(); 
  const [cameFrom] = useState("News")
  const [updateData, setUpdateData] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  // const loadinterstitial = ()=>{
  //   const unsubscribeLoaded = interstitial.addAdEventListener(
  //     AdEventType.LOADED, ()=>{
  //       setInterstitialLoaded(true);
  //     }
  //   ); 
  //   const unsubscribeClosed = interstitial.addAdEventListener(
  //     AdEventType.CLOSED, ()=>{
  //       setInterstitialLoaded(false);
  //       interstitial.load(); 
  //     }
  //   ); 
  //   console.log("Load");
  //   interstitial.load(); 
  //   return () => {
  //     unsubscribeClosed();
  //     unsubscribeLoaded(); 
  //   }
  // }

  const getTasks = async () =>{
    await db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS tasks (id integer primary key autoincrement, title text, type text, date text, recurring integer, color text, recurId integer, happens text, every text, days text, iscompleted integer);",[],
      );
    });
    await db.transaction(tx => {
      tx.executeSql("SELECT * from tasks where date between date('now', '-7 days') and date('now', '+7 days') AND iscompleted = 0 order by date" ,[],
            (tx, resultSet)=> {
              var rows:any = []; 
                //setDataSet(resultSet);
                for (let i = 0; i <resultSet.rows.length; i++){       
                  rows.push(resultSet.rows.item(i));
                  if(resultSet.rows.item(i).date === todaysDate){
                    ++count; 
                  }
                }
                setDataSet(rows); 
            },
            (tx, error): boolean =>{
              console.log("error" + error); 
              return false; 
            }
          )
      }); 
      setIsLoading(false); 
  }

  useEffect(() => {
    setIsLoading(true); 
    getTasks(); 
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    if (count > 0){
      sendNoti(); 
    }

    return () => {
      if (notificationListener.current?.remove) {
        notificationListener.current.remove();
      }
      if (responseListener.current?.remove) {
        responseListener.current.remove();
      }
    };
  }, []); 

  // useEffect(()=>{
  //   const unsubscribeInterstitialEvents = loadinterstitial();  
  //   return unsubscribeInterstitialEvents; 
  // }, []);

  useEffect(() => {
    if(updateData){
    setIsLoading(true); 
    getTasks(); 
    setUpdateData(false);
    }
  }, [updateData]);

  useEffect(() => {
    setIsLoading(true); 
    getTasks(); 
  }, [route.params?.refresh]); 

  function changeState(){
    setUpdateData(true);
  };

  function addTask(){
    //interstitial.show(); 
    _props.navigation.navigate('AddTask', {comeFrom: "News"})
  }
  function searchTask(){
    _props.navigation.navigate('SearchPage', {comeFrom: "News"})
  }

  const sendNoti = async () =>{
    await Notifications.scheduleNotificationAsync({
      content:{
        title: "New Task Due Today",
        body:"Open Honey Done List to check out your tasks"
      },
      trigger: {
        hour:9,
        minute:0
      }
    });
  }

  if(isLoading){
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size={"large"} color="#5500dc"/>
        </View>
    );
  }
    return(

      <SafeAreaView style={{flex: 1, backgroundColor:"transparent"}}>
        <StatusBar style="light"></StatusBar>
 
        <LandingPageContainer>
          {/* <TouchableOpacity onPress={sendNoti}><Text style={{color:colors.white}}>Click Me for push notification</Text></TouchableOpacity> */}
            <TopSection source={topBackground} resizeMode="contain"></TopSection>
            <BottomSection>
              <ButtonView>
                <View style={{width: 190, height:63, borderColor: colors.textColor, borderWidth: 2, borderRadius:2}}>
            <TouchableOpacity
              style={{ margin: 5,borderColor: colors.textColor,width:175, height:48,
                borderWidth: 2, borderStyle: 'dotted', alignSelf:"center"}}
              onPress={()=>_props.navigation.navigate('CalendarView')}>
                <ButtonText>CALENDAR</ButtonText>
            </TouchableOpacity>
            </View>
            <Pressable
              onPress={()=>searchTask()}>
              <Image source={search} style={{ width:65, height:65, alignSelf: "center"}}/>
            </Pressable>
            <Pressable
              onPress={()=>addTask()}>
              <Image source={addNew} style={{ width:70, height:70, alignSelf: "center"}}/>
            </Pressable>
            </ButtonView>
            <TaskList
                data={dataSet}
                extraData={updateData}
                contentContainerStyle={{marginLeft: 25, marginRight:25}}
                keyExtractor={({id}: any) => id}
                renderItem={({item}: any) =>       
                <NewsFeedItem {...item} stateUpdate={changeState} {..._props} cameFrom={cameFrom}/>
            } 
              />
            </BottomSection>

        </LandingPageContainer>
        </SafeAreaView>
    );

};

export default LandingPage; 