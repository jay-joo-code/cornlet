import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { ReactComponent as AvatarIconRaw } from 'src/assets/svgs/avatar.svg';

const SAvatar = styled(Avatar)`
  width: 35px !important;
  height: 35px !important;

  // border
  box-shadow: ${props => props.border && `inset 0px 0px 0px 1px ${props.theme.primary}`};
  border: ${props => props.border && `2px solid ${props.theme.primary}`};

  // sm
  width: ${(props) => (props.sm ? '22px !important' : '')};
  height: ${(props) => (props.sm ? '22px !important' : '')};

  // lg
  width: ${(props) => (props.lg ? '45px !important' : '')};
  height: ${(props) => (props.lg ? '45px !important' : '')};
`;

const AvatarIcon = styled(AvatarIconRaw)`
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  border-radius: 50%;
  padding: 5px;
  opacity: .8;
`;

const ProfileIcon = ({ src, path, lg, sm, border, ...rest }) => (
  <div>
    {src
      ? (
        <Link to={path}>
          <SAvatar
            src={src}
            border={border ? 1 : 0}
            lg={lg}
            sm={sm}
            {...rest}
          />
        </Link>
      )
      : (
        <AvatarIcon />
      )}
  </div>
);

export default ProfileIcon;
