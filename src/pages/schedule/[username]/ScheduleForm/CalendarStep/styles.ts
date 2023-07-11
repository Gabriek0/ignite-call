import { Box, Text, styled } from "@ignite-ui/react";

export const Container = styled(Box, {
  padding: 0,
  margin: "$6 auto 0",

  display: "grid",
  position: "relative",
  maxWidth: "100%",

  variants: {
    isTimePickerOpen: {
      true: {
        gridTemplateColumns: "1fr 280px",

        "@media (max-width: 900px": {
          gridTemplateColumns: "1fr",
        },
      },
      false: {
        width: 540,
        gridTemplateColumns: "1fr",
      },
    },
  },
});

export const TimePicker = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "$6",

  overflowY: "scroll",

  position: "absolute",
  top: 0,
  bottom: 0,
  right: 0,

  borderLeft: "1px solid $gray600",
});

export const TimePickerHeader = styled(Text, {
  textAlign: "left",
  fontWeight: 600,

  marginBottom: "$3",

  span: {
    color: "$gray200",
  },
});

export const TimePickerList = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$2",

  width: "100%",

  [`${Text}`]: {
    textAlign: "center",
  },
});

export const TimePickerItem = styled("button", {
  cursor: "pointer",

  border: 0,
  borderRadius: "6px",
  background: "$gray600",

  padding: "$2 0",

  "&:disabled": {
    background: "none",
    cursor: "defualt",
    opacity: 0.4,
    border: "1px solid $gray500",
  },

  "&:not(:disabled):hover": {
    background: "$gray500",
  },

  "&:focus": {
    boxShadow: "0 0 0 2px $colors$gray100",
  },
});
