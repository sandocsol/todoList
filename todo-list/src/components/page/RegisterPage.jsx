import styled from 'styled-components';
import background from '../../assets/image 2.png'; 
import logoText from '../../assets/logo1.png';
import logoIcon from '../../assets/logo2.png';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
`;

const LogoBox = styled.div`
  position: absolute;
  top: 0px;
  left: 500px;
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 32px;
`;

const LogoText = styled.img`
  height: 89px;
`;

const LogoIcon = styled.img`
  height: 430px;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const RegisterBox = styled.div`
  width: 796px;
  height: 479px;
  background: #F3ECE1;
  box-shadow: 2px 4px 9px 4px rgba(0, 0, 0, 0.25);
  border-radius: 52px;
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 170px;
`;

const Rect = styled.div`
  width: 24px;
  height: 24px;
  position: absolute;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25) inset;
`;

export default function RegisterPage() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {


    try {
      await axios.post('http://ec2-54-180-106-153.ap-northeast-2.compute.amazonaws.com:8000/api/users/register/', {
        username: id,
        password,
      });
      alert('회원가입이 완료되었습니다.');
      navigate('/'); // 로그인 페이지로 이동
    } catch (error) {
  if (error.response) {
    console.error("회원가입 실패 - 응답 데이터:", error.response.data);
    console.error("회원가입 실패 - 상태 코드:", error.response.status);
  } else {
    console.error("회원가입 실패 - 기타 오류:", error.message);
  }
  alert("회원가입에 실패했습니다.");
}
  };

  return (
    <Wrapper>
      <Content>
        <LogoBox>
          <LogoText src={logoText} alt="Logo Text" />
          <LogoIcon src={logoIcon} alt="Logo Icon" />
        </LogoBox>

        <RegisterBox>
          <Rect style={{top: '80px', left: '23px'}}/>
          <Rect style={{top: '154px', left: '23px'}}/>
          <Rect style={{top: '313px', left: '23px'}}/>
          <Rect style={{top: '387px', left: '23px'}}/>

          <p style={{fontSize: '20px', marginBottom: '15px', color: '#7d7d7d'}}>아이디</p>
          <TextInput placeholder="아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)} />

          <p style={{fontSize: '20px', marginBottom: '15px', color: '#7d7d7d'}}>비밀번호</p>
          <TextInput placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />

          <Button color="green" onClick={handleRegister}>회원가입</Button>
          <Button color="white" hover="#e6e3de" onClick={() => {navigate('/');}}>로그인으로 돌아가기</Button>
        </RegisterBox>
      </Content>
    </Wrapper>
  );
}
