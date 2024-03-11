import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useRouter from 'src/util/hooks/useRouter';
import formatDate from 'src/util/helpers/formatDate';
import { ReactComponent as CalendarRaw } from 'src/assets/svgs/calendar.svg';

const Container = styled.div`
  position: relative;
`;

const StyledPicker = styled(DatePicker)`
  /* padding: .4rem 1.5rem .4rem .4rem; */
  padding: .5rem 0;
  font-size: .8rem;
  font-weight: 500;
  background-color: white;

  display: inline;

  border-radius: 3px;
  text-align: center;
  cursor: pointer;
  
  width: 110px;
  background-color: inherit;
  color: ${props => props.theme.text};
  border: 2px solid ${props => props.theme.border.dark};
`;

const CalendarSVG = styled(CalendarRaw)`
  height: 1.6rem;
  width: 1.6rem;
  position: absolute;
  right: .5rem;
  top: 0;
  bottom: 0;
  margin: auto;
  fill: ${props => props.theme.border.dark};
`;

const DateFilter = ({ name }) => {
  const router = useRouter();
  const [date, setDate] = useState();

  useEffect(() => {
    if (router.query[name]) {
      const newDate = new Date(router.query[name].replace(/-/g, '/'));
      setDate(newDate);
    }
    else {
      setDate(null);
    }
  }, [router.query[name]]);

  useEffect(() => {
    if (!date) return;

    const newQuery = {};
    newQuery[name] = formatDate(date);
    router.updateQuery(newQuery);
  }, [date]);

  const handleDateChangeRaw = (e) => e.preventDefault();

  return (
    <Container>
      <StyledPicker
        onChangeRaw={handleDateChangeRaw}
        selected={date}
        onChange={(newDate) => setDate(newDate)}
      />
      {/* <CalendarSVG /> */}
    </Container>
  );
};

export default DateFilter;
