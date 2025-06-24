import styled from 'styled-components';
import background from '../../assets/image 2.png'; 
import logoText from '../../assets/logo1.png';
import logoIcon from '../../assets/logo2.png';
import Button from '../ui/Button';

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
          <Button color="green" onClick={() => {}}>로그인</Button>
          <Button color="white" hover="#e6e3de" onClick={() => {}}>회원가입</Button>
        </LoginBox>
      </Content>
    </Wrapper>
  );
}
