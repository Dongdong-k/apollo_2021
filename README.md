# Apollo 2021

Movie app built with React, Apollo and GraphQL

# 1. 시작하기

> ## 1. 프로젝트 생성하기

- `npx create-react-app apollo_2021`

> ## 2. 파일 정리하기

- Delete
  - App.css
  - App.test.js
  - indexs.css
  - logo.svg
  - serviceWorker.js
  - setupTests.js
- src 폴더 하위에 components 폴더 생성 & App.js 이동

> ## 3. title 변경하기

- index.html - tilte 수정

> ## 4. Git repository 설정하기

- `git remote add origin https://github.com/Dongdong-k/apollo_2021.git`

> ## 5. 여기서 사용할 것들

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

> ## 6. reset Css

- public 폴더 하위에 Reset.css 생성하기

# 2. Router and Styles

- routes 폴더 생성하기 : `mkdir src/routes`
- routes 폴더 내 Home.js 생성 : `touch src/routes/Home.js`  
  `export default ()=> "Home"`
- routes 폴더 내 Detail.js 생성 : `touch src/routes/Detail.js`  
  `export default ()=> "Detail"`
- App.js Router 설정  
   기능 : 주소에 따라 출력하는 홈페이지 다르게 설정
    <details>
    <summary>Code</summary>
    <div markdown="1">

  ```javascript
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

  </div>
  </details>

# 3. Apollo Clinet

GraphQL 은 단순히 데이터베이스를 제공하는 언어이고 여기로부터 요청하여 데이터를 가져오고 정리하는 역할을 별도로 구성이 필요함.  
이 역할을 해주는 것이 Apollo 임.  
REST API 는 JSON 형식으로 정보 제공  
Graph QL 에서는 Query를 Axios fetch, POST request 보내 원하는 정보를 받음  
데이터가 필요할 때마다 위 내용을 반복해야 하는데, 이를 apollo가 대신해줌.

  <details>
  <summary>Code : index.js</summary>
  <div markdown="1">

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./apollo";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
```

  </div>
  </details>

  <details>
  <summary>Code : apollo.js</summary>
  <div markdown="1">

```javascript
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

export default client;
```

  </div>
  </details>

# Movie App

> ## 1. GET Movies Query

- 필요 정보를 요청하는 Query를 javascript로 작성
- Javascript는 Graph QL 이해하지 못함 -> `import {gql} from "apollo-boost";`
- 원하는 정보를 Query로 작성 & useQuery 활용하여 데이터 저장하기

  <details>
  <summary>Code : Home.js</summary>
  <div markdown="1">

  ```javascript
  import React from "react";
  import { gql } from "apollo-boost";
  import { useQuery } from "@apollo/client";

  // 필요한 데이터를 Query로 작성하기
  const GET_MOVIES = gql`
    {
      movies {
        id
        title
        medium_cover_image
      }
    }
  `;

  // useQuery를 활용하여 요청한 Query 데이터 저장
  export default () => {
    const { loading, error, data } = useQuery(GET_MOVIES);
    if (loading) {
      return "Loading...";
    }
    if (error) {
      return "error...";
    }
    if (data && data.movies) {
      console.log(data);
      return data.movies.map((data) => <h1>{data.title}</h1>);
    }
  };
  ```

  </div>
  </details>

> ## 2. GET Movie Query

- Home

  - graphQL로부터 데이터를 받고 id를 Movie로 할당 : `useQuery`, `data.movies.map`
  - id 클릭시 url/id 로 연결된 주소로 이동 : `<Movie>`
  - id 클릭하여 해당 url/id로 이동시 새로운 페이지 연결(Detail) : `<App> & <Router>`
      <details>
      <summary>Code</summary>
      <div markdown="1">

    ```javascript
    import React from "react";
    import { gql } from "apollo-boost";
    import { useQuery } from "@apollo/client";
    import styled from "styled-components";
    import Movie from "../components/Movie";

    // 필요한 데이터를 Query로 작성하기
    const GET_MOVIES = gql`
      {
        movies {
          id
          title
          medium_cover_image
        }
      }
    `;

    const Container = styled.div`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    `;
    const Header = styled.header`
      background-image: linear-gradient(-45deg, #d754ab, #fd723a);
      height: 45vh;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    `;
    const Title = styled.h1`
      font-size: 60px;
      font-weight: 600;
      margin-bottom: 20px;
    `;
    const Subtitle = styled.h3`
      font-size: 35px;
    `;
    const Loading = styled.div`
      font-size: 18px;
      opacity: 0.5;
      font-weight: 500;
      margin-top: 10px;
    `;

    // useQuery를 활용하여 요청한 Query 데이터 저장
    export default () => {
      const { loading, data } = useQuery(GET_MOVIES);

      return (
        <Container>
          <Header>
            <Title>Apollo 2021</Title>
            <Subtitle>I love GraphQL</Subtitle>
          </Header>
          {loading && <Loading>Loading...</Loading>}
          {!loading &&
            data.movies &&
            data.movies.map((m) => <Movie key={m.id} id={m.id} />)}
        </Container>
      );
    };
    ```

  </div>
  </details>

- Movie

  - id와 연결되는 URL/id 설정 : `<Link>`
    <details>
    <summary>Code</summary>
    <div markdown="1">

    ```javascript
    import react from "react";
    import { Link } from "react-router-dom";

    // <a herf> </a> 사용시 react app 리셋되는 현상 발생 => link 사용

    export default ({ id }) => (
      <div>
        <Link to={`/${id}`}>{id}</Link>
      </div>
    );
    ```

    </div>
    </details>

- Detail.js

  - URL로부터 id 값 추출하기 : `useParams()`
  - 특정 인자가 필요한 Query 작성하기 : `GET_MOVIE`
    <details>
    <summary>Code</summary>
    <div markdown="1">

    ```javascript
    import React from "react";
    import { useParams } from "react-router-dom";
    import { useQuery } from "@apollo/client";
    import { gql } from "apollo-boost";

    const GET_MOVIE = gql`
      query getMovie($id: Int!) {
        movie(id: $id) {
          id
          title
          medium_cover_image
          description_intro
        }
      }
    `;

    export default () => {
      const { id } = useParams();
      const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id },
      });
      console.log(loading, data);
      if (loading) {
        return "Loading...";
      }
      if (data && data.movie) {
        return data.movie.title;
      }
    };
    ```

    </div>
    </details>
