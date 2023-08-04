import React, {FunctionComponent, useEffect, useMemo, useState} from "react";
import { StatusBar } from "expo-status-bar";
import Checkbox from 'expo-checkbox';
import {colors} from "../components/colors"; 
import {StyleSheet, View, Text, TextInput, Image, Switch, Pressable, Modal, KeyboardAvoidingView, Platform} from "react-native";
import styled from "styled-components/native";
import {Formik, FormikProps, useFormik} from "formik"; 
import * as Yup from 'yup'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import clipboard from "../assets/clipboard.png"; 
import backArrow from "../assets/backArrow.png"; 
import save from "../assets/save.png"; 
import reset from "../assets/reset.png";

import { ScreenWidth } from "../components/shared"; 
import { Dropdown} from 'react-native-element-dropdown';
import { RouteProp, useRoute } from "@react-navigation/native";
import { Container} from "../components/shared";
import { SafeAreaView } from "react-native-safe-area-context";
import { RRule} from 'rrule';
 
import * as SQLite from 'expo-sqlite';

import CalendarItem from "../components/CalendarItem";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

//const data arrays
import weekDays from '../ConstJsonData/DaysOfWeekData.json';
import catData from '../ConstJsonData/CategoryData.json'; 
import happensData from '../ConstJsonData/HappensData.json';

const db = SQLite.openDatabase("honeyDatabase.db");

interface NavProps{
  navigation : any;
}

interface AddProps{
id: string; 
title: string; 
type: string;
date: string; 
happens: string;
every:string; 
startOn: string; 
endOn: string; 
isEnabled: boolean; 
isChecked: boolean; 
days: string;
}



const BGContainer = styled(Container)`
justify-content: space-between;
width:100%; 
height: 90%; 

`; 

const ButtonView = styled.View`
width: 100%; 
flex-direction: row;
justifyContent: space-between;
align-items: center; 
`; 

const AddContainer= styled.View`
flexDirection: row;
flexWrap: wrap;
justifyContent: space-around;
align-items: center;
marginLeft: 20px; 
marginRight: 10px; 
margin-bottom: 10px; 
`;

const AddInput = styled(TextInput)`
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
padding: 20px; 
`;
const ToggleContainer = styled.View`
flexDirection: row;
flexWrap: wrap;
align-items: center;
justifyContent: center;
marginBottom:5px;
marginTop: 10px; 
`;

const WeekContainer = styled.View`
flexWrap: wrap; 
gap: 10px;
flexDirection: row;
align-items: center;
justifyContent: center;
marginBottom:15px;
width: 350px; 
marginRight: 10px;

`;
const WeekBackgroundRow = styled.View`
background-color: ${colors.inputBG};
justifyContent: center;
align-items: center; 
width: 50px; 
height: 45px;
border-radius: 5px;
marginLeft: 20px;  
`;

const WeekTitle = styled.Text`
color: ${colors.bgColor}; 
font-family: GelasioReg;
font-size: 20px;
`;

const LeftText = styled.Text`
color: ${colors.textColor}; 
font-size: 18px; 
textAlign: left; 
`;

const AddSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    type: Yup.string().required("Required"),
    isEnabled: Yup.boolean(),
    date: Yup.string().when('isEnabled', {
      is: false,
      then: () => Yup.string().required("Required"),
      otherwise: () => Yup.string().notRequired()
      }),
    happens: Yup.string().when('isEnabled', {
    is: true,
    then: () => Yup.string().required("Required"),
    otherwise: () => Yup.string().notRequired()
    }),
    every: Yup.string().when('isEnabled', {
      is: true,
      then: () => Yup.string().required("Required"),
      otherwise: () => Yup.string().notRequired()
      }),
    startOn: Yup.string().when('isEnabled', {
      is: true,
      then: () => Yup.string().required("Required"),
      otherwise: () => Yup.string().notRequired()
      }),
    endOn: Yup.string().when(['isEnabled', 'isChecked'], {
      is: (isEnabled: boolean, isChecked: boolean) => isEnabled==true  && isChecked == false,
      then: () => Yup.string().required("Required"),
      otherwise: () => Yup.string().notRequired()
      }),
   
});

const AddTask: FunctionComponent<NavProps> = (_props) => {
  const [isRefresh, setIsRefresh] = useState(false);
  let route: RouteProp<{params: {comeFrom:string}}, 'params'> = useRoute();
  const origin = route.params?.comeFrom;
  //dropdown focus
  const [isFocus, setIsFocus] = useState(false);
  const [isFocusHappens, setIsFocusHappens] = useState(false);
  //switch and toggles
  const [onEndDisabled, setOnEndDisabled] = useState(false);
  const [showStart, setShowStart] = useState(false); 
  const [showEnd, setShowEnd] = useState(false); 

  const [error, setError] = useState('');
  const initDate = new Date().toLocaleDateString("en-CA");
  //for recurring date rrule set
  const [daysOfWeek] = useState(weekDays);
  const [isSelectedDay, setIsSelectedDay] = useState<number[]>([]); 
  // const [recurringDates, setRecurringDates] = useState<string[]>([]); 
  //calendar values set for form
  const [selected, setSelected] = useState("");
  const [selectedStart, setSelectedStart] = useState(""); 
  const [selectedEnd, setSelectedEnd] = useState(""); 


useEffect(() => {
}, []); 

const rruleDates = async(values: { every: string; startOn: string; endOn: string; isChecked: boolean}) => {
  const d = new Date();
  var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();  
  var dateStart= new Date(values.startOn + " " + time);
  var dateEnd= new Date(values.endOn + " " + time);
  if(values.isChecked == true){
    dateEnd.setFullYear(d.getFullYear() + 5); 
    console.log(dateEnd);
  }
    const rule = new RRule({
      freq: RRule.WEEKLY,
      byweekday: isSelectedDay, 
      interval:  parseInt(values.every),
      dtstart: dateStart,
      until: dateEnd
    })
  var dateArray = rule.all(); 
  let newDateArray = dateArray.map((item)=>
  item.toLocaleDateString("en-CA")
  ); 
  return newDateArray; 
}

const backArrowClick = () =>{

  if(origin === "CalendarView"){
  _props.navigation.navigate('CalendarView', {refresh: isRefresh}); 
  }
  if (origin === "News"){
    _props.navigation.navigate('LandingPage', {refresh: isRefresh}); 
  }
}
const dropSubmit = () =>{
console.log("G ot Here");
    db.transaction(tx => {
        tx.executeSql('DROP TABLE tasks; DELETE FROM SQLITE_SEQUENCE WHERE NAME = tasks',[],

        (tx, resultSet)=> {
        console.log("Dropped"); 
        },
  
        (tx, error): boolean =>{
          console.log("error" + error); 
          return false; 
      }
      )
    });
}
const toggleStart = () => {
setShowStart(!showStart); 
};

const toggleEnd = () => {
  setShowEnd(!showEnd); 
};

const dayOfWeekPress = (item: { id: number; title: string; isSelected: boolean; }) => {
item.isSelected = !item.isSelected; 
  if(item.isSelected !== true){
    setIsSelectedDay((isSelectedDay) => isSelectedDay.filter((itemId) => itemId !== item.id)); 
  }else{
    setIsSelectedDay(oldDayArray => [...oldDayArray, item.id]); 
  }
};

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

const markedStart = useMemo(() => ({
  [selectedStart]: {
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
}), [selectedStart]);

const markedEnd = useMemo(() => ({
  [selectedEnd]: {
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
}), [selectedEnd]);

  const values ={
  id:"",
  title:"",
  type:"", 
  date:"",
  happens:"",
  every:"",
  startOn: "",
  endOn:"",
  isEnabled: false,
  isChecked: false,
  days: ""
  };

  
const resetClick = () => {
  values.id = ""; 
  values.title = ""; 
  values.type = ""; 
  values.date = ""; 
  values.every = ""; 
  values.happens = ""; 
  values.startOn = ""; 
  values.endOn = ""; 
  values.isChecked = false; 
  values.isEnabled = false;
  values.days = ""; 
   setSelected(""); 
   setSelectedStart(""); 
   setSelectedEnd(""); 
 }
   return (   

        <Formik 
          initialValues={values} 
          enableReinitialize={true}
          validationSchema={AddSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={async (values, {resetForm})  => { 
            values.days = isSelectedDay.toString();
            if (values.isEnabled == true){ 
              try{
              const recurringDates = await rruleDates(values); 
              let recurringIdRandom = Math.floor(Math.random() * 50000);
              if(recurringDates.length > 0){
                for(let i=0; i < recurringDates.length; i++){
                 db.transaction(tx=>{
                  tx.executeSql('INSERT INTO tasks (title, type, date, recurring, color, recurId, happens, every, days, iscompleted) values (?,?,?,?,?,?,?,?,?,?)', 
                    [
                      values.title,
                      values.type,
                      recurringDates[i],
                      1,
                      null,
                      recurringIdRandom,
                      values.happens,
                      values.every,
                      values.days,
                      0
                    ],
                      (txObj, resultsSet) => {
                          resetForm();
                          setSelectedStart("");
                          setSelectedEnd("");  
                       
                      
                      },
                      (tx, error): boolean =>{
                          console.log("Error " + error); 
                          return false; 
                      }
                      )
                  });
                }  
                setIsRefresh(!isRefresh); 
                alert("Task has been successfully added!"); 
              }
              }catch(error){
                console.error("Error " + error); 
              }
            }else{
              try{
                db.transaction(tx=>{
                  tx.executeSql('INSERT INTO tasks (title, type, date, recurring, color, recurId, days, iscompleted) values (?,?,?,?,?,?,?,?)', 
                    [
                      values.title,
                      values.type, 
                      values.date,
                      0,
                      null,
                      null,
                      null,
                      0
                    ],
                      (txObj, resultsSet) => {
                          console.log("Results", resultsSet.insertId);
                          console.log(resultsSet); 
                          resetForm(); 
                          setSelected(""); 
                          setIsRefresh(!isRefresh); 
                          alert("Task has been successfully added!"); 
                      },
                      (tx, error): boolean =>{
                          console.log("Error " + error); 
                          return false; 
                      }
                      )
                  });

              }catch(error){
                console.error(error); 
              }
            }
          }}
          >          
{(props: FormikProps<AddProps>) => (
  
  <BGContainer> 
    <SafeAreaView style={{flex: 1, backgroundColor:"transparent"}}>
      <StatusBar style="light"></StatusBar>
      <KeyboardAvoidingView    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <AddContainer>
      <Pressable
      style={{zIndex: 99, alignSelf: "flex-start", position:'absolute'}}
        onPress={()=>backArrowClick()}>
        <Image source={backArrow} style={{ width:70, height:70}}/>
      </Pressable>
    <Title>Add TASK</Title>
    <View style={{width: ScreenWidth, alignItems: 'center'}}>
      <Image source={clipboard}
      style={{resizeMode:'contain', margin: 10}}
      />
    </View>
{/* <Button title="add" onPress={() => anotherSubmit()}/> */}
    {/* <Button title="drop" onPress={() => dropSubmit()}/> */}
    <Pressable
      onPress={() => dropSubmit()}> 
        <Image source={reset} style={{ width:60, height:60}}/>
      </Pressable>
    <Pressable
      onPress={() => props.handleSubmit()}> 
        <Image source={save} style={{ width:60, height:60}}/>
      </Pressable>
    <View style={{width: 360, alignItems: 'center', marginTop: 20}}>
      <AddInput
      value= {props.values.title}
      placeholder="Enter Task Title" 
      placeholderTextColor={colors.textColor}
      onChangeText={props.handleChange("title")}>
      </AddInput>
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
  <ToggleContainer>
    <LeftText style={{width:300}}>Repeat</LeftText>
      <Switch
      style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }]}}
      trackColor={{false: '#767577', true: colors.inputBG}}
      thumbColor={props.values.isEnabled ? colors.textColor : '#f4f3f4'}
      ios_backgroundColor="#3e3e3e"
      onValueChange={value => {

        props.setFieldValue("isEnabled", value);
        if(props.values.isEnabled == false){
          props.setFieldValue("happens", ""); 
          props.setFieldValue("every", ""); 
          props.setFieldValue("startOn", ""); 
          props.setFieldValue("endOn", ""); 
          props.setFieldValue("isChecked", false); 
          setOnEndDisabled(false); 
        }
      }}   
      value={props.values.isEnabled}
      />
  </ToggleContainer>

  { !props.values.isEnabled ? (
    <CalendarContainer>
        <CalendarItem
           minDate={initDate}
          onDayPress={day => {
            setSelected(day.dateString);
            props.setFieldValue("date", day.dateString);
          }}
          markingType="custom"
          markedDates={marked}
        />
         <Text style={{textAlign: 'center', color: 'red', display: "flex"}}>{props.errors.date}</Text>
    </CalendarContainer>
  ) :    
<>
  <ToggleContainer>
    <LeftText style={{width: 170, marginBottom: 20, paddingBottom:20}}>Happens</LeftText>
    <View style={styles.rcontainer}>
      <Dropdown
        style={[styles.rdropdown, isFocusHappens && { borderColor: colors.textColor }]}
        placeholderStyle={styles.rplaceholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={styles.itemTextStyle}
        containerStyle={styles.rcontainerStyle}
        data={happensData}
        activeColor={colors.activeColor}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select' : '...'}
        searchPlaceholder="Search..."
        value={props.values.happens}
        onFocus={() => setIsFocusHappens(true)}
        onBlur={() => setIsFocusHappens(false)}
        onChange={item => {
          props.setFieldValue("happens", item.value);
        } } />
      <Text style={{ textAlign: 'center', color: 'red', display: "flex" }}>{props.errors.happens}</Text>
    </View>

  <LeftText style={{width: 80}}>Every</LeftText>
  <AddInput
    style={{width: 80, borderRadius: 0}}
    keyboardType = 'numeric'
    value= {props.values.every}
    placeholderTextColor={colors.textColor}
    onChangeText={props.handleChange("every")}>
  </AddInput>
  <LeftText style={{width: 190, paddingLeft:20, paddingRight:20}}>time(s) a {props.values.happens}</LeftText>
  <Text style={{paddingRight:110, textAlign: 'center', color: 'red', display: "flex" }}>{props.errors.every}</Text>
</ToggleContainer>

  <WeekContainer>
  <LeftText style={{textAlign:'left'}}>On</LeftText>
   {daysOfWeek.map((item: {isSelected: boolean; title: string; id: number; }) =>{
    return(
      <TouchableOpacity  key={item.id}
      onPress={()=>dayOfWeekPress(item)}>
        <WeekBackgroundRow style={{backgroundColor: item.isSelected == true ? colors.textColor : colors.inputBG}}>
          <WeekTitle>{item.title}</WeekTitle>
        </WeekBackgroundRow>
      </TouchableOpacity>
    )
   })}
  </WeekContainer>
<ToggleContainer>
<LeftText style={{ width: 180, marginBottom: 20, marginRight: 20}}>Start On</LeftText>
<Pressable onPress={toggleStart}>
  <AddInput
    style={{ width: 150, borderRadius: 0 }}
    value={props.values.startOn}
    placeholderTextColor={colors.textColor}
    onChangeText={props.handleChange("startOn")}
    editable={false}>   
  </AddInput>
</Pressable>
<Text style={{width: 250, textAlign: 'right', color: 'red', display: "flex" }}>{props.errors.startOn}</Text>
</ToggleContainer>
<ToggleContainer>
  <LeftText style={{width: 100, marginBottom: 20}}>End On</LeftText>
  <Checkbox 
    style={{marginBottom: 20, marginRight: 10, borderRadius: 20, width:30, height:30,  borderColor: colors.textColor}}
    value={props.values.isChecked} 
    onValueChange={value => {
      props.setFieldValue("isChecked", value);
      setOnEndDisabled(!onEndDisabled);  
      if(!props.values.isChecked){
      props.setFieldValue("endOn", "");
      }
    }}
    color={props.values.isChecked ? colors.textColor : undefined} />
  <LeftText style={{marginBottom: 20, width: 50, marginRight:10}}>Never</LeftText>
  <Pressable onPress={toggleEnd}
   disabled={onEndDisabled}>
    <AddInput
      style={{width: 150, borderRadius: 0}}
      value= {props.values.endOn}
      placeholderTextColor={colors.textColor}
      onChangeText={props.handleChange("endOn")}
      editable={false}>
    </AddInput>
    </Pressable>
    <Text style={{width: 250, textAlign: 'right', color: 'red', display: "flex" }}>{props.errors.endOn}</Text>
</ToggleContainer>

<CalendarContainer style={styles.modalContainer}>
  <Modal visible={showStart} transparent={true} animationType="fade">
    <View style={styles.overlay}>
    <CalendarItem 
       minDate={initDate}
      onDayPress={day => {
        setSelectedStart(day.dateString);
        props.setFieldValue("startOn", day.dateString);
        toggleStart(); 
      }}
      markingType="custom"
      markedDates={markedStart}
      {...props}
    />
    </View>
  </Modal>
</CalendarContainer>
<CalendarContainer style={styles.modalContainer}>
  <Modal visible={showEnd} transparent={true} animationType="fade">
    <View style={styles.overlay}>
    <CalendarItem 
       minDate={initDate}
      onDayPress={day => {
        setSelectedEnd(day.dateString);
        props.setFieldValue("endOn", day.dateString);
        toggleEnd(); 
      }}
      markingType="custom"
      markedDates={markedEnd}
      {...props}
    />
    </View>
  </Modal>
</CalendarContainer>
</>    
}
</AddContainer>
</KeyboardAvoidingView>
</SafeAreaView>
</BGContainer>

)}
</Formik>

  );
};
export default AddTask; 

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
  },
  rcontainer: {
    marginLeft: 30,
    justifyContent: 'space-between',
    alignItems: 'center', 
    backgroundColor: colors.bgColor,
    borderColor: colors.textColor,
    marginBottom: 5,
  },
  rplaceholderStyle: {
    fontSize: 18,
    color: colors.textColor,
    textAlign:'center',
    fontFamily: 'GelasioReg',
    paddingLeft: 20,
    paddingBottom:10 
  },
  rdropdown: {
    height:45,
    width: 150, 
    borderWidth: 1,
    paddingHorizontal: 20,
    borderColor: colors.textColor,
    backgroundColor: colors.bgColor,
    
  },
  rcontainerStyle:{
    backgroundColor: colors.bgColor,
    borderColor: colors.textColor,
    borderWidth: 1, 
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
});
