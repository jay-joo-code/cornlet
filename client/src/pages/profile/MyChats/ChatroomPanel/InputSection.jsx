import React, { useState } from 'react'
import styled from 'styled-components'
import Input from 'src/components/inputs/Input'
import Btn from 'src/components/buttons/Btn'
import Body from 'src/components/fonts/Body'
import RenderOn from 'src/containers/RenderOn'
import socket from 'src/util/socket'
import { useSelector } from 'react-redux'
import Text from 'src/components/fonts/Text'

const HEIGHT = 84

const InputSection = ({ chatroom }) => {
  const [msg, setMsg] = useState('')
  const minRows = 1
  const maxRows = 6
  const lineHeight = 24
  const [rows, setRows] = useState(minRows)
  const user = useSelector((state) => state.user)
  console.log('chatroom.searcher', chatroom.searcher)

  const handleChange = (event) => {
    // reset number of rows in textarea
    const previousRows = rows
    setRows(minRows)

    // calculate number of rows
    const currentRows = Math.floor(event.target.scrollHeight / lineHeight)

    // if rows didn't change
    if (currentRows === previousRows) {
      setRows(currentRows)
    }

    // if rows increased
    if (currentRows >= maxRows) {
      // increase rows
      setRows(maxRows)
      event.target.scrollTop = event.target.scrollHeight
    }

    setMsg(event.target.value)
    setRows(currentRows < maxRows ? currentRows : maxRows)
  }

  const handleSendMsg = () => {
    setMsg('')
    setRows(minRows)

    const data = {
      cid: chatroom._id,
      type: 'txt',
      content: msg,
      uid: user.uid,
      createdAt: new Date(),
    }
    socket.emit('msg', data)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.altKey) {
      e.preventDefault()
      e.stopPropagation()
      handleSendMsg()
    }
  }

  if (chatroom.searcher && chatroom.searcher.isBanned) {
    return (
      <BanMessageContainer>
        <Title variant='h4'>This user has been banned from Cornlet</Title>
        <Desc>
          This user has been banned for suspicious activities such as spamming, conversations not
          related to subletting, or potentially malicious behaviors.
        </Desc>
        <Desc>
          If you have any questions or concerns, please reach out to contactcornlet@gmail.com
        </Desc>
      </BanMessageContainer>
    )
  }

  return (
    <div>
      <Container>
        <InputContainer>
          <Input
            value={msg}
            onChange={handleChange}
            multiline
            rows={rows}
            onKeyDown={handleKeyDown}
            lineHeight={lineHeight}
          />
        </InputContainer>
        <Btn color='primary' inverted onClick={handleSendMsg}>
          Send
        </Btn>
      </Container>
      <RenderOn mobile>
        <Placeholder />
      </RenderOn>
    </div>
  )
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem 1rem 1rem;
  height: ${HEIGHT}px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: white;

  & > button {
    margin-left: 1rem;
    margin-top: 0.5rem;
  }

  @media (min-width: ${(props) => props.theme.md}px) {
    position: static;
    height: auto;
  }
`

export const Placeholder = styled.div`
  height: ${HEIGHT}px;
`

export const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

export const HelpText = styled(Body)`
  position: absolute;
  bottom: 0.8rem;
  left: 1rem;
`

const BanMessageContainer = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  padding: 1.5rem 0 2rem 0;

  @media (min-width: ${(props) => props.theme.md}px) {
    padding: 1.5rem;
  }
`

const Title = styled(Text)`
  margin-bottom: 0.3rem;
`

const Desc = styled(Text)`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.3rem;
`

export default InputSection
