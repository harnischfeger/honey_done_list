import React from "react";
import {View, Text, Image} from "react-native"; 
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { colors } from "./colors";

const CalendarItem= (props: any) => {
    return(
   <DrawerContentScrollView {...props}
   contentContainerStyle={{ backgroundColor:colors.bgColor}}>
    <Image 
    source={require('../assets/HDListlogo.png')}
    style={{height:200, width: 200, marginBottom: 10, alignSelf:"center"}}
    />
    <View style={{flex:1, backgroundColor:colors.white, padding:10}}>
    <DrawerItemList {...props}
    style={{backgroundColor:colors.white}}
    />
    </View>
   </DrawerContentScrollView>
    )
};

export default CalendarItem;
