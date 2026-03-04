import BreakpointsProvider from 'components/BreakPointProvider';
import './App.css';
import { AppProvidersWrapper } from './components/AppProvidersWrapper';
import { ReduxProviderWrapper } from './components/ReduxProviderWrapper';
import AllRoutes from './routes/Routes';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ReduxProviderWrapper>
      <AppProvidersWrapper>
        <BreakpointsProvider>
          <ToastContainer />
          <AllRoutes />

        </BreakpointsProvider>
      </AppProvidersWrapper>
    </ReduxProviderWrapper>
  );
}

export default App;
