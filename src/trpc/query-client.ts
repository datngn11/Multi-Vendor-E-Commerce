import {
  defaultShouldDehydrateQuery,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query";
import { TRPCClientError } from "@trpc/client";
import superjson from "superjson";

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
      queries: {
        staleTime: 30 * 1000,
      },
    },
    mutationCache: new MutationCache({
      onError: (error) => {
        handleGlobalError(error);
      },
    }),
    queryCache: new QueryCache({
      onError: (error) => {
        handleGlobalError(error);
      },
    }),
  });
}

function handleGlobalError(error: unknown) {
  if (error instanceof TRPCClientError && error.data?.code === "UNAUTHORIZED") {
    if (window.location.pathname === "/login") {
      return;
    }

    const currentPath = window.location.pathname + window.location.search;

    window.location.href = `/login?redirectFrom=${encodeURIComponent(
      currentPath.slice(1)
    )}`;
  }
}
