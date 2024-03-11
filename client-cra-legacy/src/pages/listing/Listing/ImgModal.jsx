import React, { useState } from 'react'
import Modal from 'src/components/views/Modal'
import styled from 'styled-components'

const ImgModal = ({ imgs, isModalOpen, setIsModalOpen }) => {
  const [imgIdx, setImgIdx] = useState(0)

  return (
    <Modal heading='Listing photos' open={isModalOpen} handleClose={() => setIsModalOpen(false)}>
      <Container>
        <LargeView>
          <LargeImg src={imgs[imgIdx]} />
        </LargeView>
        <ScrollView>
          {imgs.map((img, i) => (
            <ThumbnailImg key={img} src={img} onClick={() => setImgIdx(i)} />
          ))}
        </ScrollView>
      </Container>
    </Modal>
  )
}

const Container = styled.div`
  padding-top: 2rem;
  display: flex;
`

const LargeView = styled.div`
  margin-right: 2rem;
`

const LargeImg = styled.img`
  width: 60vw;
  height: 40vw;
  border-radius: 20px;
  object-fit: cover;
  overflow: hidden;
`

const ScrollView = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 40vw;
  display: flex;
  flex-direction: column;
  padding-right: 0.5rem;
`

const ThumbnailImg = styled.img`
  height: 10vw;
  flex-shrink: 0;
  width: 12vw;
  overflow: hidden;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 1rem;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.border.default};
`

export default ImgModal
