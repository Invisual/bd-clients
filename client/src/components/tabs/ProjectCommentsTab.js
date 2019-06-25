import React from 'react';
import SingleTaskComment from '../singles/SingleTaskComment';
import moment from 'moment';
import 'moment/locale/pt';
import 'moment-duration-format';

class ProjectCommentsTab extends React.Component {
  render() {
    return (
      <div className="project-comment-tab">
        {this.props.projectContent.comments ? (
          this.props.projectContent.comments.map(comment => {
            return (
              <SingleTaskComment
                key={comment.id_project_comment}
                id={comment.id_project_comment}
                text={comment.text_comment}
                author={comment.name_user}
                date={moment(comment.date_comment).format('D/MM/YYYY')}
              />
            );
          })
        ) : (
          <div>Este Projeto ainda não tem comentários</div>
        )}
      </div>
    );
  }
}

export default ProjectCommentsTab;
