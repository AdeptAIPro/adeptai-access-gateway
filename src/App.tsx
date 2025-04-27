
import { AppProvider } from "./providers/AppProvider";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
