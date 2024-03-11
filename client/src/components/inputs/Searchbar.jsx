import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import updateQuery from 'src/util/path/updateQuery';
import getQuery from 'src/util/path/getQuery';
import { useLocation, useHistory } from 'react-router-dom';
import searchSvg from './search.svg';

const Form = styled.form`
  
`;

const Input = styled.input`
  width: 15px;
  color: transparent;
  cursor: pointer;
  background: white url(${(props) => props.searchSvg}) no-repeat 9px center;
  padding: 9px 10px 9px 30px;
  opacity: .6;
  margin-right: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .2);
  font-size: 16px;
  
  -webkit-border-radius: 10em;
  -moz-border-radius: 10em;
  border-radius: 10em;
  
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  transition: all .5s;
  
  &:focus, &:valid {
    width: 11rem;
    padding-left: 40px;
    color: #000;
    background-color: #fff;
    cursor: auto;
    opacity: 1;
  }
`;

const Searchbar = () => {
  const [q, setQ] = useState();
  const location = useLocation();
  const history = useHistory();
  const change = (e) => {
    e.preventDefault();
    const newQ = e.target.value;
    setQ(newQ);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateQuery({ q }, location, history);
  };
  useEffect(() => {
    const searchQuery = getQuery(location).q || '';
    setQ(searchQuery);
  }, [location]);
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="search"
        value={q || undefined}
        onChange={change}
        required
        searchSvg={searchSvg}
      />
    </Form>
  );
};

export default Searchbar;
