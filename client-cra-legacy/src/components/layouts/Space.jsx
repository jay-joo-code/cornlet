import styled from 'styled-components';

const Space = styled.div`
  margin: ${(props) => props.margin && props.margin};
  padding: ${(props) => props.padding && props.padding};
`

export default Space
