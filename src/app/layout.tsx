import {ReactNode} from "react";
import "./globals.css";
import HeaderComponent from "@/components/header/header.component";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body>
        <HeaderComponent/>
        <main>{children}</main>
        </body>
        </html>
    );
}
