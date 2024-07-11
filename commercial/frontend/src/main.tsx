import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import authInstance from './lib/keycloak/keycloak.lib.ts';
import { Provider } from 'react-redux';
import { store } from './lib/redux/index.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error): boolean => {
        console.log(error);
        if (failureCount > 5) {
          return false;
        }
        return true;
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={authInstance}>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </ReactKeycloakProvider>
);
