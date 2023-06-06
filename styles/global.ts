import { globalCss } from "@ignite-ui/react";

export const globalStyles = globalCss({
  "*": {
    margin: 0,
    padding: 0,
    boxSizing: "border-box",
  },
  body: {
    color: "$white",
    backgroundColor: "$gray900",
    "-webkit-font-smoothing": "antialiased",
  },
});
