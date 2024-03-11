import React from 'react';
import styled from 'styled-components';
import useRouter from 'src/util/hooks/useRouter';
import Pagination from '@material-ui/lab/Pagination';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const PaginationBtns = ({ totalPages, page }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const router = useRouter();
  const handleChange = (e, v) => {
    router.updateQuery({ page: v });
  };

  return (
    <Container>
        <Pagination count={totalPages} page={page} onChange={handleChange} hidePrevButton />
    </Container>
  )
};

export default PaginationBtns;
