import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { default as MaterialAvatar } from '@material-ui/core/Avatar'
import AvatarIconRaw from 'src/assets/svgs/avatar.svg'

const Avatar = ({ src, path, lg, sm, border, isLinked = true, ...rest }) => (
  <div>
    {src ? (
      isLinked ? (
        <Link to={path}>
          <StyledAvatar src={src} border={border ? 1 : 0} lg={lg} sm={sm} {...rest} />
        </Link>
      ) : (
        <StyledAvatar src={src} border={border ? 1 : 0} lg={lg} sm={sm} {...rest} />
      )
    ) : (
      <AvatarIcon />
    )}
  </div>
)

const StyledAvatar = styled(MaterialAvatar)`
  width: 35px !important;
  height: 35px !important;

  // border
  box-shadow: ${(props) => props.border && `inset 0px 0px 0px 1px ${props.theme.primary}`};
  border: ${(props) => props.border && `2px solid ${props.theme.primary}`};

  // sm
  width: ${(props) => (props.sm ? '22px !important' : '')};
  height: ${(props) => (props.sm ? '22px !important' : '')};

  // lg
  width: ${(props) => (props.lg ? '45px !important' : '')};
  height: ${(props) => (props.lg ? '45px !important' : '')};
`

const AvatarIcon = styled(AvatarIconRaw)`
  width: 40px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 50%;
  padding: 5px;
  opacity: 0.8;
`

export default Avatar
