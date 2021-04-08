import { HatClient } from "@dataswift/hat-js";
import React, { useEffect, useState } from "react";
import appConfig from "../appConfig";

export default function Home() {
  const [input, setInput] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  const token = sessionStorage.getItem("token");
  const config = {
    token,
    apiVersion: appConfig.apiVersion,
    secure: appConfig.secure,
  };

  const commentEndpoint = "comments";

  const hat = new HatClient(config);

  const onFormSubmit = (event) => {
    event.preventDefault();
    setNewComment(input);
    // Create new comment
    createComment();
  };

  const createComment = async () => {
    if (newComment) {
      const date = new Date().toISOString();
      const body = {
        value: newComment,
        date,
      };

      const response = await hat
        .hatData()
        .create(appConfig.namespace, commentEndpoint, body);

      if (response.parsedBody) {
        setInput("");
      }
    }
  };

  const fetchComments = async () => {
    const response = await hat
      .hatData()
      .getAllDefault(appConfig.namespace, commentEndpoint);

    if (response.parsedBody) {
      setComments(response.parsedBody.map((comment) => comment.data));
    }
  };

  useEffect(() => {
    fetchComments();
    console.log(comments);
  }, []);

  return (
    <div className="ui middle aligned grid">
      <div className="column" style={{ marginTop: "100px" }}>
        <form className="ui large form" onSubmit={onFormSubmit}>
          <div className="field">
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
              placeholder="Enter comment"
            />
          </div>
          <button type="submit" className="ui fluid large teal submit button">
            Add comment
          </button>
        </form>
        <div className="ui comments">
          {comments.map(({ date, value }) => (
            <div className="comment">
              <div className="content">
                <a className="text">{value}</a>
                <div className="metadata">
                  <span className="date">
                    {new Date(date).toLocaleTimeString()}
                  </span>
                </div>
                <div className="actions">
                  <a href="" className="edit">
                    Edit
                  </a>
                  <a href="" className="delete">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
