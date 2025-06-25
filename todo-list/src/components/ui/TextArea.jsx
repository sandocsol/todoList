import React from "react";
import styled from "styled-components";

const StyledTextArea = styled.textarea`
    ${(props)=>props.height && `height: ${props.height}px;`}
    ${(props)=>props.width && `width: ${props.width}px;`}
    padding: 20px;
    font-size: 20px;
    line-height: 24px;
    border: none;
    resize: none;
    background: #F8F4E8;
    &::placeholder{
        color:#919191
    }
`;

function TextArea(props){
    const { height, width, value, onChange, placeholder } = props;
    return <StyledTextArea height={height} width={width} value={value} onChange={onChange} placeholder={placeholder}/>
};

export default TextArea;