import React, {FunctionComponent, useEffect, useMemo, useState} from "react"; 
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { Container } from "../components/shared";
import NewsFeedItem from "../components/NewsFeedItem";
import { StyleSheet,Image, View, TextInput, Modal, SafeAreaView, Button, Pressable, TouchableOpacity, ActivityIndicator} from "react-native";
import * as SQLite from 'expo-sqlite';
import backArrow from "../assets/backArrow.png"; 
import { RouteProp, useRoute } from "@react-navigation/native";
import {colors} from "../components/colors"; 
import filter from "lodash.filter"; 


const db = SQLite.openDatabase("honeyDatabase.db");

interface NavProps{
    navigation : any;
}

const BGContainer = styled(Container)`
justify-content: space-between;
width:100%; 
`; 

const SearchContainer= styled.View`
flex:1;
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
marginTop: 10px; 
marginLeft: 20px; 
marginRight: 10px; 
margin-bottom: 10px; 
`;

const TaskList = styled.FlatList`
margin-top: 10px; 
width: 100%;
flex:1; 
`;

const ButtonSearchView = styled.View`This
width:100%;
height: 70px;
flexDirection: row; 
justifyContent: space-between;
align-items: center;
marginTop:50px;
`;


const SearchPage = (props:NavProps) => {
    const [isRefresh, setIsRefresh] = useState(false);
    let route: RouteProp<{params: {comeFrom:string}}, 'params'> = useRoute();
    const origin = route.params?.comeFrom;
    const [updateData, setUpdateData] = useState(false); 

    const [dataSet, setDataSet] = useState<any>([]); 
    const [searchQuery, setSearchQuery] = useState(""); 
    const [fullData, setFullData] = useState<any>([]); 
    const [isLoading, setIsLoading] = useState(false); 


    const getTasks = async () =>{
        await db.transaction(async(tx) => {
            await tx.executeSql("SELECT * from tasks order by date" ,[],
              (tx, resultSet)=> {
                var rows:any = []; 
                  for (let i = 0; i <resultSet.rows.length; i++){       
                    rows.push(resultSet.rows.item(i));
                  }
                  setDataSet(rows); 
                  setFullData(rows);
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
    }, []); 

    useEffect(() => {
      if(updateData){
      //getTasks(); 
      setUpdateData(false);
      }
    }, [updateData]);

    // useEffect(() => { 
    //   getTasks(); 
    // }, [route.params?.refresh]); 

    const backArrowClick = () =>{
        setIsRefresh(!isRefresh);
        if(origin === "CalendarView"){
        props.navigation.navigate('CalendarView', {refresh: isRefresh}); 
        }
        if (origin === "News"){
        props.navigation.navigate('LandingPage', {refresh: isRefresh}); 
        }
      }

      const handleSearch = (query:string)=>{
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase(); 
        const filteredData = filter(fullData, (task) =>{
            return contains(task, formattedQuery); 
        });
        setDataSet(filteredData); 
      };

      const contains = ({title, type}: any, query: string) => {
        let taskTitle = title.toLowerCase(); 
        let taskType = type.toLowerCase(); 
        if(taskTitle.includes(query) || taskType.includes(query)){
            return true;
        }
        return false; 
      }

      if(isLoading){
        return(
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={"large"} color="#5500dc"/>
            </View>
        );
      }
      
    function changeState(){
        //setUpdateData(true);
      };
    return(
      
        <SafeAreaView style={{flex: 1}}>
        <StatusBar style="light"></StatusBar>
        <BGContainer> 
        <ButtonSearchView>
        <Pressable
      style={{zIndex: 99, alignSelf: "flex-start"}}
        onPress={()=>backArrowClick()}>
        <Image source={backArrow} style={{ width:70, height:70}}/>
      </Pressable>
                <TextInput style={{
                borderColor: colors.textColor, 
                borderWidth: 1, 
                alignSelf:"center", 
                width: 250,
                paddingHorizontal:20,
                paddingVertical:10,
                borderRadius: 5,
                color: colors.textColor,
                marginLeft: 20,
            }}
                placeholder="Search Title" 
                clearButtonMode="always"
                placeholderTextColor={colors.textColor}
                value={searchQuery}
                onChangeText={(query)=>{handleSearch(query)}}
                ></TextInput>
      
    
      </ButtonSearchView>
            <SearchContainer>
    <TaskList
        data={dataSet}
        contentContainerStyle={{marginLeft: 25, marginRight:25}}
        keyExtractor={({id}: any) => id}
        renderItem={({item}: any) =>   
        <NewsFeedItem {...item} stateUpdate={changeState}  {...props} cameFrom={origin}/>
     } 
      />
</SearchContainer>
</BGContainer> 
        </SafeAreaView>
   
    );

};

export default SearchPage; 

const styles = StyleSheet.create({
 
  });