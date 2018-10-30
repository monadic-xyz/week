import styled from 'styled-components';

export default styled.header`
  display: grid;
  grid-template-columns: 120px 220px auto;
  height: 136px;
  padding-top: 64px;
  > div {
    justify-self: end;
  }
`;
