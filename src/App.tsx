
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalProvider } from '@/contexts/GlobalContext';
import { CommunicationProvider } from '@/contexts/CommunicationContext';
import { OperationsProvider } from '@/contexts/OperationsContext';
import { TaskProvider } from '@/contexts/TaskContext';
import { EnterpriseProvider } from '@/contexts/EnterpriseContext';
import { FinanceProvider } from '@/contexts/FinanceContext';
import { MessagingProvider } from '@/contexts/MessagingContext';
import { EventsProvider } from '@/contexts/EventsContext';
import { OperationsDataProvider } from '@/contexts/OperationsDataContext';
import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import ErrorBoundary from '@/components/ErrorBoundary';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <BrowserRouter>
              <AuthProvider>
                <GlobalProvider>
                  <CommunicationProvider>
                    <OperationsProvider>
                      <TaskProvider>
                        <EnterpriseProvider>
                          <FinanceProvider>
                            <MessagingProvider>
                              <EventsProvider>
                                <OperationsDataProvider>
                                  <Suspense fallback={<div>Loading...</div>}>
                                    <AuthenticatedLayout />
                                  </Suspense>
                                </OperationsDataProvider>
                              </EventsProvider>
                            </MessagingProvider>
                          </FinanceProvider>
                        </EnterpriseProvider>
                      </TaskProvider>
                    </OperationsProvider>
                  </CommunicationProvider>
                </GlobalProvider>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
        <Sonner />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
