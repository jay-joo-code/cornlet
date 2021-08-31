import React from 'react';
import { ReactComponent as LockRaw } from 'src/assets/svgs/lock.svg';
import Btn from 'src/components/buttons/Btn';
import Badge from 'src/components/displays/Badge';
import DetailedAvatar from 'src/components/displays/DetailedAvatar';
import Searchers from 'src/components/displays/Searchers';
import Body from 'src/components/fonts/Body';
import Subheading from 'src/components/fonts/Subheading';
import { FlexColumn } from 'src/components/layouts/Flex';
import { FlexRow } from 'src/components/layouts/Flex';
import Space from 'src/components/layouts/Space';
import theme from 'src/theme';
import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 20px;
  border-radius: 16px;
  border: 2px solid ${props => props.theme.border.default};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .05);

  & > div {
    border-bottom: 2px solid ${props => props.theme.border.default};
  }

  & > div:last-child {
    border-bottom: none;
  }
`;

const Section = styled.div`
  padding: 1rem;
`;

const LockSVG = styled(LockRaw)`
  height: 1rem;
  opacity: .6;
`;

const LockAvatar = styled.div`
  height: 40px;
  width: 40px;
  background: rgba(0, 0, 0, .1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  border-radius: 50%;
  padding: .5rem;
  margin-right: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const SoldComponent = () => (
  <FlexColumn alignCenter>
    <Btn background={theme.grey[300]} fullWidth inverted disabled>Message host</Btn>
    <Space margin='.3rem 0' />
    <Body colorHex={theme.textMuted} fontSize='.8rem'>This listing has been marked as sold</Body>
  </FlexColumn >
)

const RestrictedComponent = () => (
  <div>
    <FlexRow alignStart>
      <FlexRow alignCenter>
        <LockAvatar>
          <LockSVG />
        </LockAvatar>
        <Subheading bold>Restricted to Cornell</Subheading>
      </FlexRow>
    </FlexRow>
    <Space margin='1rem 0' />
    <FlexColumn alignCenter>
      <Btn background={theme.grey[300]} fullWidth inverted disabled>Message host</Btn>
      <Space margin='.3rem 0' />
      <FlexRow justifyCenter style={{ width: '90%' }}>
        <Body colorHex={theme.textMuted} fontSize='.8rem' style={{ textAlign: 'center' }}>Sign in with a @cornell.edu account to contact the owner</Body>
      </FlexRow>
    </FlexColumn >
  </div>
)

const RightSidePanel = ({ listing, handleMsgBtnClick, signedInUser, searchers }) => {
  const { price, displayName, user, cornellOnly, sold } = listing || {};

  return (
    <Container>
      <Section>
        <FlexRow alignEnd>
          <Subheading fontWeight={500}>${price}</Subheading>
          <Space margin='0 .2rem' />
          <Body muted>/ month</Body>
        </FlexRow>
      </Section>
      <Section>
        {sold
          ? <SoldComponent />
          : (
            <>
              {(!cornellOnly || (cornellOnly && signedInUser && signedInUser.email.split('@')[1] === 'cornell.edu'))
                ? (
                  <div>
                    <DetailedAvatar
                      name={displayName || user.name}
                      src={displayName ? undefined : user.photo}
                    />
                    <Space margin='1.5rem 0' />
                    <Btn color="primary" fullWidth inverted onClick={handleMsgBtnClick}>Message host</Btn>
                  </div>
                ) : <RestrictedComponent />
              }
            </>
          )
        }
      </Section>
      <Section>
        <Searchers searchers={searchers} />
      </Section>
    </Container>
  )
}

export default RightSidePanel
