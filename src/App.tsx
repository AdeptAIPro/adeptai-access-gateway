
import { AppProvider } from "./providers/AppProvider";
import AppRoutes from "./routes";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";
import GlobalErrorDialog from "./components/error-handling/GlobalErrorDialog";
import { ToastProvider } from "./providers/ToastProvider";
import { BrowserRouter } from "./utils/router-polyfill";

function App() {
  return (
    <ErrorBoundary variant="fullscreen">
      <AppProvider>
        <BrowserRouter basename="">
          <ToastProvider />
          <AppRoutes />
          <GlobalErrorDialog />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
