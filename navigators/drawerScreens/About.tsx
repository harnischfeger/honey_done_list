import React from "react";
import styled from "styled-components/native";

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

const About = () => {
    return (
<>
<TextSection>
    <TitleText>Our Mission</TitleText>
    <AboutText>
        At the heart of the Honey Done List App is a commitment to streamline your 
        to-do-list into one easy to manage place. We understand that life can get overwhelming at times, 
        and staying on top of your to-do list can be a challenge. Our mission is to provide you 
        with a user-friendly, intuitive, and simple platform that enables you to prioritize, plan, 
        and execute tasks with ease.
        {'\n'}
        {'\n'}
        {'\n'}
        Icons by Icons8 - https://Icons8.com
        {'\n'}
        {'\n'}
        Version 1.0.0
        {'\n'}
        {'\n'}
        For more information on how to use this app please refer to the How to Use section.
</AboutText>
</TextSection>
</>
    );
}
export default About