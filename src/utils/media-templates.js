import { css } from 'styled-components'

const sizes = {
  extraWide: 1640,
  wide: 1440,
  desktop: 1060,
  tablet: 768,
  phone: 420,
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label]}px) {
      ${css(...args)}
    }
  `

  return acc
}, {})


export default media;
