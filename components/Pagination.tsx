import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const StyledPagination = styled(Pagination)(({ theme }) => ({
  '& .MuiPaginationItem-root': {
    borderRadius: '0.25rem',
    margin: theme.spacing(0.5),
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

const CustomPagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" className="pagination">
      <StyledPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        shape="rounded"
        color="primary"
        boundaryCount={1}
        siblingCount={1}
      />
    </Stack>
  );
};

export default CustomPagination;
