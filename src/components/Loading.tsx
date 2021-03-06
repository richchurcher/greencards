import React, { FC } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
`;

// Credit: adapted from https://loading.io/css/
const Spinner = styled.div`
  display: flex;
  position: relative;
  width: 80px;
  height: 80px;
  align-self: center;

  & div {
    position: absolute;
    border: 4px solid #000;
    opacity: 1;
    border-radius: 50%;
    animation: ${spin} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  & div:nth-child(2) {
    animation-delay: -0.5s;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const Loading: FC = () => (
  <LoadingContainer>
    <Spinner>
      <div></div>
      <div></div>
    </Spinner>
  </LoadingContainer>
);

export default Loading;
