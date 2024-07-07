import "./App.css";

import React from "react";
import { trpcHooks } from "./trpc";
import { httpBatchLink } from "@trpc/client";
import { PlanView } from "./components/PlanView";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpcHooks.createClient({
      links: [
        httpBatchLink({
          url: `${import.meta.env.VITE_SERVER_URL}/api`,
        }),
      ],
    })
  );

  return (
    <trpcHooks.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PlanView />
      </QueryClientProvider>
    </trpcHooks.Provider>
  );
}

export default App;
