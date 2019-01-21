import styled from 'styled-components'

export const ContainerDiv = styled.div`
  background: green;
  
  h1{
    font-size: 55px;
    color: ${props => `${props.color}`}
  }
 
`