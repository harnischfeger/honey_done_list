import React, {FunctionComponent} from "react";
import LandingPage from "./../screens/LandingPage"; 
import EditTask from "../screens/EditTask";
import AddTask from "../screens/AddTask";
import CalendarView from "../screens/CalendarView"; 
import EditRecurringTask from "../screens/EditRecurringTask"; 
import SearchPage from "../screens/SearchPage";
//nativation 
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./MainStack";
//import { createStackNavigator } from "@react-navigation/stack";


// export type RootstackParamList = {
//  LandingPage: undefined; 
//  EditTask:undefined; 
//  AddTask: undefined; 
//  CalendarView: undefined; 
//  EditRecurringTask: undefined;
//  SearchPage: undefined; 

// }; 

// const Stack = createStackNavigator(); 

const Rootstack = () => {
    return <NavigationContainer>
           <MainStack/>
    </NavigationContainer>
}
export default Rootstack