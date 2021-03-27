import react from "react";
import { Link } from "react-router-dom";

// <a herf> </a> 사용시 react app 리셋되는 현상 발생 => link 사용

export default ({ id }) => (
  <div>
    <Link to={`/${id}`}>{id}</Link>
  </div>
);
