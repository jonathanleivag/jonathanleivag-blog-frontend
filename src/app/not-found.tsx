import NotFound from "@/components/page/not-found";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: '404 - Página no encontrada | Blog Jonathanleivag',
}

const NotFoundPage = () => {
    return <NotFound/>;
}

export default NotFoundPage;
