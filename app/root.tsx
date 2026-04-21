import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";
import type { Route } from "./+types/root";
import "./app.css";
import { AnchoredToastProvider, ToastProvider } from "./components/ui/toast";
import { TooltipProvider } from "./components/ui/tooltip";
// import { setupInterceptors } from "./lib/interceptors";
import "./lib/interceptors";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function meta({}: Route.MetaArgs) {
  return [{ title: "Carepulse" }, { name: "description", content: "Welcome to Carepulse!" }];
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1. The most important setting:
      // How long the data stays "fresh" before a background refetch is allowed.
      // 1-5 minutes is the sweet spot for most apps.
      staleTime: 1000 * 60 * 5,

      // 2. How long unused data stays in the cache before being deleted.
      // Usually keep this longer than staleTime.
      gcTime: 1000 * 60 * 10,

      // 3. Prevent annoying refetches when the user clicks back into the browser.
      // Set to false if your data doesn't change every few seconds.
      refetchOnWindowFocus: false,

      // 4. Retry logic: Don't spam your server if it's down.
      // Fail faster in development to debug easily.
      retry: false,

      // 5. Exponential backoff: Wait longer between each retry.
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    i18n: { language },
  } = useTranslation();

  useEffect(() => {
    if (language === "ar") {
      document.documentElement.lang = "ar-SA";
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.lang = "en-US";
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  // useEffect(() => {
  //   setupInterceptors({ location, navigate, authStore });
  // }, [authStore.auth?.accessToken]);

  return (
    <html className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <ToastProvider position="top-center">
              <AnchoredToastProvider>{children}</AnchoredToastProvider>
            </ToastProvider>
          </TooltipProvider>
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
