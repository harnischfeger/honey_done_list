import React, {FunctionComponent} from "react";
import LandingPage from "./../screens/LandingPage"; 
import EditTask from "../screens/EditTask";
import AddTask from "../screens/AddTask";
import CalendarView from "../screens/CalendarView"; 
import EditRecurringTask from "../screens/EditRecurringTask"; 
import SearchPage from "../screens/SearchPage";
//nativation 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";





export type RootstackParamList = {
 LandingPage: undefined; 
 EditTask:undefined; 
 AddTask: undefined; 
 CalendarView: undefined; 
 EditRecurringTask: undefined;
 SearchPage: undefined; 

}; 

const Stack = createStackNavigator(); 

const Rootstack: FunctionComponent = () => {
    return <NavigationContainer>
            <Stack.Navigator initialRouteName="LandingPage"
            screenOptions={{headerShown: false}}>
                <Stack.Screen
                name="LandingPage"
                component={LandingPage}
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

                <Stack.Screen 
                name="CalendarView"
                component={CalendarView}
                options={{headerShown: false}}
                />
          
          </Stack.Navigator>  
    </NavigationContainer>
}
export default Rootstack