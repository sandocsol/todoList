import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
    width: 592px;
    height: 43px;
    border: none;
    background: white;
    border-radius: 15px;
    padding: 16px;
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 20px;
    &::placeholder{
        color:#d8d8d8
    }
`;

function TextInput(props){
    const { value, onChange, placeholder } = props;
    return <StyledTextInput value={value} onChange={onChange} placeholder={placeholder}/>
}

export default TextInput;