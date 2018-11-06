import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const CollaboratorContext = React.createContext();

const buildQuery = db => {
  let query = db.collection('employees');

  query = query.where('name', '>', '');
  query = query.orderBy('name', 'desc');

  return query;
};

export class CollaboratorProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    db: PropTypes.shape({
      collection: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      collaborators: [],
      unsubscribe: undefined,
    };
  }

  componentDidMount() {
    const { db } = this.props;

    this.setState({
      unsubscribe: buildQuery(db).onSnapshot(this.onSnapshot),
    });
  }

  componentWillReceiveProps(next) {
    const { unsubscribe } = this.state;

    unsubscribe();

    this.setState({
      collaborators: [],
      unsubscribe: buildQuery(next.db).onSnapshot(this.onSnapshot),
    });
  }

  componentWillUnmount() {
    const { unsubscribe } = this.state;
    unsubscribe();
  }

  onSnapshot = snapshot => {
    this.setState({
      collaborators: snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data(),
      })),
    });
  };

  render() {
    const { children } = this.props;
    const { collaborators } = this.state;
    return (
      <CollaboratorContext.Provider value={collaborators}>
        {children}
      </CollaboratorContext.Provider>
    );
  }
}
