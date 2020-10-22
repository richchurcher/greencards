import { action } from "mobx";
import { observer } from "mobx-react-lite";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useQuiz } from "../hooks/useQuiz";
import ControlLabel from "./ControlLabel";

const QuantityInput = styled.input`
  margin: 1rem;
  padding: 0.5rem 1rem;
  line-height: 1.3;
  font-weight: bold;
  border: 0.1rem solid ${({ theme }) => theme.goldCrayola};
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  border-radius: 0.5em;
  appearance: none;
  background-color: ${({ theme }) => theme.teaGreen};
  color: ${({ theme }) => theme.label90};

  &:hover {
    border-color: ${({ theme }) => theme.accent};
  }

  &:focus {
    border-color: ${({ theme }) => theme.lemonMeringue};
    box-shadow: 0 0 1px 3px ${({ theme }) => theme.greyAccent20};
    outline: none;
  }
`;

const QuantitySelector: FC = () => {
  const quiz = useQuiz();
  const [quantity, setQuantity] = useState<string>("1");

  const handleChange = action((evt: any) => {
    setQuantity(evt.target.value);
    let n = Number(evt.target.value);
    if (isNaN(n) || n < 1) {
      n = 1;
    }
    quiz.quantity = n;
  });

  return (
    <>
      <ControlLabel htmlFor="questionQuantity">
        How many questions would you like?
      </ControlLabel>
      <QuantityInput
        id="questionQuantity"
        type="text"
        inputMode="numeric"
        onChange={handleChange}
        value={quantity}
        pattern="[0-9]*"
        autoComplete="one-time-code"
      />
    </>
  );
};

export default observer(QuantitySelector);
