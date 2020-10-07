import React from 'react';
import PropTypes from 'prop-types';
import { convertUnixTime } from '../../../utils/Helper';

const CommentCard = props => {
  const { commentData } = props;
  let commentArray;
  if (commentData.length > 1) {
    commentArray = commentData.map(list => (
      <div key={list.id} className="comment-card">
        <div className="author-img">
          <img src={list.author.picture_medium} alt={list.author.name} width="40" />
        </div>
        <div className="text">
          <p>{list.text}</p>
          <data>{convertUnixTime(list.date)}</data>
        </div>
      </div>
    ));
  } else {
    commentArray = (
      <p>
        No Comment
      </p>
    );
  }
  return (
    <div>
      {commentArray}
    </div>
  );
};

CommentCard.propTypes = {
  commentData: PropTypes.func.isRequired,
};

export default CommentCard;
