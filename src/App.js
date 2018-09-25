import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import { colors, media } from './utils';
// import Debugger from './components/Debugger';
import Header from './components/Header';
import Tasks from './components/Tasks';

import firebase from './firestore'

// import HiringUpdate from './components/HiringUpdate';

const db = firebase.firestore();

export default class App extends Component {
  constructor() {
    super();
    this.tasksRef = db.collection('tasks');
    this.employeesRef = db.collection('employees');
    this.state = {
      tasks: [],
      employees: [],
      fetchingTasks: false,
      fetchingEmployees: false,
    };
  }

  componentDidMount() {
    this.unsubscribeTasks = this.tasksRef.onSnapshot(this.onTaskUpdate);
    this.unsubscribeEmployees = this.employeesRef.onSnapshot(this.onEmployeeUpdate);
    this.setState({
      fetchingTasks: true,
      unsubscribeEmployees: true,
    });
  }
  componentWillUnmount() {
    this.unsubscribeTasks();
    this.unsubscribeEmployees();
  }

  onTaskUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      tasks: docs,
      fetchingTasks: false
    });
  };
  onEmployeeUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      name: docSnapshot.data().name
    }));
    this.setState({
      employees: docs,
      fetchingEmployees: false
    });
  };


  render() {
    const { tasks, employees } = this.state;
    const demo = tasks
      .filter(task => task.data.desc.includes('[demo]') && !task.data.archived && !task.data.done )
      .map(task => ({
        owner: task.data.owner,
        desc: task.data.desc
      }))[0];

    return (
      <Container>
        <Header {...demo}/>
        <Tasks employees={employees} tasks={tasks}/>
        {/* <HiringUpdate /> */}
      </Container>
    );
  }
}

const Container = styled.div`
  margin: 0 auto;
  padding: 40px;
  ${media.wide`
    max-width: 1060px;
  `}
  ${media.tablet`
    padding: 24px;
  `}
`

injectGlobal`
  /* reset.css */
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video, button, input {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    color: inherit;
    text-decoration: none;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
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
  body {
    font-family: sans-serif;
    font-size: 16px;
    color: ${colors.black}
  }
`