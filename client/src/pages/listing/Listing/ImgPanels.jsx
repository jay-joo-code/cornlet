import React, { useState } from 'react'
import InvertedBtn from 'src/components/buttons/InvertedBtn'
import ImgCarousel from 'src/components/displays/ImgCarousel'
import Body from 'src/components/fonts/Body'
import Space from 'src/components/layouts/Space'
import Modal from 'src/components/views/Modal'
import styled from 'styled-components'
import ImgModal from './ImgModal'

const NoImgComponent = () => (
  <NoImg>
    <NoImageText>No image</NoImageText>
  </NoImg>
)

const ImgPanels = ({ imgs }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Container>
        <MainPanel>
          <MainPanelInner>
            <Img src={imgs[0]} />
          </MainPanelInner>
        </MainPanel>
        <SidePanel marginRight>
          <SidePanelInner>{imgs[1] ? <Img src={imgs[1]} /> : <NoImgComponent />}</SidePanelInner>
          <Space margin='.5rem 0' />
          <SidePanelInner>{imgs[2] ? <Img src={imgs[2]} /> : <NoImgComponent />}</SidePanelInner>
        </SidePanel>
        <SidePanel>
          <SidePanelInner>{imgs[3] ? <Img src={imgs[3]} /> : <NoImgComponent />}</SidePanelInner>
          <Space margin='.5rem 0' />
          <SidePanelInner>
            {imgs[4] ? <Img src={imgs[4]} /> : <NoImgComponent />}
            <ShowAllArea>
              <ShowAllBtn onClick={() => setIsModalOpen(true)}>Show all photos</ShowAllBtn>
            </ShowAllArea>
          </SidePanelInner>
        </SidePanel>
      </Container>
      <ImgModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} imgs={imgs} />
    </>
  )
}

const Container = styled.div`
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  height: 500px;
`

const MainPanel = styled.div`
  height: 100%;
  flex: 2;
  overflow: hidden;
  margin-right: 0.5rem;
`

const InnerPanel = styled.div`
  overflow: hidden;
`

const MainPanelInner = styled(InnerPanel)`
  height: 100%;
  width: 100%;
`

const SidePanel = styled.div`
  height: 100%;
  flex: 1;
  overflow: hidden;

  // marginRight
  margin-right: ${(props) => props.marginRight && '.5rem'};
`

const SidePanelInner = styled(InnerPanel)`
  width: 100%;
  height: 50%;
  position: relative;
`

const Img = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
  overflow: hidden;
`

const ShowAllArea = styled.div`
  position: absolute;
  bottom: 20px;
  right: 15px;
`

const ShowAllBtn = styled(InvertedBtn)`
  border: 2px solid ${(props) => props.theme.grey[400]};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`

const NoImg = styled.div`
  background: ${(props) => props.theme.brand50};
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`

const NoImageText = styled(Body)`
  color: ${(props) => props.theme.textLight};
  font-weight: 500;
`

export default ImgPanels
