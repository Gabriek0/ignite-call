import { Text, styled } from "@ignite-ui/react";

export const CalendarContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "$6",

  padding: "$6",
});

export const CalendarHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const CalendarTitle = styled(Text, {
  fontWeight: "$medium",

  span: {
    color: "$gray200",
  },
});

export const CalendarActions = styled("div", {
  display: "flex",
  gap: "$2",
  color: "$gray200",

  button: {
    all: "unset",
    cursor: "pointer",
    lineHeight: 0, // remove lineHeight from svg
    borderRadius: "$sm",

    svg: {
      height: "$5",
      width: "$5",
    },

    "&:hover": {
      color: "$gray100",
    },

    "&:focus": {
      boxShadow: "0 0 0 2px $colors$gray100",
    },
  },
});

export const CalendarDay = styled("button", {
  all: "unset",
  width: "100%",

  aspectRatio: "1 / 1", // height and width dynamic

  cursor: "pointer",
  background: "$gray600",
  textAlign: "center",

  borderRadius: "$sm",

  "&:focus": {
    boxShadow: "0 0 0 2px $colors$gray100",
  },

  "&:disabled": {
    cursor: "default",
    background: "none",
    opacity: 0.4,
  },

  "&:not(:disabled):hover": {
    background: "$gray600",
  },
});

export const CalendarBody = styled("table", {
  width: "100%",

  fontFamily: "$default",

  tableLayout: "fixed", // algorithm
  borderSpacing: "0.25rem",

  "thead th": {
    color: "$gray200",
    fontWeight: "$medium",
    fontSize: "$sm",
  },

  "tbody:before": {
    content: ".",
    display: "block",
    color: "$gray800",
    lineHeight: "0.75rem",
  },

  "tbody td": {
    boxSizing: "border-box",
  },
});
