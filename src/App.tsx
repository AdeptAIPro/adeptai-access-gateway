
import { AppProvider } from "./providers/AppProvider";
import AppRoutes from "./routes";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import GlobalErrorDialog from "./components/error-handling/GlobalErrorDialog";

function App() {
  return (
    <ErrorBoundary variant="fullscreen">
      <AppProvider>
        <AppRoutes />
        <GlobalErrorDialog />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
