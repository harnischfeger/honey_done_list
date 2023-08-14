import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"
import CustomDrawer from "../components/CustomDrawer"; 
import LandingPage from "../screens/LandingPage";
import About from "./drawerScreens/About";
import { MainstackParamList } from "./MainStack";
import CalendarView from "../screens/CalendarView";
import { colors } from "../components/colors";
import {Image} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons'; 

interface NavProps{
    navigation : any;   
}


const DrawerStack = () => {
    const Drawer = createDrawerNavigator<MainstackParamList>()
    return (
        <>
        <Drawer.Navigator
         screenOptions={{
            swipeEdgeWidth: 0,
          }}
          drawerContent={props => <CustomDrawer {...props}/>}
        >
        <Drawer.Screen
            name="LandingPage"
            component={LandingPage}
            options={{
                headerShown: true,
                headerStyle:{backgroundColor:colors.bgColor},
                headerTintColor: colors.textColor,
                headerShadowVisible:false,
                title:"Home",
                headerTitle:"",
                drawerIcon: ({color}) => (
                    <Ionicons name="md-home-outline" size={22} color={colors.bgColor} />
                  )
                }}/>
        <Drawer.Screen
            name="About"
            component={About}
            options={{
                headerShown: true,
                headerTitleAlign: 'center',
                drawerIcon: ({color}) => (
                    <AntDesign name="setting" size={24} color={colors.bgColor} />
                  )
                }}    
        />
           <Drawer.Screen 
                name="CalendarView"
                component={CalendarView}
                options={{
                    headerShown: true,
                    headerStyle:{backgroundColor:colors.bgColor},
                    headerTintColor: colors.textColor,
                    headerShadowVisible:false,
                    drawerItemStyle: { height: 0 },
                    title:""
            
            }}
                />
        </Drawer.Navigator>
        </>
    );
}

export default DrawerStack