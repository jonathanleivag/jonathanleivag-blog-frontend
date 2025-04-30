import {ReactNode} from "react";
import "./globals.css";
import HeaderComponent from "@/components/shared/header/header.component";
import FooterComponent from "@/components/shared/footer.component";
import StoreProvidere from "@/lib/redux/StoreProvider";

export default function RootLayout({children,}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="es">
        <body className='min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
        <HeaderComponent/>
        <StoreProvidere>
            <main className='pt-16'>{children}</main>
        </StoreProvidere>
        <FooterComponent />
        </body>
        </html>
    );
}
