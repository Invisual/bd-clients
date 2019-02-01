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
          {this.props.text}<div className="single-comment-date"><i>{this.props.author}, {this.props.date}</i></div>
        </div>
      </SingleTaskCommentDiv>
    );
  }
}

export default SingleTaskComment;
