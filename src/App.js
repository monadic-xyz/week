import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from './utils';
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
  max-width: 1060px;
  margin: 0 auto;
  padding: 40px;
  font-family: sans-serif;
  font-size: 16px;
  color: ${colors.black}
`
