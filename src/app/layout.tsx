import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SpaceBackground } from "./components/space-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Galactic Fishing Game",
  description: "Leaderboard and Market for Galactic Fishing Game",
  manifest: "/manifest.json",
  themeColor: "#0a0a2a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={`${inter.className} min-h-screen bg-[#0a0a2a] text-white`}>
        <SpaceBackground />
        <div className="relative z-10">{children}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js').then(
                    function(registration) {
                      console.log('Service Worker registration successful with scope: ', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed: ', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
