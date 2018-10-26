import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { TaskProvider } from 'providers/TaskProvider';
import { colors, media } from './utils';

// import Debugger from './components/Debugger';
import Header from './components/Header';
import Tasks from './components/Tasks';

import firebase from './firestore';

// import HiringUpdate from './components/HiringUpdate';

const db = firebase.firestore();

export default class App extends Component {
  constructor() {
    super();
    this.employeesRef = db.collection('employees');
    this.employeesRef = this.employeesRef.where('name', '>', '').orderBy('name', 'asc');
    this.state = {
      employees: [],
    };
  }

  componentDidMount() {
    this.unsubscribeEmployees = this.employeesRef.onSnapshot(this.onEmployeeUpdate);
  }

  componentWillUnmount() {
    this.unsubscribeEmployees();
  }

  onEmployeeUpdate = snapshot => {
    const docs = snapshot.docs.map(docSnapshot => ({
      id: docSnapshot.id,
      name: docSnapshot.data().name,
    }));
    this.setState({
      employees: docs,
    });
  };

  render() {
    const { employees } = this.state;

    return (
      <>
        <Container>
          <TaskProvider db={firebase.firestore()}>
            <Header />
            <Tasks employees={employees} />
          </TaskProvider>
          {/* <HiringUpdate /> */}
        </Container>
        <GlobalStyle />
      </>
    );
  }
}

const Container = styled.div`
  margin: 0 auto;
  padding: 40px;
  ${media.wide`
    max-width: 1060px;
  `} ${media.tablet`
    padding: 24px;
  `};
`;

const GlobalStyle = createGlobalStyle`
  /* reset.css */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, button, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-family: inherit;
    font-size: 100%;
    color: inherit;
    text-decoration: none;
    vertical-align: baseline;
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

  /* global styles */
  @import url('https://fonts.googleapis.com/css?family=Inconsolata');

  body {
    margin: 0;
    padding: 0;
    border: 0;
    line-height: 1;
    text-decoration: none;
    vertical-align: baseline;
    font-family: sans-serif;
    font-size: 16px;
    color: ${colors.black}
  }
`;
