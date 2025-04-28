'use client';

import Link from 'next/link';
import {useState} from 'react';
import {motion} from 'framer-motion';
import {CldImage} from 'next-cloudinary';
import NavbarComponent, {NavbarMobilComponent} from "@/components/header/navbar.component";
import SocialComponent from "@/components/header/social.component";
import MenuButtonComponent from "@/components/header/menuButton.component";

const HeaderComponent = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 md:from-transparent md:via-transparent md:to-transparent text-gray-50 fixed w-full top-0 z-50"
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
                            className="text-2xl font-bold text-accent-400 hover:text-accent-300 transition-colors"
                        >
                            <CldImage
                                src="jonathanleivag/logo/ohbxjqje4kelihconfov"
                                width="50"
                                height="50"
                                alt='Logo of the website jonathanleivag'
                                crop={{
                                    type: 'auto',
                                    source: true
                                }}
                            />
                        </Link>
                    </motion.div>
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <NavbarComponent/>
                        <div className="h-6 w-px bg-gray-700"></div>
                        <SocialComponent/>
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