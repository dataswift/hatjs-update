import React, { useEffect } from "react";
import queryString from "query-string";
import { useHistory } from "react-router";
import { HatTokenValidation } from "@dataswift/hat-js/lib/utils/HatTokenValidation";

export default function AuthHandler({ location }) {
  const history = useHistory();

  useEffect(() => {
    const { token } = queryString.parse(location.search);

    if (token && !HatTokenValidation.isEncodedTokenExpired(token)) {
      sessionStorage.setItem("token", token);
      history.push("/home");
    } else {
      history.push("/login");
    }
  }, [history]);

  return <div>Loading ...</div>;
}
