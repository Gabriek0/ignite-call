import { Box, Text, TextArea, styled } from "@ignite-ui/react";

export const ConfirmForm = styled(Box, {
  display: "flex",
  flexDirection: "column",
  gap: "$6",

  margin: "$6 auto 0",
  maxWidth: "540px",

  label: {
    [`${Text}`]: {
      marginBottom: "$2",
    },

    [`${TextArea}`]: {
      width: "100%",
    },
  },
});

export const FormHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "$4",

  paddingBottom: "$6",
  borderBottom: "1px solid $gray600",

  [`> ${Text}`]: {
    display: "flex",
    alignItems: "center",
    gap: "$2",

    "& svg": {
      height: "$5",
      width: "$5",

      flexShrink: 0,
      lineHeight: 0,

      color: "$gray200",
    },
  },
});

export const FormError = styled(Text, {
  marginTop: "$2",

  color: "#f75a68",
});

export const FormActions = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: "$2",

  marginTop: "$2",

  width: "100%",
});
