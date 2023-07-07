import { Heading, Text, styled } from '@ignite-ui/react'

export const Container = styled('div', {
  // max width to calendar open
  maxWidth: 852,
  padding: '0 $4',

  margin: '$20 auto $4',
})

export const UserHeader = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  [`> ${Heading}`]: {
    marginTop: '$2',
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
  },
})
