import {FC} from 'react';
import LoginPageComponent from "@/components/login/loginPage.component";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'Login | Blog Jonathanleivag'
}

const LoginForm: FC = () => {
    return <LoginPageComponent/>
}

export default LoginForm;
