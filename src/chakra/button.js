export const Button = {
  baseStyle: {
    display: "flex",
    gap: "2",
    borderRadius: "full",
    fontSize: "1rem",
    fontWeight: 500,
    _focus: {
      boxShadow: "none",
    },
    fontFamily: "Urbanist, sans-serif",
  },
  sizes: {
    sm: {
      fontSize: ".875rem",
    },
    md: {
      fontSize: "1rem",
    },
    lg: {
      fontSize: "1rem",
      padding: "25px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "branddark.500",
      _hover: {
        bg: "branddark.400",
      },
    },
    outline: {
      color: "branddark.500",
      border: "1px solid",
      borderColor: "gray.200",
    },
    accent: {
      color: "white",
      bg: "brand.500",
      _hover: {
        bg: "brand.400",
      },
    },
  },
}
