import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/nextAuth";
import AppBar from "../components/AppBar";
import NextAuthProvider from "../providers/NextAuthProvider";


export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>

          <AppBar />
          {children}

        </NextAuthProvider>
      </body>
    </html>
  );
}
