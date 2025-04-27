
import { AppProvider } from "./providers/AppProvider";
import AppRoutes from "./AppRoutes";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
