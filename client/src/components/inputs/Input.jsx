import React from 'react';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import theme from 'src/theme';

const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: theme.primary,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.primary,
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.primary,
      },
    },
    '& .MuiOutlinedInput-multiline': {
      padding: '.5rem 1rem',
    },
  },
})(TextField);

const Container = styled.div`
  width: 100%;
  display: flex;
  font-size: 16px;

  & textarea {
    line-height: 1.5;
    word-break: break-word;
    white-space: pre-line;

    // lineHeight
    line-height: ${(props) => (props.lineHeight ? `${props.lineHeight}px` : '')};

    // height based on rows
    height: ${(props) => (props.rows && props.lineHeight ? `${props.rows * props.lineHeight}px}` : '')};
  }
  
  & > * {
    flex-grow: 2;
  }

  // width
  width: ${(props) => (props.width ? `${props.width}px` : '')};
`;

const Input = ({
  formik, name, label, adornment, multiline, width, margin, rows, lineHeight, ...rest
}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;
  const error = hasError ? formik.errors[name] : undefined;
  const formikProps = formik ? formik.getFieldProps(name) : [];
  const wrappedAdornment = adornment
    ? <InputAdornment position="start">{adornment}</InputAdornment>
    : null;
  const multilineProps = {
    multiline,
    variant: 'outlined',
    rows: rows || 20,
  };
  const conditionalMultiline = multiline ? multilineProps : {};

  return (
    <Container
      width={width}
      lineHeight={lineHeight}
      rows={rows}
    >
      <StyledTextField
        {...formikProps}
        label={label}
        error={!!error}
        helperText={error}
        fullwidth={1}
        margin={margin || 'normal'}
        InputProps={{ startAdornment: wrappedAdornment, style: { textAlign: 'center' } }}
        {...conditionalMultiline}
        {...rest}
      />
    </Container>
  );
};

export default Input;
