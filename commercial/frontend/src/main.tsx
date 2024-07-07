import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import authInstance from './lib/keycloak.lib.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={authInstance}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ReactKeycloakProvider>
);
