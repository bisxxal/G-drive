import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";  
import { Toaster } from "react-hot-toast";
const poppins = Poppins({
  subsets: ["latin"],
  weight: [ "100" , "200" , "400", "500", "600", "700" , "800"], 
});

export const metadata: Metadata = {
  title: "GDRIVE",
  description: "GDRIVE",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <html lang="en">
      <body className={poppins.className}>
      <Toaster />
        {children}</body>
    </html> 
  );
}