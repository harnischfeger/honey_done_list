import React, { useEffect, useState } from "react";
import {Button, Text, View} from "react-native"; 
import styled from "styled-components/native";
import * as MailComposer from "expo-mail-composer"; 
import { TextInput } from "react-native-gesture-handler";
import topBackground from "../../assets/HDListlogo.png"


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

let insideBody = "I have been enjoying this new app - Honey Done List, and I thought you might too."
+"<br><br>Tired of sticky notes and forgotten to-dos? Honey Done List is here to rescue your productivity and bring"
+" harmony to your home. Say goodbye to chaos and hello to organized bliss with our app designed to simplify your life"
+"<br><br>** Organize Your To-Do List"
+"<br><br>** Built-in Calendar"
+"<br><br>** Smart Reminders"
+"<br><br>** User-Friendly Interface"
+"<br><br>Don't let your honey do list hold you back any longer. Embrace efficiency, organization, and peace of mind with HDL – your dedicated task manager and calendar sidekick."
+ "<br><br>Download it today and experience the joy of a turning that honey do list into a Honey DONE List!"
+ "<br><br>Get Honey Done List now on Google Play for FREE. Please follow the link below to learn more: <br><br>"
+ "https://play.google.com/store/apps/"


useEffect(() =>{
async function checkAvailablity() {
    const isMailAvailable = await MailComposer.isAvailableAsync(); 
    setIsAvailable(isMailAvailable); 
}
    checkAvailablity(); 
   
},[])
const addRecipient = ()=>{
    let newRecipient = [...recipients]; 
    newRecipient.push(email); 
    setRecipients(newRecipient); 
    setEmail(""); 
}
const sendMail = () =>{

    MailComposer.composeAsync({
        subject:"I thought you might enjoy this...",
        body:insideBody,
        isHtml: true,
        recipients: recipients,
    });
    setRecipients([]); 

}; 
    return (
<>
<TextSection>
    <TitleText>Refer a Friend</TitleText>
    <AboutText>
      If you have enjoyed using Honey Done List, your friends will too. Simply imput
      email below and an email will be sent with a link to download.  
      {'\n'}
      {'\n'}
      We do not store, sell or collect any emails or other personal information.

</AboutText>
<View>
    <EmailInput value={email} onChangeText={setEmail} placeholder="Email"></EmailInput>
    <View style={{width:200, alignSelf:'center'}}>
        <View style={{paddingBottom:20}}>
    <Button title="Add Recipient" onPress={addRecipient}/>
    </View>
      {isAvailable ? <Button title="Send Mail" onPress={sendMail}/> : <Text>Email not avaialble</Text>}
      </View>
      </View>
</TextSection>
</>
    );
}
export default Recommend