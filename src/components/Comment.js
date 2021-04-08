import React from "react";

export default function Comment({ comment, hat, callback }) {
  const { data } = comment;
  const { date, value } = data;

  const updateComment = async (event) => {
    event.preventDefault();
    comment.data.value += " updated!";
    await hat.hatData().update([comment]);
    callback(comment)
  };

  return (
    <div key={date} className="comment">
      <div className="content">
        <a className="text">{value}</a>
        <div className="metadata">
          <span className="date">{new Date(date).toLocaleTimeString()}</span>
        </div>
        <div className="actions">
          <a href="" className="edit" onClick={updateComment}>
            Edit
          </a>
          <a href="" className="delete">
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}
