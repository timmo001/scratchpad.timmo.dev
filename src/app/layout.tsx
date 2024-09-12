import "~/styles/prosemirror.css";
import "~/styles/globals.css";

import { type Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { dark } from "@clerk/themes";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";

import { cn } from "~/lib/utils";
import { Header } from "~/components/header";
import { HydrateClient } from "~/trpc/server";
import { ThemeProvider } from "~/components/theme-provider";
import { TRPCReactProvider } from "~/trpc/react";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Scratchpad",
  description: "A simple single-page notepad",
  keywords: ["scratchpad", "notepad"],
  icons: [{ rel: "icon", url: "/icon" }],
  metadataBase: new URL("https://scratchpad.timmo.dev"),
  openGraph: {
    images: [
      {
        url: "/api/og",
      },
    ],
    siteName: "Scratchpad",
    url: "https://scratchpad.timmo.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TRPCReactProvider>
              <HydrateClient>
                <Header />
                <main
                  className="container flex min-h-screen flex-col items-center justify-around gap-12 px-4 py-4"
                  style={{
                    minHeight: "calc(100vh - 64px)",
                  }}
                >
                  <SignedOut>
                    <section className="flex flex-col items-center justify-center gap-8">
                      <div className="transform rounded-md bg-violet-800/80 px-4 py-2 text-white shadow-lg drop-shadow-2xl transition duration-300 hover:scale-105 hover:bg-violet-800">
                        <SignInButton mode="modal">Please Sign In</SignInButton>
                      </div>
                    </section>
                  </SignedOut>
                  <SignedIn>{children}</SignedIn>
                </main>
              </HydrateClient>
            </TRPCReactProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
