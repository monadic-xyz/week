import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from './utils';
import Header from './components/Header';
import Tasks from './components/Tasks';
import HiringUpdate from './components/HiringUpdate';

const EMPLOYEES = ["Alexis","Ange","Ele","Emma","James","Julian","Julien","Kim","Onur","Sam","Thomas","Tomás"];

export default class App extends Component {
  render() {
    return (
      <Container>
        <Header employees={EMPLOYEES} />
        <Tasks employees={EMPLOYEES} />
        <HiringUpdate />
      </Container>
    );
  }
}

const Container = styled.div`
  max-width: 1060px;
  margin: 0 auto;
  padding: 40px;
  font-family: sans-serif;
  font-size: 16px;
  color: ${colors.black}
`
