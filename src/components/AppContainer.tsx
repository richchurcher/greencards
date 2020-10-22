import styled from "styled-components";
import { media } from "../theme";

const AppContainer = styled.div`
  margin: 0 1rem;
  ${media.tablet`margin: 0 3rem;`}
  ${media.laptop`margin: 0 5rem;`}
  ${media.desktop`margin: 0 10rem;`}
  ${media.wide`margin: 0 20rem;`}
`;

export default AppContainer;
