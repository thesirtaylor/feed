import React, { Component } from "react";
import { connect } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { fetchPosts, fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

class PostList extends Component {
  componentDidMount() {
    //    this.props.fetchPosts();
    //replace this.props.fetchPosts() with fetchPostsAndUsers() because we're trying
    //to solve the overfetching problem by calling the other actions inside
    //fetchPostsAndUsers action
    this.props.fetchPostsAndUsers();
  }
  renderList() {
    return this.props.posts.map((post) => {
      return (
        <div className="item" key={post.id}>
          <i className="large middle aligned icon user" />
          <div className="content">
            <div className="description">
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
            <UserHeader userId={post.userId} />
          </div>
        </div>
      );
    });
  }
  render() {
    console.log(this.props.posts);
    return <div className="ui relaxed divided list">{this.renderList()}</div>;
  }
}
//we replace fetchPosts here too with fetchPostsAndUsers
export default connect(mapStateToProps, { fetchPostsAndUsers })(PostList);
