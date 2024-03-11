import React from 'react';
import styled from 'styled-components';
import Label from 'src/components/fonts/Label';
import ErrMsg from 'src/components/fonts/ErrMsg';
import Body from 'src/components/fonts/Body';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import theme from 'src/theme';

const StyledCheckbox = withStyles({
  root: {
    color: theme.primary,
    '&$checked': {
      color: theme.primary,
    },
  },
  checked: {},
})((props) => <MaterialCheckbox color="default" {...props} />);

const Wrapper = styled.div`
  // hasSublabel
  margin-bottom: ${(props) => (props.hasSublabel ? '1rem !important' : '')};
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;

  // hasSublabel
  align-items: ${(props) => (props.hasSublabel ? 'flex-start' : '')};
`;

const LabelSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const CheckboxLabel = styled(Label)`
  margin-bottom: .2rem;

  // hasSublabel
  font-weight: ${(props) => (props.hasSublabel ? 'bold' : '')};
  opacity: ${(props) => (props.hasSublabel ? '.8' : '')};
`;

const Checkbox = ({
  label, sublabel, name, formik, ...rest
}) => {
  const hasError = formik ? formik.touched[name] && formik.errors[name] : false;

  const handleChange = (e) => {
    if (e.target.checked) {
      formik.setFieldValue(name, true);
    }
    else {
      formik.setFieldValue(name, false);
    }
  };

  return (
    <Wrapper hasSublabel={sublabel} {...rest}>
      <InputArea hasSublabel={sublabel}>
        <StyledCheckbox
          checked={formik.values[name]}
          onChange={handleChange}
        />
        <LabelSection>
          <CheckboxLabel hasSublabel={sublabel}>{label}</CheckboxLabel>
          <Body muted>{sublabel}</Body>
        </LabelSection>
      </InputArea>
      {hasError ? (
        <ErrMsg>{formik.errors[name]}</ErrMsg>
      ) : null}
    </Wrapper>
  );
};

export default Checkbox;
