import React, { useState } from 'react';
import styled from 'styled-components';

const CalendarWrapper = styled.div`
  width: 500px;
  padding: 20px;
  background: #FFFAF3;
  color: #000;
  box-shadow: 2px 2px 12.399999618530273px 2px rgba(0, 0, 0, 0.25);
  border-radius: 34px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const HeaderDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
`;

const Title = styled.h2`
  margin: 0;
  color: #D70000;
  font-size: 48px;
  font-family: 'Noto Sans KR';
  font-weight: 400;
  word-wrap: break-word;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;

  &:hover {
    background-color: #c8ebb3;
    border-radius: 8px;
  }
`;

const DaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-weight: bold;
  padding-bottom: 5px;
  font-size: 15px;
`;

const Day = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
`;

const DateCell = styled.div`
  cursor: pointer;
  padding: 15px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const Calendar = (props) => {
    const {onChange, value} = props;
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const getDates = (year, month) => {
    const dates = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < startDayOfWeek; i++) {
      dates.push('');
    }

    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(i);
    }

    return dates;
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  const dates = getDates(year, month);

  return (
    <CalendarWrapper>
      <Header>
        <NavButton onClick={handlePrevMonth}>←</NavButton>
        <HeaderDate>
          <Title>{`${String(month + 1).padStart(2, '0')}`}</Title>
          <Title style={{ fontSize: '20px' }}>{`${year}`}</Title>
        </HeaderDate>
        <NavButton onClick={handleNextMonth}>→</NavButton>
      </Header>
      <DaysRow>
        {days.map((day, idx) => (
          <Day key={idx}>{day}</Day>
        ))}
      </DaysRow>
      <DatesGrid>
        {dates.map((date, idx) => {
          const isSelected =
            date &&
            value &&
            value.getFullYear() === year &&
            value.getMonth() === month &&
            value.getDate() === date;
          return (
            <DateCell
              onClick={() => {
                const newDate = new Date(year, month, date);
                onChange(newDate);
                value(newDate);
              }}
              style={isSelected ? { backgroundColor: "#C8EBB3", borderRadius: "50%" } : {}}
              key={idx}
            >
              {date}
            </DateCell>
          );
        })}
      </DatesGrid>
    </CalendarWrapper>
  );
};

export default Calendar;
