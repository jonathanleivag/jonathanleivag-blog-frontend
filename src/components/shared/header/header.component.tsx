'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {CldImage} from 'next-cloudinary';
import NavbarComponent, {NavbarMobilComponent} from "@/components/shared/header/navbar.component";
import SocialComponent from "@/components/shared/header/social.component";
import MenuButtonComponent from "@/components/shared/header/menuButton.component";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import toast from "react-hot-toast";
import {SocialData} from "@/type";
import {useAppDispatch} from "@/lib/redux/hooks";
import {initialDataSocial} from "@/lib/redux/features/social/social.slice";

const HeaderComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = useIsLoggedIn();
    const appDispatch = useAppDispatch()

    useEffect(() => {
        const dataFetch = async () => {
            try {
                const response = await fetch('/api/social', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                const data: SocialData = await response.json()

                if (data.error === null) {
                    appDispatch(initialDataSocial(data))
                } else {
                    toast.error(data.error)
                }

            } catch (e) {
                if (e instanceof Error) {
                    console.error(e.message)
                    toast.error(e.message)
                }
            }
        }
        void dataFetch()
    }, [appDispatch]);

    const headerVariants = {
        hidden: {y: -100},
        visible: {
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.header
            className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-50 fixed w-full top-0 z-50 shadow-lg shadow-black/30"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{scale: 1.1}}
                        whileTap={{scale: 0.95}}
                    >
                        <Link
                            href="/"
                            className="text-2xl font-bold text-accent-400 hover:text-accent-300 transition-colors flex items-center gap-2"
                        >
                            <CldImage
                                src="jonathanleivag/logo/ohbxjqje4kelihconfov"
                                width="50"
                                height="50"
                                alt='Logo of the website jonathanleivag'
                                crop={{type: 'auto', source: true}}
                            />
                            JonathanLeivaG
                        </Link>
                    </motion.div>

                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <NavbarComponent/>
                        <div className="h-6 w-px bg-gray-700"/>
                        <SocialComponent/>
                        {isLoggedIn && (
                            <motion.div
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                transition={{delay: 0.5, duration: 0.4}}
                            >
                                <Link
                                    href="/dashboard"
                                    className="px-5 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-accent-300 font-semibold shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:bg-white/20 hover:text-white transition-all duration-300 border border-white/10"
                                >
                                    Panel
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    <motion.div
                        className="md:hidden"
                        whileTap={{scale: 0.9}}
                    >
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-md text-gray-100 hover:text-accent-400 focus:outline-none"
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <MenuButtonComponent isMenuOpen={isMenuOpen}/>
                        </button>
                    </motion.div>
                </div>

                <NavbarMobilComponent isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
            </div>
        </motion.header>
    );
};

export default HeaderComponent;
