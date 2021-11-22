import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './ImgCarousel.css'

const ImgCarousel = ({ imgs }) => {
  const slider = useRef(null)

  const lockVertScroll = (direction) => {
    if (direction !== 'vertical') {
      disableBodyScroll(slider.current)
    }
  }

  const releaseBodyScroll = () => enableBodyScroll(slider.current)

  const config = {
    dots: true,
    infinite: true,
    speed: 200,
    accessibility: true,
    ref: slider,
    swipeEvent: lockVertScroll,
    enableVerticalScroll: true,
  }

  if (!imgs || !imgs.length) return <div />

  return (
    <Container onTouchEnd={releaseBodyScroll}>
      <Slider {...config}>
        {imgs.map((src) => (
          <ImgContainer key={src}>
            <Img src={src} />
          </ImgContainer>
        ))}
      </Slider>
    </Container>
  )
}

const Container = styled.div`
  & .slick-dots {
    bottom: 15px;
  }

  & .slick-dots li {
    margin: 0;
  }

  & .slick-dots li button {
    padding: 0;
  }

  & .slick-dots li button:before {
    opacity: 0.8;
    color: white;
    font-size: 10px;
  }

  & .slick-dots li.slick-active button:before {
    color: ${(props) => props.theme.grey[700]};
  }
`

const ImgContainer = styled.div`
  height: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (min-width: ${(props) => props.theme.md}px) {
    height: 300px;
    border-radius: 4px;
    overflow: hidden;
  }
`

const Img = styled.img`
  width: 100%;
  object-fit: cover;
  height: inherit;
`

export default ImgCarousel
