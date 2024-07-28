import { registerRootComponent } from "expo";
import { ThemeProvider } from "styled-components/native";
import { Todo } from "./Todo";
import { SafeAreaProvider } from "react-native-safe-area-context";

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
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <Todo />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App);
