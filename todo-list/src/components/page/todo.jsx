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

const TodoContent = styled.div`
    font-size: 20px;
    height: 50px;
    display: flex;
    align-items: center;
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

const handleCheck = (todo_id, currentChecked) => {
  axios.patch(
    `http://ec2-13-124-6-127.ap-northeast-2.compute.amazonaws.com:8000/api/todos/${user_id}/${todo_id}/check`,
    { is_checked: !currentChecked }  
  )
    .then(() => {
      fetchTodos(); 
    })
    .catch((err) => {
      console.error("체크 실패", err);
    });
};

const handleDelete = (todo_id) => {
  axios.delete(`http://ec2-13-124-6-127.ap-northeast-2.compute.amazonaws.com:8000/api/todos/${user_id}/${todo_id}`)
    .then(() => {
      fetchTodos();
    })
    .catch((err) => console.error("삭제 실패", err));
};

const [editingId, setEditingId] = useState(null);
const [editContent, setEditContent] = useState("");

const startEdit = (todo) => {
  setEditingId(todo.todo_id);
  setEditContent(todo.content);
  setEditEmoji(todo.emoji || ""); // 이모지가 없을 경우 빈 문자열로 초기화
};

const handleUpdate = () => {
  const url = `http://ec2-13-124-6-127.ap-northeast-2.compute.amazonaws.com:8000/api/todos/${user_id}/${editingId}`;
  console.log("PATCH URL:", url);

  axios.patch(url, { content: editContent , emoji: editEmoji })
    .then((res) => {
      console.log("수정 성공", res.data);
      setEditingId(null);
      setEditContent("");
      fetchTodos();
    })
    .catch((err) => {
      console.error("수정 실패", err.response?.data || err.message);
    });
};

const [editEmoji, setEditEmoji] = useState("");


  return (
    <Wrapper>
        <CalendarWrapper>
          <Calendar onChange={(date) => setSelectedDate(date)} value={selectedDate}/>
        </CalendarWrapper>
        <AddWrapper>
            <TextArea height={160} width={400} placeholder="할 일을 입력하세요." value={content} onChange={(e) => setContent(e.target.value)} />
            <Button style={{color: "white", backgroundColor: "#D70000", border: "none", boxShadow: '3px 4px 4px rgba(0, 0, 0, 0.25)', borderRadius: 20, width: 103, height:46}}
             onClick={() => {
              const dateString = selectedDate.toLocaleDateString('sv-SE');
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
            <h2 style={{ marginLeft: 50 }}>{selectedDate.toLocaleDateString('sv-SE')} TO DO</h2>
           
                {todos.map((todo) => (
                        <TodoContent key={todo.todo_id}>
                            <input
                                type="checkbox"
                                checked={todo.is_checked}
                                onChange={() => handleCheck(todo.todo_id, todo.is_checked)}
                            />
                            {editingId === todo.todo_id ? (
                                <>
                                    <input
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                    />
                                    <input
                                        value={editEmoji}
                                        onChange={(e) => setEditEmoji(e.target.value)}
                                        placeholder="😄"
                                        maxLength={2}
                                        style={{ width: "40px", textAlign: "center" }}
                                    />
                                <button onClick={handleUpdate}>저장</button>
                                <button onClick={() => setEditingId(null)}>취소</button>
                            </>
                        ) : (
                            <>
                                <div style={{ flex: 1 }}>{todo.content}</div>
                                <button onClick={() => startEdit(todo)}>✏</button>
                            </>
                        )}

                        <button onClick={() => handleDelete(todo.todo_id)}>🗑</button>
                        <div style={{ margin: '0 10px' }}>{todo.emoji}</div>
                    </TodoContent>
                ))}
        </TodoWrapper>

    </Wrapper>
  );
}

export default Todo;
