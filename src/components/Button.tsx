import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.lemonMeringue};
  border: 0.2rem solid ${({ theme }) => theme.darkSeaGreen};
  border-radius: 1rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.label60};
  width: fit-content;
  align-self: center;

  &:hover {
    background-color: ${({ theme }) => theme.lemonMeringue90};
  }
`;

export default Button;
