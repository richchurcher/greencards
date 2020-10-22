import React, { FC } from "react";
import styled from "styled-components";
import Score from "./Score";

const Header = styled.header`
  background-color: ${({ theme }) => theme.goldCrayola};
  height: 3rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.greyAccent20};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
  color: ${({ theme }) => theme.label90};
`;

const Subtitle = styled.span`
  font-style: italic;
  font-size: 0.8rem;
  font-weight: normal;
  margin-left: 0.5rem;
`;

const QuizHeader: FC = () => (
  <Header>
    <h1>
      GreenCards
      <Subtitle>(Not the kind you're thinking of.)</Subtitle>
    </h1>
    <Score />
  </Header>
);

export default QuizHeader;
