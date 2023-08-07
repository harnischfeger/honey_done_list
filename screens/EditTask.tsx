import React, {FunctionComponent, useEffect, useMemo, useState} from "react";
import { StatusBar } from "expo-status-bar";
import {colors} from "../components/colors"; 
import {StyleSheet, View, Text, TextInput, Image, Pressable,KeyboardAvoidingView} from "react-native";
import styled from "styled-components/native";
import {Formik, FormikProps} from "formik"; 
import * as Yup from 'yup'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import clipboard from "../assets/clipboard.png"; 
import cancel from "../assets/cancel.png";
import deleteTask from "../assets/delete-red.png"; 

import { Dropdown} from 'react-native-element-dropdown';
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { Container, ScreenWidth } from "../components/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import catData from '../ConstJsonData/CategoryData.json'; 
import * as SQLite from 'expo-sqlite';
import CalendarItem from "../components/CalendarItem";
import save from "../assets/save.png"; 

const db = SQLite.openDatabase("honeyDatabase.db");


interface NavProps{
  navigation : any;
}

interface EditProps{
  id: string; 
  title: string; 
  type: string;
  date: string; 
  }


const BGContainer = styled(Container)`
justify-content: space-between;
width:100%; 
height: 100%; 
flex: 1;
`; 

const EditContainer= styled.View`
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
marginTop: 10px; 
marginLeft: 20px; 
marginRight: 10px; 
margin-bottom: 10px; 
`;

const EditInput = styled(TextInput)`
font-family: GelasioReg;
font-size: 18px;
width:100%; 
maxWidth: 800px;
color:  ${colors.textColor}; 
borderColor: ${colors.textColor};
borderWidth: 1px; 
textAlign: center;
height: 45px; 
paddingBottom: 5px; 
`;

const Title = styled.Text`
font-family: GelasioReg;
font-size: 36px; 
text-align: center; 
color: ${colors.textColor}; 
width:100%; 
`;

const CalendarContainer = styled.View`
width: 100%; 
padding: 25px; 
`;


const EditSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  date: Yup.string().required("Required")
});

const EditTask: FunctionComponent<NavProps> = (_props) => {
  const [isRefresh, setIsRefresh] = useState(false);
  let route: RouteProp<{params: {taskProps: any}}, 'params'> = useRoute();
  let taskProps = route.params?.taskProps;
  let origin = route.params?.taskProps.comeFrom; 
  const navigation = useNavigation();
  const [selected, setSelected] = useState(taskProps.date);
  const [isFocus, setIsFocus] = useState(false);
  const [error, setError] = useState(''); 
  const task ={
    id:taskProps.id,
    title:taskProps.title,
    type:taskProps.type, 
    date:taskProps.date
    };

  const cancelChange = () =>{
    if( origin === "CalendarView"){
      _props.navigation.navigate('CalendarView', {refresh: isRefresh}); 
      }
      if (origin === "News"){
        _props.navigation.navigate('LandingPage', {refresh: isRefresh}); 
      }
  }
  const deleteSelectedTask = () =>{
    try{
      db.transaction(tx => {
        tx.executeSql('DELETE from tasks where id = ?',[taskProps.id],
    
        (tx, resultSet)=> {
          alert("Task has been successfully deleted!"); 
          setIsRefresh(!isRefresh); 
          if(origin === "CalendarView"){
          _props.navigation.navigate('CalendarView', {refresh: isRefresh}); 
          }
          if (origin === "News"){
            _props.navigation.navigate('LandingPage', {refresh: isRefresh}); 
          }
        },
    
        (tx, error): boolean =>{
          console.log("error" + error); 
          return false; 
        }
      )
    });
    
    }catch(error){
      console.error(error); 
    }
    
    }
  const marked = useMemo(() => ({
    [selected]: {
      customStyles: {
        container: {
          backgroundColor: colors.textColor,
          borderRadius: 20,
        },
        text: {
          color: colors.bgColor,
        }
      }
    }
  }), [selected]);


   return (   
 
        <Formik 
          initialValues={task} 
          enableReinitialize={true}
          validationSchema={EditSchema}
          validateOnBlur={true}
          onSubmit={(values)  => {    
            try{
              db.transaction(tx=>{
                tx.executeSql('Update tasks SET title =?, type=?, date=? where id=?', 
                  [
                    values.title,
                    values.type,
                    values.date,
                    values.id
                  ],
                    (txObj, resultsSet) => {
                        setIsRefresh(!isRefresh); 
                        if(origin === "CalendarView"){
                          alert("Task has been successfully Updated");
                          _props.navigation.navigate('CalendarView', {isRefresh: true}); 
                          }
                          if (origin === "News"){
                            alert("Task has been successfully Updated");
                            _props.navigation.navigate('LandingPage', {isRefresh: true}); 
                          }
                    },
                    (tx, error): boolean =>{
                        console.log(error); 
                        return false; 
                    }
                    )
                });
                alert("Task has been successfully updated!"); 
            }catch(error){
              console.error(error); 
            }
          }}
          > 
              
     {(props: FormikProps<EditProps>) => (

     <BGContainer>
           <StatusBar style="light"></StatusBar>
     <SafeAreaView style={{flex: 1, backgroundColor:"transparent"}}>
     <KeyboardAvoidingView behavior="padding">
     <EditContainer>
     <Pressable
      style={{zIndex: 99, alignSelf: "flex-start", position:'absolute'}}
        onPress={()=>cancelChange()}>
        <Image source={cancel} style={{ width:70, height:70}}/>
      </Pressable>
     <Title>EDIT TASK</Title>
     <View style={{width: ScreenWidth, alignItems: 'center'}}>
      <Image source={clipboard}
      style={{resizeMode:'contain', margin: 10}}
      />
      </View>
      <Pressable
      onPress={() => deleteSelectedTask()}> 
        <Image source={deleteTask} style={{ width:60, height:60}}/>
      </Pressable>
      <Pressable
      onPress={() => props.handleSubmit()}> 
        <Image source={save} style={{ width:60, height:60}}/>
      </Pressable>
    <View style={{width: 360, alignItems: 'center', marginTop: 20}}>
      <EditInput
      value= {props.values.title}
      placeholder="Enter Task Title" 
      placeholderTextColor={colors.textColor}
      onChangeText={props.handleChange("title")}>
      </EditInput>
      <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.title}</Text>

    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.textColor }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        containerStyle={styles.containerStyle}
        data={catData}
        activeColor={colors.activeColor}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Category' : '...'}
        searchPlaceholder="Search..."
        value={props.values.type}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          props.setFieldValue("type", item.value);
        }}
      />
      </View>
  </View>
  <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.type}</Text>

    <CalendarContainer>
        <CalendarItem
          onDayPress={day => {
            setSelected(day.dateString);
            props.setFieldValue("date", day.dateString);
          }}
          markingType="custom"
          markedDates={marked}
        />
         <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.date}</Text>
    </CalendarContainer>
        </EditContainer>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </BGContainer>

   
      )}
        </Formik>
    
  );
};
export default EditTask; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgColor,
    borderColor: colors.textColor,
  },
  dropdown: {
    height:45,
    width: 360, 
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: colors.textColor,
    backgroundColor: colors.bgColor
  },
  placeholderStyle: {
    fontSize: 18,
    color: colors.textColor,
    textAlign:'center',
    fontFamily: 'GelasioReg',
    paddingLeft: 20,
    paddingBottom: 5
  },

  selectedTextStyle: {
    fontSize: 18,
    color: colors.textColor,
    textAlign:'center',
    fontFamily: 'GelasioReg',
    paddingLeft: 20
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    color: colors.textColor,
    backgroundColor: colors.bgColor,
    borderColor: colors.textColor,
    fontFamily: 'GelasioReg'
  },
  containerStyle:{
    backgroundColor: colors.bgColor,
    borderColor: colors.textColor,
    borderWidth: 1, 
  },
  itemTextStyle: {
    flex: 1,
    fontSize: 18,
    color: colors.textColor,
    fontFamily: 'GelasioReg'
  }
});