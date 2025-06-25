import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import styled from "styled-components";

import background from '../../assets/image 2.png'; 
import Calendar from "../ui/Calendar";
import TextArea from "../ui/TextArea";
import Button from "../ui/Button";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 42px;
  left: 80px;
`;

const AddWrapper = styled.div`
  position: absolute;
  bottom: 61px;
  left: 80px;
  width: 500px;
  height: 300px;
  padding: 16px;
  padding-top: 40px;
  background: #FFFAF3;
  color: #000;
  border-radius: 56px;
  display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

`;

const TodoWrapper = styled.div`
    position: absolute;
  top: 47px;
  right: 80px;
  width: 1000px;
  height: calc(100% - 47px - 61px);
  padding: 20px;
  background: #FFFAF3;
  color: #000;
  border-radius: 56px;
`;

function Todo() {
  const { user_id } = useParams(); // 주소에서 꺼냄
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const fetchTodos = () => {
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();
    axios.get(`http://ec2-13-124-6-127.ap-northeast-2.compute.amazonaws.com:8000/api/todos/${user_id}?month=${month}&day=${day}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.error("불러오기 실패", err));
  };

  useEffect(() => {
    fetchTodos();
  }, [user_id, selectedDate]);

  return (
    <Wrapper>
        <CalendarWrapper>
          <Calendar onChange={(date) => setSelectedDate(date)} value={selectedDate}/>
        </CalendarWrapper>
        <AddWrapper>
            <TextArea height={160} width={400} placeholder="할 일을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} />
            <Button style={{color: "white", backgroundColor: "#D70000", border: "none", boxShadow: '3px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 20, width: 103, height:46}}
             onClick={() => {
              const dateString = selectedDate.toISOString().split('T')[0];
              axios.post(`http://ec2-13-124-6-127.ap-northeast-2.compute.amazonaws.com:8000/api/todos/${user_id}`, { content, date: dateString,})
                .then((res) => {
                  setTodos([...todos, res.data]);
                  setContent("");
                  fetchTodos(); // 새로 추가된 투두를 가져오기
                  console.log("추가 성공", res.data);
                })
                .catch((err) => console.error("추가 실패", err));
            }}>추가</Button>
        </AddWrapper>
        <TodoWrapper>
            <ul>
                {todos.map(todo => <li key={todo.todo_id}>{todo.content}</li>)}
            </ul>
        </TodoWrapper>
      
    </Wrapper>
  );
}

export default Todo;
