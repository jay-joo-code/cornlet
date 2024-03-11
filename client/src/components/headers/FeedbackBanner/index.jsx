import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  padding: .3rem 0;
  background: ${(props) => props.theme.primary};
  color: white;
  font-size: .8rem;
  text-align: center;
  opacity: .6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
`;

const FeedbackBanner = () => {
  const [dispText, setDispText] = useState('');
  const texts = [
    'Would you be able to change this?',
    'Can this be a new part of the website?',
    'Is is possible to change this part?',
  ];

  useEffect(() => {
    setDispText(texts[Math.floor(Math.random() * texts.length)]);
  }, [window.location, texts]);

  return (
    <a target="_blank" rel="noopener noreferrer" href="https://forms.gle/7Vu1Jp4druPKzghM7">
      <Container>
        {dispText}
      </Container>
    </a>
  );
};

export default FeedbackBanner;
