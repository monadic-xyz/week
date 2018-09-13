import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from './utils';
import Debugger from './components/Debugger';
import Header from './components/Header';
import Tasks from './components/Tasks';

import firebase from './firestore'

// import HiringUpdate from './components/HiringUpdate';

const EMPLOYEES = ["Assign","Alexis","Ange","Ele","Emma","James","Julian","Julien","Kim","Onur","Sam","Thomas","Tomás"];

const db = firebase.firestore();

export default class App extends Component {
  constructor() {
    super();
    this.colRef = db.collection('tasks');
    this.state = {
      tasks: [],
      fetching: false
    };
  }

  componentDidMount() {
    this.unsubscribeCol = this.colRef.onSnapshot(this.onColUpdate);
    this.setState({fetching: true});
  }
  componentWillUnmount() {
    this.unsubscribeCol();
  }

  onColUpdate = (snapshot) => {
    const docs = snapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      data: docSnapshot.data()
    }));
    this.setState({
      tasks: docs,
      fetching: false
    });
  };


  render() {
    return (
      <Container>
        <Header employees={EMPLOYEES} />
        <Tasks employees={EMPLOYEES} tasks={this.state.tasks}/>
        {/* <HiringUpdate /> */}

        {/* <Debugger {...this.state} /> */}

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
