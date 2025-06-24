import styled from 'styled-components';
import background from '../../assets/image 2.png'; 
import logoText from '../../assets/logo1.png';
import logoIcon from '../../assets/logo2.png';
import Button from '../ui/Button';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import TextInput from '../ui/TextInput';

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
`
const LogoIcon = styled.img`
    height: 430px;
`

const Content = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LoginBox = styled.div`
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

export default function LoginPage() {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

  return (
    <Wrapper>
      <Content>
        <LogoBox>
            <LogoText src={logoText} alt="Logo Text" />
            <LogoIcon src={logoIcon} alt="Logo Icon" />
        </LogoBox>

        <LoginBox>
          <Rect style={{top: '80px', left: '23px'}}/>
          <Rect style={{top: '154px', left: '23px'}}/>
          <Rect style={{top: '313px', left: '23px'}}/>
          <Rect style={{top: '387px', left: '23px'}}/>

            <p style={{fontSize: '20px', marginBottom: '15px', color: '#7d7d7d'}}>아이디</p>
          <TextInput placeholder="아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)} />
            <p style={{fontSize: '20px', marginTop: '15px', color: '#7d7d7d'}}>비밀번호</p>
          <TextInput placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button color="green" onClick={() => {navigate('/todo/1');}}>로그인</Button>
          <Button color="white" hover="#e6e3de" onClick={() => {navigate('/register');}}>회원가입</Button>
        </LoginBox>
      </Content>
    </Wrapper>
  );
}
