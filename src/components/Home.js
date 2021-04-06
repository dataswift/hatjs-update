import { HatClient } from "@dataswift/hat-js";
import React, { useState } from "react";
import appConfig from "../appConfig";

export default function Home() {
  const [input, setInput] = useState("");
  const [newComment, setNewComment] = useState("");

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

      console.log(response);
    }
  };

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
      </div>
    </div>
  );
}
