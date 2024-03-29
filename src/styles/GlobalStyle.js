import { createGlobalStyle } from 'styled-components';

import { colors } from 'styles';

import MonoRegular from 'styles/fonts/GT-America-Mono-Regular.otf';
import MonoMedium from 'styles/fonts/GT-America-Mono-Medium.otf';

export default createGlobalStyle`
  /* reset.css */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, button, input, textarea {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: inherit;
    font-size: 100%;
    color: inherit;
    font-kerning: normal;
    text-decoration: none;
    vertical-align: baseline;
    background-color: transparent;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }

  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input:focus,
  select:focus,
  textarea:focus,
  button:focus {
      outline: none;
  }

  /* global styles */

  @font-face {
    font-family: GTAmericaMono;
    src: url(${MonoRegular}) format("opentype");
  }
  @font-face {
    font-family: GTAmericaMonoMedium;
    src: url(${MonoMedium}) format("opentype");
  }

  html {
    min-height: 100%;
    position: relative;
  }

  body {
    font-family: GTAmericaMono, monospace;
    font-size: 15px;
    color: ${colors.black};
    max-width: 1108px;
    height: 100%;
    padding: 64px 24px 220px 24px;
    margin: 0 auto;
  }
`;
