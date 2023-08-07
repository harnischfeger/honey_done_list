import React, {FunctionComponent, useEffect, useMemo, useState} from "react"; 
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import topBackground from "../assets/HDListlogo.png";  
import NewsFeedItem from "../components/NewsFeedItem";
import { StyleSheet,Image, View, Text, Modal, SafeAreaView, Button, Pressable, TouchableOpacity} from "react-native";
import * as SQLite from 'expo-sqlite';
import CalendarItem from "../components/CalendarItem";
import { colors } from "../components/colors";
import closeIcon from "../assets/close.png"; 
import addNew from "../assets/addNew.png"; 
import { RouteProp, useRoute } from "@react-navigation/native";



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
width:100%; 
height: 100%; 
`; 

const TopSection = styled.ImageBackground`
width: 100%; 
height: 100%; 
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
flex-direction: row;
justifyContent: space-between;
align-items: center; 
`; 

const ButtonText = styled.Text` 
font-family: GelasioReg;
font-size: 20px;
color: ${colors.textColor}; 
textAlign: center; 
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
    const marked = daysObject;

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

        
    }
    useEffect(() => {
      getTasks(); 
    }, []); 

    useEffect(() => {
      if(updateData){
      getTasks(); 
      setUpdateData(false);
      }
    }, [updateData]);

    useEffect(() => { 
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
      props.navigation.navigate('AddTask', {comeFrom: "CalendarView"})
    }

    return(
        <SafeAreaView style={{flex: 1}}>
        <StatusBar style="light"></StatusBar>

        <CalendarViewContainer>
            <TopSection source={topBackground} resizeMode="contain"></TopSection>
            <BottomSection>
            <ButtonView>
                <View style={{width: 210, height:55, borderColor: colors.textColor, borderWidth: 2, borderRadius:2}}>
            <TouchableOpacity
              style={{ margin: 5,borderColor: colors.textColor,width:195, height:40,
                borderWidth: 2, borderStyle: 'dotted', alignSelf:"center"}}
              onPress={()=>props.navigation.navigate('LandingPage', {refresh: refresh})}>
                <ButtonText>NEWS FEED</ButtonText>
            </TouchableOpacity>
            </View>
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