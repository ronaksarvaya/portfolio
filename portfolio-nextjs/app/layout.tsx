import type { Metadata } from "next";
import { Inter, Poppins, Inconsolata } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({ 
  weight: ['200', '400', '700'],
  subsets: ["latin"],
  variable: '--font-poppins',
});

const inconsolata = Inconsolata({ 
  subsets: ["latin"],
  variable: '--font-inconsolata',
});

export const metadata: Metadata = {
  title: "Ronak Sarvaya - Portfolio",
  description: "Front-End Developer & B.Sc.IT Student",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${inconsolata.variable}`}>
        {children}
      </body>
    </html>
  );
}
