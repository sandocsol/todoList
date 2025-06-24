import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${props => props.color === 'green' ? '#169246' : 'white'};
  color: ${props => props.color === 'green' ? 'white' : '#169246'};
  height: 43px;
  width: 592px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 16px;
  border: 1px #169246 solid;
  border-radius: 15px;
  padding: 10px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.hover || '#0f7536'};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;