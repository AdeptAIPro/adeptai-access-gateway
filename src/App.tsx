
import { AppProvider } from "./providers/AppProvider";
import AppRoutes from "./routes";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import GlobalErrorDialog from "./components/error-handling/GlobalErrorDialog";
import { ToastProvider } from "./providers/ToastProvider";

function App() {
  return (
    <ErrorBoundary variant="fullscreen">
      <AppProvider>
        <ToastProvider />
        <AppRoutes />
        <GlobalErrorDialog />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
