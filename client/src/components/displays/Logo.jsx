import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoRaw } from 'src/assets/svgs/logo.svg';

const LogoSVG = styled(LogoRaw)`
  height: 3rem;
  cursor: pointer;
  fill: ${props => props.theme.brand};

  // isDark
  fill: ${props => props.isDark && props.theme.grey[500]};
`;

const Logo = ({ isDark }) => <LogoSVG isDark={isDark} />;

export default Logo;
