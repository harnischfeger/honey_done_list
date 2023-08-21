import React from "react";
import {Text,Image} from "react-native"; 
import styled from "styled-components/native";
import addNew from "../../assets/addNew.png"; 
import search from "../../assets/search.png"; 
import snooze from "../../assets/icons8-snooze-80.png";
import done from "../../assets/icons8-checkmark-80.png";
import editIcon from "../../assets/edit.png";

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
padding: 25px; 
font-family: GelasioReg;
font-size: 16px;
`;

const HowTo = () => {
    return (
<>
<TextSection>
    <TitleText>How to Use this App</TitleText>
    <AboutText>
        <Text>Select the <Image source={addNew} style={{ width:50, height:50}}/> to add a new task{'\n'}{'\n'}</Text>
        <Text>Select the <Image source={search} style={{ width:50, height:50}}/> to search existing tasks{'\n'}{'\n'}</Text>
        <Text>Select the <Image source={snooze} style={{ width:50, height:50}}/> to snooze a task for ten days{'\n'}{'\n'}</Text>
        <Text>Select the <Image source={done} style={{ width:50, height:50}}/> to mark the task as complete{'\n'}{'\n'}</Text>
        <Text>Select the <Image source={editIcon} style={{ width:50, height:50}}/> to edit the task{'\n'}{'\n'}</Text>
    </AboutText>
</TextSection>
</>
    );
}
export default HowTo