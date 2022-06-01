import React from 'react'
import styled from 'styled-components'
import Logo from 'src/components/displays/Logo'
import Body from 'src/components/fonts/Body'
import useRouter from 'src/hooks/useRouter'
import { Link } from 'react-router-dom'
import useIsMobile from 'src/hooks/useIsMobile'
import { matchPath } from 'react-router'
import Space from '../layouts/Space'
import theme from 'src/theme'
import Text from '../fonts/Text'
import { FlexRow } from '../layouts/Flex'
import { FlexColumn } from '../layouts/Flex'

const FooterContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.border.default};
  padding: 1rem;
`

const JayLink = styled.a`
  text-decoration: underline;
  color: ${(props) => props.theme.brand.gradient};
  font-weight: 400;
`

const MobileFooter = ({ matched }) => (
  <FooterContainer>
    <Logo isDark />
    <Space margin='1rem 0' />
    <FlexColumn alignStart>
      <Link to='/terms-conditions'>
        <Text variant='h5'>Terms of Service</Text>
      </Link>
      <Link to='/privacy-policy'>
        <Text variant='h5'>Privacy Policy</Text>
      </Link>
      <Link to='/cookie-policy'>
        <Text variant='h5'>Cookie Policy</Text>
      </Link>
    </FlexColumn>
    <Space margin='1rem 0' />
    <Text variant='h5' color={theme.textLight}>
      contactcornlet@gmail.com
    </Text>
    {/* <Space padding='.5rem 0' />
    <Text variant='h5' color={theme.textLight}>
      Built with ❤️ by Jay
    </Text> */}
    {matched && matched.isExact && <Space margin='6rem 0' />}
  </FooterContainer>
)

const StyledLink = styled(Link)`
  padding: 0 0.3rem;

  @media (min-width: ${(props) => props.theme.md}px) {
    &:hover {
      text-decoration: underline;
    }
  }
`

const MainFooter = () => {
  const router = useRouter()
  const matched = matchPath(router.pathname, {
    path: '/listing/:lid',
    exact: true,
    strict: false,
  })
  const pathArr = router.pathname.split('/')
  const isChatroomPath = pathArr.length === 4 && pathArr[1] === 'profile' && pathArr[2] === 'chat'
  const isMobile = useIsMobile()

  if (isChatroomPath && isMobile) return <div />

  if (isMobile) return <MobileFooter matched={matched} />

  return (
    <FooterContainer>
      <FlexRow justifySpaceBetween alignCenter>
        <Logo isDark />
        {/* <Text variant='h5'>Built with ❤️ by <JayLink href='https://www.linkedin.com/in/jay-joo-341191135/' target="_blank">Jay</JayLink></Text> */}
        {/* <Text variant='h5'>Built with ❤️ by Jay</Text> */}
      </FlexRow>
      <FlexRow justifyEnd>
        <FlexColumn alignEnd>
          <Space padding='.5rem 0' />
          <Text variant='h5'>contactcornlet@gmail.com</Text>
          <Space margin='.1rem 0' />
          <Text variant='h6'>
            <StyledLink to='/terms-conditions'>Terms of Service</StyledLink> •
            <StyledLink to='/privacy-policy'>Privacy Policy</StyledLink> •
            <StyledLink to='/cookie-policy'>Cookie Policy</StyledLink>
          </Text>
        </FlexColumn>
      </FlexRow>
    </FooterContainer>
  )
}

export default MainFooter
