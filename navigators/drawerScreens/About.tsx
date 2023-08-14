import React from "react";
import {Text} from "react-native"; 
import styled from "styled-components/native";

const TextSection = styled.View`
width: 100%; 
padding: 5px; 
flex:1; 
`;

const AboutText = styled.Text`
padding: 40px; 
`
const About = () => {
    return (
<>
<TextSection>
    <AboutText>Our Mission

At the heart of our Honey Done List App is a commitment to streamline your 
task management process. We understand that life can get overwhelming at times, 
and staying on top of your to-do list can be a challenge. Our mission is to provide you 
with a user-friendly, intuitive, and feature-rich platform that enables you to prioritize, plan, 
and execute tasks with ease.

Key Features

Task Creation and Organization: Our app allows you to effortlessly create tasks and
set due dates. Say goodbye to sticky notes and scattered to-do lists; with our app, everything is neatly 
organized in one place.

</AboutText>
</TextSection>
</>
    );
}
export default About