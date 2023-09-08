import React, {FunctionComponent, useEffect, useMemo, useState} from "react"; 
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import topBackground from "../assets/HDListlogo.png";  
import NewsFeedItem from "../components/NewsFeedItem";
import { StyleSheet,Image, View, Text, Modal, SafeAreaView, Button, Pressable, TouchableOpacity, ActivityIndicator} from "react-native";
import * as SQLite from 'expo-sqlite';
import CalendarItem from "../components/CalendarItem";
import { colors } from "../components/colors";
import closeIcon from "../assets/close.png"; 
import addNew from "../assets/addNew.png"; 
import search from "../assets/search.png"; 
import { RouteProp, useRoute } from "@react-navigation/native";
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';

//const adUnitid = 'ca-app-pub-3100142748400399/2823585482';
// const adUnitid = TestIds.INTERSTITIAL;
// const interstitial = InterstitialAd.createForAdRequest(adUnitid, {
//   requestNonPersonalizedAdsOnly: true
// });

const db = SQLite.openDatabase("honeyDatabase.db");


interface NavProps{
    navigation : any;
}

interface MarkedProps{
    selected: boolean;
    marked: boolean; 
    selectedColor: string; 
}

const CalendarViewContainer = styled(Container)`
justify-content: space-between;
width:100%; 
flex:1; 
`; 

const TopSection = styled.ImageBackground`
width: 100%; 
flex:1; 
`; 

const TaskList = styled.FlatList`
margin-top: 10px; 
width: 100%;
flex:1; 
`;

const BottomSection = styled.View`
width: 100%; 
paddingRight: 25px; 
paddingLeft: 25px; 
paddingBottom: 25px; 
`;

const ButtonView = styled.View`
width: 100%; 
marginBottom: 10px;
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

const CalendarView = (props:NavProps) => {
  let route: RouteProp<{params: {refresh: boolean}}, 'params'> = useRoute();
  let refresh = route.params?.refresh; 
    const [cameFrom] = useState("CalendarView")
    const [updateData, setUpdateData] = useState(false); 
    const [listByDay, setListByDay] = useState<any>([]); 
    const [dataSet, setDataSet] = useState<any>([]); 
    const [showList, setShowList] = useState(false); 
    const [daysObject, setDaysObject] = useState({});
    const [isLoading, setIsLoading] = useState(false); 
    const [interstitialLoaded, setInterstitialLoaded] = useState(false); 
    const marked = daysObject;

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
    //   interstitial.load(); 
    //   return () => {
    //     unsubscribeClosed();
    //     unsubscribeLoaded(); 
    //   }
    // }

    const getTasks = () =>{
        db.transaction(tx => {
            tx.executeSql("SELECT * from tasks where iscompleted = 0 order by date" ,[],
              (tx, resultSet)=> {
                var rows:any = []; 
                var newDaysObject = {}; 
                  for (let i = 0; i <resultSet.rows.length; i++){      
                    var dayColor = colors.redBtn
                    rows.push(resultSet.rows.item(i));
                    newDaysObject = {
                        ...newDaysObject,
                        [rows[i].date]: {periods: [{startingDay: true, endingDay: true, color:dayColor}]}
                    }
           
                  }
                  setDataSet(rows); 
                  setDaysObject(newDaysObject);          
              },
              (tx, error): boolean =>{
               console.log("error" + error); 
                return false; 
              }
            )
        }); 
        setIsLoading(false);     
    }

    // useEffect(()=>{
    //   const unsubscribeInterstitialEvents = loadinterstitial();  
    //   return unsubscribeInterstitialEvents; 
    // }, []);

    useEffect(() => {
      setIsLoading(true); 
      getTasks(); 
    }, []); 

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
      setShowList(false);
    };

    function getTasksByDate(day: string): void {
    setShowList(!showList);  
    var arr = []
    for(var d=0; d< dataSet.length; d++){
        if(day === dataSet[d].date){  
            arr.push(dataSet[d]); 
        }  
    };
    setListByDay(arr);
    }
  
    function addTask(){
      //interstitial.show(); 
      props.navigation.navigate('AddTask', {comeFrom: "CalendarView"})
    }
    function searchTask(){
      props.navigation.navigate('SearchPage', {comeFrom: "News"})
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

        <CalendarViewContainer>
            <TopSection source={topBackground} resizeMode="contain"></TopSection>
            <BottomSection>
            <ButtonView>
                <View style={{width: 190, height:63, borderColor: colors.textColor, borderWidth: 2, borderRadius:2}}>
            <TouchableOpacity
              style={{ margin: 5,borderColor: colors.textColor,width:175, height:48,
                borderWidth: 2, borderStyle: 'dotted', alignSelf:"center"}}
              onPress={()=>props.navigation.navigate('LandingPage', {refresh: refresh})}>
                <ButtonText>NEWS FEED</ButtonText>
            </TouchableOpacity>
            </View>
            <Pressable
              onPress={()=>searchTask()}>
              <Image source={search} style={{ width:65, height:65, alignSelf: "center"}}/>
            </Pressable>
            <Pressable style={{width:65}}
              onPress={()=>addTask()}>
              <Image source={addNew} style={{ width:70, height:70}}/>
            </Pressable>
            </ButtonView>
            <CalendarItem
          onDayPress={day => {
            getTasksByDate(day.dateString); 
          }}
          markingType="multi-period"
          markedDates={marked}
        />
<Modal visible={showList} transparent={true} animationType="fade">
    <View style={styles.overlay}>
    <Pressable
        style={{   
            height: 80,
            width: 80,
            alignSelf: 'center',
            backgroundColor: colors.bgColor,
            borderRadius: 40,
            paddingVertical: 17,
            paddingHorizontal: 12}}
        onPress={()=>setShowList(false)}>
              <Image source={closeIcon}
                style={{resizeMode:'contain', width:45, height:45, alignSelf: "center"}}
                />
            </Pressable>
    <TaskList
        data={listByDay}
        contentContainerStyle={{marginLeft: 25, marginRight:25}}
        keyExtractor={({id}: any) => id}
        renderItem={({item}: any) =>   
        <NewsFeedItem {...item} stateUpdate={changeState} {...props} cameFrom={cameFrom}/>
     } 
      />
        </View>
        </Modal>
            </BottomSection>

        </CalendarViewContainer>
        </SafeAreaView>
    );

};

export default CalendarView; 

const styles = StyleSheet.create({
 
    overlay: {
      flex: 1,
      justifyContent: 'center',
      margin: 20,
      backgroundColor: 'rgba(100, 100, 100, 0.4)',
    },
  });