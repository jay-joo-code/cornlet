import React from 'react'
import { ReactComponent as WarningSVGRaw } from 'src/assets/svgs/warning.svg'
import styled from 'styled-components'
import Space from '../layouts/Space';

const Container = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  background: ${(props) => props.theme.warningLight};
  color: ${(props) => props.theme.warning};
  padding: 1rem;
`

const WarningSVG = styled(WarningSVGRaw)`
  fill: ${props => props.theme.warning};
`;

const InfoBox = ({ variant, children }) => {
  return (
    <Container variant={variant}>
      <WarningSVG />
      <Space margin='0 .5rem' />
      {children}
    </Container>
  )
}

export default InfoBox
