import React, { Component } from "react";
import { connect } from "react-redux";

// import { fetchUser } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    //we make component resuable by extracting user identification logic into
    //mapStateToProps
    //ownProps is a reference to the props inside the component the
    //mapStateToProps is working on

    //ownProps.userId inside mapStateToProps = this.props.userId inside userHeader
    user: state.user.find((user) => user.id === ownProps.userId),
  };
};
class UserHeader extends Component {
  componentDidMount() {
    //call action creator
    // this.props.fetchUser(this.props.userId);
  }
  render() {
    console.log(this.props.user);
    const { user } = this.props;
    if (!user) {
      return null;
    }
    return <div className="header">{user.name}</div>;
  }
}

export default connect(mapStateToProps, 
  // { fetchUser }
  )(UserHeader);
