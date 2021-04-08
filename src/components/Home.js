import { HatClient } from "@dataswift/hat-js";
import React, { useEffect, useState } from "react";
import appConfig from "../appConfig";
import Comment from "./Comment";

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
      setComments(response.parsedBody);
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
          {comments
            .sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
            .map((comment) => (
              <Comment comment={comment} hat={hat} />
            ))}
        </div>
      </div>
    </div>
  );
}
