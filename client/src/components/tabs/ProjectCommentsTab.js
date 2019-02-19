import React from 'react';
import { SingleTaskCommentDiv } from '../../styles/singles';
import { FiCircle } from 'react-icons/fi';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment-duration-format';

class ProjectCommentsTab extends React.Component {
  render() {
    return (
      <>
        <SingleTaskCommentDiv className="task-single-comment">
        <div className="comment-status">
          <FiCircle fill="#5E78DD" color="#5e78dd" />
        </div>
        <div className="single-comment-content">
          <div className="single-comment-text">{this.projectContent.comments.text}</div>
          <div className="single-comment-details"><i>{this.projectContent.comments.text}, {this.projectContent.comments.text}</i></div>
        </div>
      </SingleTaskCommentDiv>
      </>
    );
  }
}

export default ProjectCommentsTab;
