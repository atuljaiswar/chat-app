import { Box, Skeleton } from '@mui/material';

const SkeletonMessage = () => {
  return (
    <>
      <Box className='flex mb-4 gap-x-3'>
        <Box>
          <Skeleton
            width={100}
            height={20}
            sx={{
              backgroundColor: '#443f3f',
            }}
          />
          <Skeleton
            width={100}
            height={20}
            animation='wave'
            sx={{
              backgroundColor: '#443f3f',
            }}
          />
        </Box>
        <Skeleton
          variant='circular'
          width={45}
          height={45}
          sx={{
            backgroundColor: '#443f3f',
          }}
        />
      </Box>
    </>
  );
};

export default SkeletonMessage;
