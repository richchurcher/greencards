import { css } from "styled-components";

const screenMins = {
  mobile: 320,
  tablet: 481,
  laptop: 769,
  desktop: 1025,
  wide: 1201,
};

// And yes, the intense creativity of https://coolors.co/fe5d26-f2c078-faedca-c1dbb3-7ebc89 is in
// use, and not my dashingly brilliant sense of colour...
const theme = {
  // base
  accent: "#FE5D26", // "international orange aerospace", apparently
  goldCrayola: "#F2C078",
  lemonMeringue: "#FAEDCA",
  teaGreen: "#C1DBB3",
  darkSeaGreen: "#7EBC89",

  // util
  greyAccent20: "#00000033",
  label60: "#00000099",
  label90: "#000000E6",
  lemonMeringue90: "#FAEDCAF2",
};

// https://github.com/styled-components/styled-components/blob/master/packages/styled-components/docs/tips-and-tricks.md
export const media = {
  mobile: (literals: TemplateStringsArray) => css`
    @media (max-width: ${screenMins.tablet}px) {
      ${css(literals)}
    }
  `,
  tablet: (literals: TemplateStringsArray) => css`
    @media (min-width: ${screenMins.tablet}px) and (max-width: ${screenMins.laptop -
      1}px) {
      ${css(literals)}
    }
  `,
  laptop: (literals: TemplateStringsArray) => css`
    @media (min-width: ${screenMins.laptop}px) and (max-width: ${screenMins.desktop -
      1}px) {
      ${css(literals)}
    }
  `,
  desktop: (literals: TemplateStringsArray) => css`
    @media (min-width: ${screenMins.desktop}px) and (max-width: ${screenMins.wide -
      1}px) {
      ${css(literals)}
    }
  `,
  wide: (literals: TemplateStringsArray) => css`
    @media (min-width: ${screenMins.wide}px) {
      ${css(literals)}
    }
  `,
};

export default theme;
