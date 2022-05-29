import React from 'react'
import styled from 'styled-components'

const Text = ({ variant = 'p', children, ...rest }) => {
  switch (variant) {
    case 'h1':
      return <H1 {...rest}>{children}</H1>
    case 'h2':
      return <H2 {...rest}>{children}</H2>
    case 'h3':
      return <H3 {...rest}>{children}</H3>
    case 'h4':
      return <H4 {...rest}>{children}</H4>
    case 'h5':
      return <H5 {...rest}>{children}</H5>
    case 'h6':
      return <H6 {...rest}>{children}</H6>
    case 'h7':
      return <H7 {...rest}>{children}</H7>
    case 'p':
      return <P {...rest}>{children}</P>
  }
}

const CoreText = styled.p`
  color: ${(props) => props.theme.text};
  white-space: pre-line;
  word-break: break-word;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.5px;

  // ellipsis
  text-overflow: ${(props) => (props.ellipsis ? 'ellipsis' : '')};
  overflow: ${(props) => (props.ellipsis ? 'hidden' : '')};
  white-space: ${(props) => (props.ellipsis ? 'nowrap' : '')};

  // nowrap
  white-space: ${(props) => (props.nowrap ? 'nowrap' : '')};

  // bold
  font-weight: ${(props) => (props.bold ? 'bold' : '')};

  // color
  color: ${(props) => props.color && props.color};

  // fontWeight
  font-weight: ${(props) => props.fontWeight && props.fontWeight};

  // maxWidth
  max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '')};

  // margin
  margin: ${(props) => (props.margin ? props.margin : '')};

  // uppercase
  text-transform: ${(props) => props.uppercase && 'uppercase'};

  // maxLines
  overflow: ${(props) => props.maxLines && 'hidden'};
  text-overflow: ${(props) => props.maxLines && 'ellipsis'};
  display: ${(props) => props.maxLines && '-webkit-box'};
  -webkit-line-clamp: ${(props) => props.maxLines && props.maxLines};
  -webkit-box-orient: ${(props) => props.maxLines && 'vertical'};

  // muted
  color: ${(props) => props.muted && props.theme.textMuted};
`

const H1 = styled(CoreText)`
  font-size: 42px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.medium}) {
    font-size: 48px;
  }
`

const H2 = styled(CoreText)`
  font-size: 30px;
  font-weight: 500;

  @media (min-width: ${(props) => props.theme.medium}) {
    font-size: 36px;
  }
`

const H3 = styled(CoreText)`
  font-size: 24px;
  font-weight: 500;
`

const H4 = styled(CoreText)`
  font-size: 18px;
  font-weight: 500;
`

const P = styled(CoreText)`
  font-size: 16px;
`

const H5 = styled(CoreText)`
  font-size: 14px;

  @media (min-width: ${(props) => props.theme.medium}) {
    font-size: 16px;
  }
`

const H6 = styled(CoreText)`
  font-size: 12px;
`

const H7 = styled(CoreText)`
  font-size: 11px;
`

export default Text
