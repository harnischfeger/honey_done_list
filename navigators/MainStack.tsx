import React, {FunctionComponent} from "react";
import LandingPage from "./../screens/LandingPage"; 
import EditTask from "../screens/EditTask";
import AddTask from "../screens/AddTask";
import CalendarView from "../screens/CalendarView"; 
import EditRecurringTask from "../screens/EditRecurringTask"; 
import SearchPage from "../screens/SearchPage";
import DrawerStack from "../navigators/DrawerStack"; 
//nativation 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";


export type MainstackParamList = {
 LandingPage: undefined; 
 EditTask:undefined; 
 AddTask: undefined; 
 CalendarView: undefined; 
 EditRecurringTask: undefined;
 SearchPage: undefined; 
 DrawerStack: undefined; 
 About:undefined;
}; 

const Stack = createStackNavigator<MainstackParamList>(); 

const MainStack = () => {
    return (
            <Stack.Navigator initialRouteName="LandingPage"
            screenOptions={{headerShown: false}}>
                <Stack.Screen
                name="DrawerStack"
                component={DrawerStack}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="EditTask"
                component={EditTask}
                options={{headerShown: false}}
                />
                  <Stack.Screen 
                name="EditRecurringTask"
                component={EditRecurringTask}
                options={{headerShown: false}}
                />
                <Stack.Screen 
                name="SearchPage"
                component={SearchPage}
                options={{headerShown: false}}
                />
                  <Stack.Screen 
                name="AddTask"
                component={AddTask}
                options={{headerShown: false}}
                />

                {/* <Stack.Screen 
                name="CalendarView"
                component={CalendarView}
                options={{headerShown: false}}
                /> */}
          
          </Stack.Navigator>  
    );
}
export default MainStack