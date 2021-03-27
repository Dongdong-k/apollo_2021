import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Detail from "../routes/Detail";
import Home from "../routes/Home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      {/* URL 주소 "/" 정확하게 입력시 Home 화면 출력 */}
      <Route path="/:id" component={Detail} />
      {/* URL 주소 "/1234.." 비슷하게 값 입력시 Detail 화면 출력 */}
    </Router>
  );
}

export default App;
