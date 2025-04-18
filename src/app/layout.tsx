import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

export const metadata: Metadata = {
  title: "UploadThing",
  description: "Google Drive but worse",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable}`}>
        <body>
          <NextSSRPlugin
            routerConfig={[
              {
                slug: "imageUploader",
                config: {
                  image: {
                    maxFileSize: "4MB",
                    maxFileCount: 1,
                    minFileCount: 1,
                    contentDisposition: "attachment",
                  },
                },
              },
            ]}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
