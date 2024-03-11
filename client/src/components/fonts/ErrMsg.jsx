import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  font-size: .8rem;
  color: ${(props) => props.theme.danger};
  margin-top: .5rem;
`;

const ErrMsg = ({
  children, formik, name, ...rest
}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const error = hasError ? formik.errors[name] : undefined;

  return (
    <Container {...rest}>
      {error || children}
    </Container>
  );
};

export default ErrMsg;
