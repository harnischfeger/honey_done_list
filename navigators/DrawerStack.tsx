import React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer"
import CustomDrawer from "../components/CustomDrawer"; 
import LandingPage from "../screens/LandingPage";
import About from "./drawerScreens/About";
import HowTo from "./drawerScreens/HowTo";
import Recommend from "./drawerScreens/Recommend";
import Support from "./drawerScreens/Support"; 
import TermsConditions from "./drawerScreens/TermsConditions"; 
import { MainstackParamList } from "./MainStack";
import CalendarView from "../screens/CalendarView";
import { colors } from "../components/colors";
import {Image} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons'; 

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
                headerStyle:{backgroundColor:colors.bgColor, height:10},
                headerTintColor: colors.textColor,
                headerShadowVisible:false,
                title:"Home",
                headerTitle:"",
                drawerIcon: ({}) => (
                    <Ionicons name="md-home-outline" size={22} color={colors.bgColor} />
                  )
                }}/>
        <Drawer.Screen
            name="About"
            component={About}
            options={{
                headerShown: true,
                headerTitleAlign: 'center',
                drawerIcon: ({}) => (
                    <AntDesign name="setting" size={24} color={colors.bgColor} />
                  )
                }}    
        />

        <Drawer.Screen
            name="HowTo"
            component={HowTo}
            options={{
                headerShown: true,
                headerTitleAlign: 'center',
                title:"How To",
                drawerIcon: ({}) => (
                    <Ionicons name="information" size={24} color={colors.bgColor} />
                  )
                }}    
        />

            <Drawer.Screen
                name="Recommend"
                component={Recommend}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    title:"Refer a Friend",
                    drawerIcon: ({}) => (
                        <FontAwesome name="handshake-o" size={18} color={colors.bgColor}/>
                    )
                    }}    
                    />
                         <Drawer.Screen
                name="Support"
                component={Support}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    title:"Support",
                    drawerIcon: ({}) => (
                        <AntDesign name="Safety" size={24} color={colors.bgColor} />
                    )
                    }}    
                    />
                        <Drawer.Screen
                name="TermsConditions"
                component={TermsConditions}
                options={{
                    headerShown: true,
                    headerTitleAlign: 'center',
                    title:"Terms & Privacy",
                    drawerIcon: ({}) => (
                        <AntDesign name="pushpino" size={24} color={colors.bgColor} />
                    )
                    }}    
                    />
           <Drawer.Screen 
                name="CalendarView"
                component={CalendarView}
                options={{
                    headerShown: true,
                    headerStyle:{backgroundColor:colors.bgColor, height:10},
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