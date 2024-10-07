import React from 'react';
import {
  Pagination,
  PaginationItem,
  Stack,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styles from './styles/Paginator.module.css';

interface PaginatorProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    onPageChange(page);
  };

  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Stack spacing={2} className={styles.paginatorContainer}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        siblingCount={isMobile ? 0 : 1}
        boundaryCount={isMobile ? 0 : 1}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        variant='outlined'
        shape='rounded'
        color='primary'
        className={styles.pagination}
      />
    </Stack>
  );
};

export default Paginator;
