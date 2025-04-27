import {ReactNode} from "react";
import "./globals.css";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body>
        <main>{children}</main>
        </body>
        </html>
    );
}
