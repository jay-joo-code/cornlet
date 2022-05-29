import styled from 'styled-components'

const Space = styled.div`
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
  padding-top: ${(props) => props.y && `${props.y}rem`};
  padding-right: ${(props) => props.x && `${props.x}rem`};
`

export default Space
