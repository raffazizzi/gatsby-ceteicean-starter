import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const mainColor = "#dc3522"
const secondaryColor = "#fbebda"

const theme = createMuiTheme({
  typography: {
    fontFamily: "EB Garamond, Serif",
    body1: {
      fontSize: "1.4rem",
      paddingBottom: "1rem",
    },
    body2: {
      fontSize: "1.2rem",
      paddingBottom: "1rem",
    },
    subtitle1: {
      fontSize: "1.4rem",
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        "@font-face": [
          {
            fontFamily: "EB Garamond",
            fontStyle: "normal",
            fontDisplay: "swap",
            fontWeight: 400,
          },
        ],
        "a, a:visited, a:hover, a:active": {
          color: mainColor,
        },
        body: {
          color: "#444",
        },
        "h1, h2, h3, h4, h5, h6": {
          color: "#333",
        },
      },
    },
  },
  palette: {
    primary: {
      main: mainColor,
    },
    secondary: {
      main: secondaryColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
})

export default theme
