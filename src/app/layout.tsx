import {ReactNode} from "react";
import "./globals.css";
import StoreProvider from "@/lib/redux/StoreProvider";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <StoreProvider>
            {children}
        </StoreProvider>
        </body>
        </html>
    );
}
