# Apollo 2021

Movie app built with React, Apollo and GraphQL

# 1. 시작하기

## 1. 프로젝트 생성하기

- `npx create-react-app apollo_2021`

## 2. 파일 정리하기

- Delete
  - App.css
  - App.test.js
  - indexs.css
  - logo.svg
  - serviceWorker.js
  - setupTests.js
- src 폴더 하위에 components 폴더 생성 & App.js 이동

## 3. title 변경하기

- index.html - tilte 수정

## 4. Git repository 설정하기

- `git remote add origin https://github.com/Dongdong-k/apollo_2021.git`

## 5. 여기서 사용할 것들

- Styled components
  - install : `yarn add styled-components`
  - For CSS
- React-router-dom
  - install : `yarn add react-router-dom`
  - For router
- apollo

  - install : `yarn add apollo-boost @apollo/react-hooks graphql`
  - For React Hook & GraphQL
  - Graph QL(query or mutation 사용) 을 사용하기 좋은 방법

## 6. reset Css

- public 폴더 하위에 Reset.css 생성하기

# Router and Styles

- routes 폴더 생성하기 : `mkdir src/routes`
- routes 폴더 내 Home.js 생성 : `touch src/routes/Home.js`  
  `export default ()=> "Home"`
- routes 폴더 내 Detail.js 생성 : `touch src/routes/Detail.js`  
  `export default ()=> "Detail"`
- App.js Router 설정  
   기능 : 주소에 따라 출력하는 홈페이지 다르게 설정

  ```
  import React from "react";
  import { HashRouter as Router, Route } from "react-router-dom";
  import Detail from "../routes/Detail";
  import Home from "../routes/Home";

  function App() {
    return (
            <Router>
                <Route exact path="/" component={Home} />
                <Route path="/:id" component={Detail} />
            </Router>
            );
    }
    export default App;
  ```
