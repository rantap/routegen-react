import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RouteMap from './components/RouteMap';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouteMap />
    </QueryClientProvider>
  );
};

export default App;
