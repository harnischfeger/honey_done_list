import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import React, {FunctionComponent, useMemo, useState} from "react";
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { colors } from "./colors";
import { MarkedDates, MarkingTypes } from 'react-native-calendars/src/types';

interface CalProps{
    onDayPress: (date: DateData) => void;
    markedDates?: MarkedDates | undefined
    style?:  StyleProp<TextStyle>;
    markingType?:  MarkingTypes | undefined;
    minDate?: string; 
}

const CalendarItem: FunctionComponent<CalProps> = (props) => {
    const initDate = new Date().toLocaleDateString("en-CA");
    return(
        <Calendar
        disableAllTouchEventsForDisabledDays={true}
        style={{
          borderRadius: 10,
          borderWidth: 1,
          borderColor: colors.textColor
        }}
        theme={{
          calendarBackground: colors.bgColor,
          dayTextColor: colors.textColor,
          textDisabledColor: colors.disabledCCalDays,
          monthTextColor: colors.textColor,
          todayTextColor: colors.textColor,
          todayBackgroundColor: colors.activeColor,
        }}
        {...props}

      />
    );
};

export default CalendarItem;
