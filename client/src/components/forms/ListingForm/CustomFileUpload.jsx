import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import FileUpload from 'src/components/inputs/FileUpload'
import ErrMsg from 'src/components/fonts/ErrMsg'
import CircleCross from 'src/components/buttons/CircleCross'
import randomString from 'src/util/helpers/randomString'

const CustomFileUpload = ({ formik, name, user }) => {
  const [newSrc, setNewSrc] = useState()
  const random = randomString()

  // add new image to formik
  useEffect(() => {
    if (newSrc) {
      const newFiles = [...formik.values[name]]
      if (!newFiles.includes(newSrc)) {
        newFiles.push(newSrc)
      }
      formik.setFieldValue(name, newFiles)
    }
  }, [newSrc, name])

  // delete image
  const handleDelete = (targetSrc) => {
    const newFiles = [...formik.values[name]]
    if (newFiles.includes(targetSrc)) {
      newFiles.splice(newFiles.indexOf(targetSrc), 1)
    }
    formik.setFieldValue(name, newFiles)
  }

  // set default thumbnailIdx to 0
  useEffect(() => {
    if (!formik.values.thumbnailIdx) {
      formik.setFieldValue('thumbnailIdx', 0)
    }
  }, [])

  const setThumbnailIdx = (i) => {
    formik.setFieldValue('thumbnailIdx', i)
  }

  return (
    <Container>
      <FileUpload path={user ? `/user/${user.uid}` : `/temp/${random}`} setSrc={setNewSrc} />
      <ErrMsg formik={formik} name='imgs' />
      <ImgContainer>
        {formik.values[name].map((src, i) => {
          const isThumbnail = i === formik.values.thumbnailIdx
          return (
            <ImgWrapper key={src}>
              <Img
                key={src}
                src={src}
                isThumbnail={isThumbnail}
                onClick={() => setThumbnailIdx(i)}
              />
              <CrossContiner>
                <CircleCross onClick={() => handleDelete(src)} />
              </CrossContiner>
              {isThumbnail && <ThumbnailText>Thumbnail</ThumbnailText>}
              <SetThumbnailText isThumbnail={isThumbnail} muted onClick={() => setThumbnailIdx(i)}>
                Set Thumbnail
              </SetThumbnailText>
            </ImgWrapper>
          )
        })}
      </ImgContainer>
    </Container>
  )
}

const Container = styled.div`
  margin: 1rem 0;
`

const ImgContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
`

const CrossContiner = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    display: none;
  }
`

const Img = styled.img`
  object-fit: cover;
  width: 100px;
  height: 100px;
  margin: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  // isThumbnail
  box-shadow: ${(props) => props.isThumbnail && `0 0 0 3px ${props.theme.primary}`};

  @media (min-width: ${(props) => props.theme.md}px) {
    &:hover {
      box-shadow: ${(props) => `0 0 0 3px ${props.theme.primary}`};
    }
  }
`

const ThumbnailText = styled.p`
  color: ${(props) => props.theme.primary};
  font-weight: bold;
  text-align: center;
  font-size: 0.9rem;
`

const SetThumbnailText = styled.p`
  color: ${(props) => props.theme.primary};
  font-weight: bold;
  text-align: center;
  font-size: 0.9rem;
  opacity: 0;
  cursor: pointer;

  // isThumbnail
  display: ${(props) => props.isThumbnail && 'none'};
`

const ImgWrapper = styled.div`
  position: relative;

  @media (min-width: ${(props) => props.theme.md}px) {
    &:hover ${SetThumbnailText} {
      opacity: 0.9;
    }

    &:hover ${CrossContiner} {
      display: block;
    }
  }
`

export default CustomFileUpload
