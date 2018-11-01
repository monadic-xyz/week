import styled from 'styled-components';

export default styled.header`
  display: grid;
  grid-template-columns: 120px 220px auto;
  grid-template-rows: 24px;
  height: 110px;
  > div {
    justify-self: end;
  }
`;
