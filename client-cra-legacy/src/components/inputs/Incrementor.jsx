import React from 'react';
import styled from 'styled-components';
import Body from 'src/components/fonts/Body';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IncrementorSection = styled.div`
  display: flex;
  align-items: center;

  & > p {
    width: 60px;
    font-weight: bold;
    text-align: center;
  }
`;

const IncrementBtn = styled.button`
  background: inherit;
  color: ${(props) => props.theme.primary};
  cursor: pointer;
  
  font-size: 1.5rem;
  text-align: center;

  width: 2rem;
  height: 2rem;
  padding: 0;
  
  border-radius: 50%;
  border: 1px solid ${(props) => props.theme.primary};
`;

const Incrementor = ({
  formik, label, name, increment,
}) => {
  const dynIncrement = increment || 1;
  const handleIncrement = () => {
    formik.setFieldValue(name, Number(formik.values[name]) + dynIncrement, false);
  };
  const handleDecrement = () => {
    const val = Number(formik.values[name]) - dynIncrement;
    formik.setFieldValue(name, val < 0 ? 0 : val, false);
  };

  return (
    <Container>
      <Body>{label}</Body>
      <IncrementorSection>
        <IncrementBtn type="button" onClick={handleDecrement}>-</IncrementBtn>
        <Body>{formik.values[name]}</Body>
        <IncrementBtn type="button" onClick={handleIncrement}>+</IncrementBtn>
      </IncrementorSection>
    </Container>
  );
};

export default Incrementor;
