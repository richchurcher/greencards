import React, { FC } from "react";
import styled from "styled-components";
import { useQuiz } from "../hooks/useQuiz";
import { media } from "../theme";

interface AnswerIndicatorProps {
  answer: string;
}

const Indicator = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.goldCrayola};
  background-color: ${({ theme }) => theme.lemonMeringue};
  font-weight: bold;
  font-size: 1.5rem;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile`
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  `}
`;

const Correct = styled(Indicator)`
  color: ${({ theme }) => theme.darkSeaGreen};
`;

const Incorrect = styled(Indicator)`
  color: ${({ theme }) => theme.accent};
`;

const AnswerIndicator: FC<AnswerIndicatorProps> = ({ answer }) => {
  const { question } = useQuiz();
  return answer === question.correct_answer ? (
    <Correct>✓</Correct>
  ) : (
    <Incorrect>✗</Incorrect>
  );
};

export default AnswerIndicator;
