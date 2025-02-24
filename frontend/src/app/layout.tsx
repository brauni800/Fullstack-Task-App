import { ToastContainer } from "react-toastify"

import { AuthProvider } from "@/context/AuthContext"
import SWRProvider from "@/lib/plugins/SWRProvider"
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ToastContainer />
        <SWRProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
