import './App.css';
import AllRoutes from './routes/Routes';
import { ToastContainer } from "react-toastify";
import BreakpointsProvider from 'providers/BreakPointProvider';
import { ThemeProvider } from 'providers/ThemeProvider';
import { ReduxProvider } from 'providers/ReduxProvider';

function App() {
  return (
    <ReduxProvider>
      <ThemeProvider>
        <BreakpointsProvider>
          <ToastContainer />
          <AllRoutes />

        </BreakpointsProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
