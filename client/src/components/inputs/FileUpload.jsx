import React, { useState } from 'react'
import styled from 'styled-components'
import uploadFile from 'src/services/firebase/uploadFile'
import log from 'src/util/log'
import Loading from 'src/components/displays/Loading'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const FileUpload = ({ path, setSrc }) => {
  const [loading, setLoading] = useState(false)

  const handleUploadFile = (file) =>
    new Promise((resolve, reject) => {
      uploadFile(file, path)
        .then((url) => {
          setSrc(url)
          resolve()
        })
        .catch((error) => {
          setLoading(false)
          log('FileUpload', error)
          reject(error)
        })
    })

  const handleUpload = async (e) => {
    setLoading(true)
    const promises = [...e.target.files].map((file) => handleUploadFile(file))
    await Promise.all(promises)
    setLoading(false)
  }

  return (
    <Container>
      <input type='file' onChange={handleUpload} multiple accept='image/png, image/jpeg' />
      {loading ? <Loading /> : <div />}
    </Container>
  )
}

export default FileUpload
