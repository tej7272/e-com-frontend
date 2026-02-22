import './App.css';
import { AppProvidersWrapper } from './components/AppProvidersWrapper';
import { ReduxProviderWrapper } from './components/ReduxProviderWrapper';
import AllRoutes from './routes/Routes';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ReduxProviderWrapper>
      <AppProvidersWrapper>
        <ToastContainer />
        <AllRoutes />

      </AppProvidersWrapper>
    </ReduxProviderWrapper>
  );
}

export default App;
