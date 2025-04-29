import {ReactNode} from "react";
import "./globals.css";
import HeaderComponent from "@/components/shared/header/header.component";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <HeaderComponent/>
        <main className='pt-16'>{children}</main>
        </body>
        </html>
    );
}
