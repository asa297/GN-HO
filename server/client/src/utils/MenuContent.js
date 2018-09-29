import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return [
          <li key="1">
            <Link to="/home">Home</Link>
          </li>,
          <li key="5">
            <Link to="/Item">Item</Link>
          </li>,
          <li key="7">
            <Link to="/report">Report</Link>
          </li>
        ];

      default:
        return (
          <li>
            <Link to="/home">Home</Link>
          </li>
        );
    }
  }
};
