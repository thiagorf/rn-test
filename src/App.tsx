import { registerRootComponent } from "expo";
import { ThemeProvider } from "styled-components";
import { Todo } from "./Todo";

const COLORS = {
  default: "#7B2CBF",
  defaultLight: "#B68ADC",
  secondary: "#E2E2E2",
};

const theme = {
  colors: COLORS,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Todo />
    </ThemeProvider>
  );
}

registerRootComponent(App);
