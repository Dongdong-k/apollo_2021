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
