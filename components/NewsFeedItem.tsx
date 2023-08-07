import React, {FunctionComponent, useState} from "react";
import { Text, StyleSheet, Image, GestureResponderEvent, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { colors } from "./colors";
import snooze from "../assets/icons8-snooze-80.png";
import done from "../assets/icons8-checkmark-80.png";
import editIcon from "../assets/edit.png";

import * as SQLite from 'expo-sqlite';
import Moment from 'moment';

const db = SQLite.openDatabase("honeyDatabase.db");


import { TouchableOpacity } from "react-native";

const TaskRow = styled.View`
opacity: .5; 
flex-direction: row; 
flex-wrap: wrap;
width: 100%; 
height: 100%;
border-radius: 5px; 
flex:1;
`;
const BackgroundRow = styled.View`
background-color: ${colors.white};
justify-content: space-between; 
align-items: center; 
width: 100%; 
height: 150px;
margin-top: 10px; 
margin-bottom: 10px; 
border-radius: 5px; 
`;

const TaskTitle = styled.Text`
padding-top: 10px; 
padding-right: 15px; 
font-family: GelasioReg;
font-size: 20px;
`;

const TaskMessage = styled.Text`
fontFamily: GelasioReg;
`;



const IconView = styled.View`
margin-left: 15px; 
align-self: center;
width: 100px;
height: 100px;
border-radius: 50px; 
`;

const ActionIcons = styled.View`
margin-top: 10px;
width: 100%; 
flex-direction: row;
padding-right:10px;
`;

const LeftView = styled.View`
flex: 2; 
`; 
const RightView = styled.View`
padding-left: 20px; 
flex:3; 

`; 

const Snooze = styled.TouchableOpacity ``;
const Done = styled.TouchableOpacity ``;
const EditIcon = styled.TouchableOpacity ``;


interface ListProps{
    id: string; 
    title: string; 
    type: string; 
    onPress: ((event: GestureResponderEvent) => void) | undefined; 
    date: string; 
    stateUpdate: ()=> void;
    navigation : any;
    cameFrom: string; 
    iscompleted: boolean; 
    recurring: number; 
    days:string; 
    happens: string;
    every:number; 
    startOn: string; 
    endOn: string; 
    recurId: number;
}
var imageSource: any = ""; 
const NewsFeedItem = (props: ListProps) => {
    const initDate = new Date().toLocaleDateString("en-CA");
    let taskMessage = ""
    if(props.date > initDate){
        taskMessage = "Task is Upcoming " + Moment(props.date).format('dddd'); 
    }
    if (props.date === initDate){
        taskMessage = "Task is Due Today"; 
    }

    if (props.date < initDate){
        taskMessage = "Task is Overdue"; 
    }

    if (props.iscompleted == true){
        taskMessage = "Task is Completed"; 
    }
    function getColor(): import("react-native").ColorValue | undefined {
        let bgColor = ""; 
   //this will change to values as a number 
        if (props.type === "Yardwork"){
            bgColor = colors.yardBG; 
            imageSource = require("../assets/sprinkler.png"); 
            
        }
        if(props.type ==="Appliances"){
            bgColor = colors.applianceBG; 
            imageSource = require("../assets/appliance.png");  
        }
        if(props.type ==="Home"){
            bgColor = colors.homeBG; 
            imageSource = require("../assets/home.png");  
        }

        if(props.type ==="Car"){
            bgColor = colors.carBG; 
            imageSource = require("../assets/car.png");  
        }
        return  bgColor; 
    }

    function snoozeClick(day:string, id: string): void {
        Alert.alert('Snooze Task', 'This will szooze this task for 10 days. Do you wish to proceed?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => submitSnooze(day, id)},
          ]);
    }

    const submitSnooze=(day:string, id: string)=>{
        const d = new Date();
        var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();  
        var date = new Date(day + " " + time); 
        date.setDate(date.getDate() + 10); 
        var newDate = date.toLocaleDateString("en-CA");

        db.transaction((tx: { executeSql: (arg0: string, arg1: any[], arg2: (tx: any, resultSet: any) => void, arg3: (tx: any, error: any) => boolean) => void; }) => {
            tx.executeSql('Update tasks SET date = ? WHERE id = ?', [newDate, id],

            (tx: any, resultSet: any)=> {
                props.stateUpdate(); 
            //alert("This task is szoozed for 10 days until: " + newDate); 
            },
      
            (tx: any, error: string): boolean =>{
              console.log("error" + error);     
              return false; 
          }
          )
          alert("Task has been snoozed for 10 days");
        });

    }

    function doneClick(id:string): void {
        Alert.alert('Complete Task', 'This will mark this task as complete. Do you wish to proceed?', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => submitDone(id)},
          ]);
    }

    const submitDone=(id: string)=> {
        db.transaction((tx: { executeSql: (arg0: string, arg1: any[], arg2: (tx: any, resultSet: any) => void, arg3: (tx: any, error: any) => boolean) => void; }) => {
            tx.executeSql('Update tasks SET iscompleted = ? WHERE id = ?', [1, id],

            (tx: any, resultSet: any)=> {
                props.stateUpdate(); 
                alert("Task has been Completed");
            },
      
            (tx: any, error: string): boolean =>{
              console.log("error" + error);     
              return false; 
          }
          )
       
        });
    }

    function editClick(): void{
        props.stateUpdate();
        let taskProps = {
            "id": props.id,
            "title": props.title,
            "type": props.type, 
            "date": props.date,
            "iscompleted": props.iscompleted, 
            "recurring": props.recurring, 
            "days": props.days,
            "happens": props.happens,
            "every": props.every,
            "comeFrom": props.cameFrom,
            "recurId": props.recurId,
        }
        if(props.recurring == 1){
            Alert.alert('Edit Task', 'Would you like to edit the entire series or just this task?', [
                {
                  text: 'Entire Series',
                  onPress: () =>  props.navigation.navigate('EditRecurringTask', {taskProps: taskProps}),
                },
                {text: 'This Task', onPress: () =>  props.navigation.navigate('EditTask', {taskProps: taskProps})},
              ]);
        }
        else{
        props.navigation.navigate('EditTask', {taskProps: taskProps});
        }
    }

    return(
        <>
      <BackgroundRow>
        <TaskRow style={{backgroundColor: getColor()}}>

            <LeftView>
            <Text style={{alignSelf:'center', marginTop:5, marginLeft:15, fontFamily:'GelasioReg'}}>{props.type.toUpperCase()}</Text>
            <IconView style={{backgroundColor: getColor()}}>
               
                <Image source={imageSource}
                style={{alignSelf: 'center', marginTop:15}}/>
                </IconView>       
            </LeftView>
            <RightView>
  
            <TaskTitle numberOfLines={2}>
                {props.title}
            </TaskTitle>
            <TaskMessage>
            {taskMessage}
            </TaskMessage>
            <ActionIcons style={{justifyContent:'space-between'}}>
            <Snooze onPress={()=>snoozeClick(props.date, props.id)}>
                <Image source={snooze}
                style={{resizeMode:'contain', width:45, height:45}}
                />
            </Snooze>
            <Done onPress={()=>doneClick(props.id)}>
                <Image source={done}
                style={{resizeMode:'contain', width:45, height:45}}
                />
            </Done>
            <EditIcon 
             onPress={()=>editClick()}>
                 <Image source={editIcon}
                style={{resizeMode:'contain', width:45, height:45}}
                />
            </EditIcon>
            </ActionIcons>
            </RightView>
        </TaskRow>

        </BackgroundRow>
        </>
    );
};

export default NewsFeedItem;


