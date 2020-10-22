import React, { FC } from "react";
import styled from "styled-components";
import { media } from "../theme";
import Score from "./Score";

const Header = styled.header`
  background-color: ${({ theme }) => theme.goldCrayola};
  height: 3rem;
  border-bottom: 0.2rem solid ${({ theme }) => theme.greyAccent20};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.label90};
`;

const Subtitle = styled.span`
  font-style: italic;
  font-size: 0.8rem;
  font-weight: normal;
  margin-left: 0.5rem;

  ${media.mobile`
    display: block;
    margin-bottom: 0.5rem;
  `}
  ${media.tablet`
    display: block;
    margin-bottom: 0.5rem;
  `}
`;

const Title = styled.h1`
  font-size: 1.5rem;

  ${media.mobile`
    font-size: 1.2rem;
  `}
`;

const QuizHeader: FC = () => (
  <Header>
    <Title>
      GreenCards
      <Subtitle>(Not the kind you're thinking of.)</Subtitle>
    </Title>
    <Score />
  </Header>
);

export default QuizHeader;
