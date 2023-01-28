import { style } from '@vanilla-extract/css';

export const container = style({
  maxWidth: '48rem',
  padding: '0 1 rem',
  margin: '3rem auto 6rem'
})

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
})

export const backToHome = style({
  margin: '3rem 0 0'
})