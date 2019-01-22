import styled from 'styled-components'

export const TopBarDiv = styled.div`
padding-top: .5em;
padding-bottom: .5em;
background-color: #f4f4f4;
position: absolute;
right: 0;
}
a {
	text-decoration: none;
}

ul input[type="text"] {
  border-bottom: 1px solid #BBB;
}

ul input[type="text"]:focus {
  width: 700px;
  z-index: 1;
  border-bottom: 1px solid #BBB;
  cursor: text;
}
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
  }
  .main-nav a {
    padding: 10px 15px;
    text-align: center;
    display: block;
  }
  
  .main-nav a {
    color: #34495e;
    font-size: .99em;
  }
  
  .main-nav a:hover {
    color: #718daa;
  }
  ul .search-field{
    border: 0 0 0 20px;
  }
`