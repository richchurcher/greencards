import styled from "styled-components";
import { media } from "../theme";

const AppContainer = styled.div`
  margin: 0 0.5rem;
  ${media.tablet`margin: 0 1rem;`}
  ${media.laptop`margin: 0 3rem;`}
  ${media.desktop`margin: 0 5rem;`}
  ${media.wide`margin: 0 8rem;`}
`;

export default AppContainer;
