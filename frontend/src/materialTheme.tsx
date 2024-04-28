import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // backgroundColor: '#000',
        },
      },
    },

    MuiInput: {
      styleOverrides: {
        root: {
          // backgroundColor: '#000',
          // color: '#fff',
          // '&::placeholder': {
          //   // Target the placeholder text
          //   color: '#fff', // Set white color for placeholder text
          //   opacity: 1, // Ensure placeholder text is fully visible
          // },
        },
      },
    },
  },
});

export default theme;
