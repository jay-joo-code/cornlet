import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImgCarousel.css';

const Container = styled.div`
`;

const ImgContainer = styled.div`
  height: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  
  @media (min-width: ${(props) => props.theme.md}px) {
    height: 300px;
    border-radius: 4px;
    overflow: hidden;
  }
`;

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  height: inherit;
`;

export const NavSection = styled.div`
  margin-top: 1rem;
  padding-left: 1rem;

  & .slick-cloned {
    display: ${(props) => (props.hideClone ? 'none !important' : '')};
  }

  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 0;
  }
`;

export const NavWrapper = styled.div`
  padding-right: 1rem;

  height: 60px;
  width: 80px;

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 80px;
    width: 160px;
  }
`;

export const NavContainer = styled.div`
  cursor: pointer;

  border-radius: 10px;
  overflow: hidden;

  height: inherit;
`;

const ImgCarousel = ({ imgs }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  if (!imgs || !imgs.length) return <div />;

  return (
    <Container>
      <Slider
        accessibility
        speed={200}
        asNavFor={nav2}
        ref={(slider) => setNav1(slider)}
      >
        {imgs.map((src) => (
          <ImgContainer key={src}>
            <Img src={src} />
          </ImgContainer>
        ))}
      </Slider>
      {/* <NavSection hideClone={imgs.length < 4}>
        <Slider
          asNavFor={nav1}
          ref={(slider) => setNav2(slider)}
          slidesToShow={4}
          swipeToSlide
          focusOnSelect
          arrows={false}
        >
          {imgs.map((src) => (
            <NavWrapper key={src}>
              <NavContainer>
                <Img src={src} />
              </NavContainer>
            </NavWrapper>
          ))}
        </Slider>
      </NavSection> */}
    </Container>
  );
};

export default ImgCarousel;
