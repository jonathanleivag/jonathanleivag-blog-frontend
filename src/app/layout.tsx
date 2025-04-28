import {ReactNode} from "react";
import "./globals.css";
import HeaderComponent from "@/components/header/header.component";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <HeaderComponent/>
        <main>{children}</main>
        </body>
        </html>
    );
}
