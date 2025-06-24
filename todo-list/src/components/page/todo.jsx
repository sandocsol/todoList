import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";

import background from '../../assets/image 2.png'; 

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;


function Todo() {
  const { user_id } = useParams(); // 주소에서 꺼냄
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(`http://ec2-13-124-6-127.ap-northeast-2.compute.amazonaws.com:8000/api/todos/${user_id}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("불러오기 실패", err));
  }, [user_id]);

  return (
    <Wrapper>
      <h2>{user_id}님의 할 일 목록</h2>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.content}</li>)}
      </ul>
    </Wrapper>
  );
}

export default Todo;
