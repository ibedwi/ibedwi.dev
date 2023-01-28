import { style, globalStyle, createTheme } from '@vanilla-extract/css';

export const [lightModeTheme, vars] = createTheme({
  color: {
    brand: 'blue',
    someBackground: 'gray',
    gray: {
      50: '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '',
      600: '',
      700: '',
      800: '',
      900: '',
    }
  },
  font: {
    body: 'Karla, sans-serif'
  },
})
export const darkModeTheme = createTheme(vars, {
  ...vars,
  color: {
    brand: 'blue',
    someBackground: 'gray',
    gray: {
      50: '',
      100: '',
      200: '',
      300: '',
      400: '',
      500: '',
      600: '',
      700: '',
      800: '',
      900: '',
    }
  }
})

export const bodyStyle = style({
  backgroundColor: 'red'
});

export const tagStyle = style({
  padding: 4,
})

globalStyle('html, body', {
  fontSize: '16px',
  font: vars.font.body
})