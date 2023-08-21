import React, { useEffect, useState } from "react";
import {Button, Text, View} from "react-native"; 
import styled from "styled-components/native";
import * as MailComposer from "expo-mail-composer"; 
import { TextInput } from "react-native-gesture-handler";

const TextSection = styled.View`
width: 100%; 
padding: 5px; 
flex:1; 
`;

const TitleText = styled.Text`
padding-top: 10px;
font-family: GelasioReg;
font-size: 36px; 
text-align: center; 
width:100%; 
`;

const AboutText = styled.Text`
padding: 40px; 
font-family: GelasioReg;
font-size: 16px;
text-align: justify
`;

const EmailInput = styled(TextInput)`
font-family: GelasioReg;
font-size: 18px;
width:100%; 
maxWidth: 800px;
borderWidth: 1px;
borderRadius: 5px;  
textAlign: center;
height: 45px; 
paddingBottom: 5px; 
marginBottom: 20px; 
`;

const Recommend = () => {
const [isAvailable, setIsAvailable] = useState(false)
const [recipients, setRecipients]= useState<any>([]); 
const [email, setEmail] = useState(""); 


useEffect(() =>{
async function checkAvailablity() {
    const isMailAvailable = await MailComposer.isAvailableAsync(); 
    setIsAvailable(isMailAvailable); 
}
    checkAvailablity(); 
   
},[])

const sendMail = () =>{

    MailComposer.composeAsync({
        subject:"Feeback or Issue reported",
        body:"Share your feedback/issue below:",
        isHtml: true,
        recipients: ['honeydone94@gmail.com'],
    });
}; 
    return (
<>
<TextSection>
    <TitleText>Share feedback/Report an Issue</TitleText>
    <AboutText>
      Click the button below to share feedback or report an issue.
      {'\n'}
      {'\n'}
      We do not store, sell or collect any emails or other personal information.

</AboutText>
    <View style={{width:200, alignSelf:'center'}}>

      {isAvailable ? <Button title="Send Mail" onPress={sendMail}/> : <Text>Email not avaialble</Text>}
      </View>
</TextSection>
</>
    );
}
export default Recommend