import { Box, styled } from "@ignite-ui/react";

export const Container = styled(Box, {
  padding: 0,
  margin: "$6 auto 0",

  display: "grid",
  position: "relative",
  maxWidth: "100%",

  width: 540,
  gridTemplateColumns: "1fr",
});
