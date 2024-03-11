import Btn from './Btn';
import styled from 'styled-components';

const InvertedBtn = styled(Btn)`
  color: ${props => props.theme.text};
  border-color: ${props => props.theme.text};
  background: white;
  border: 1px solid ${props => props.theme.border.default};

  // color
  color: ${props => props.color && props.color};
  border-color: ${props => props.color && props.color};
`;

export default InvertedBtn
