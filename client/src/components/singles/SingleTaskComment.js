import React, { Component } from 'react';
import { SingleTaskCommentDiv } from '../../styles/singles';
import { FiCircle } from 'react-icons/fi';

class SingleTaskComment extends Component {
  render() {
    return (
      <SingleTaskCommentDiv className="task-single-comment">
        <div className="comment-status">
          <FiCircle fill="#5E78DD" color="#5e78dd" />
        </div>
        <div className="single-comment-content">
          <div className="single-comment-text">{this.props.text}</div>
          <div className="single-comment-details"><i>{this.props.author}, {this.props.date}</i></div>
        </div>
      </SingleTaskCommentDiv>
    );
  }
}

export default SingleTaskComment;
