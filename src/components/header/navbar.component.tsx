import {FC} from "react";
import {AnimatePresence, motion, Variants} from "framer-motion";
import Link from "next/link";
import {SocialComponentMobil} from "@/components/header/social.component";
import {NavbarMobilComponentProps} from "@/type";

const mobileMenuVariants = {
    hidden: {
        opacity: 0,
        height: 0
    },
    visible: {
        opacity: 1, // Añadimos explícitamente la opacidad
        height: "auto",
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            opacity: {duration: 0.2} // Ajustamos la transición de opacidad
        }
    },
    exit: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
            opacity: {duration: 0.2}
        }
    }
};

const menuItems = [
    {label: 'Inicio', href: '/'},
    {label: 'Noticias', href: '/noticias'},
    {label: 'Blog', href: '/blog'},
    {label: 'Proyectos', href: '/proyectos'},
    {label: 'Contacto', href: '/contacto'},
];


const menuItemVariants: Variants = {
    hidden: {opacity: 0, x: -20},
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5
        }
    })
};

export const NavbarMobilComponent: FC<NavbarMobilComponentProps> = ({isMenuOpen, setIsMenuOpen}) => {
    return <AnimatePresence>
        {isMenuOpen && (
            <motion.div
                className="md:hidden"
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 ">
                    {menuItems.map((item, i) => (
                        <motion.div
                            key={item.href}
                            variants={menuItemVariants}
                            custom={i}
                            initial="hidden"
                            animate="visible"
                        >
                            <Link
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:text-accent-400 hover:bg-primary-800 transition-colors duration-300"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        </motion.div>
                    ))}

                    {/* Redes sociales en móvil */}
                    <SocialComponentMobil/>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
}
const NavbarComponent: FC = () => {
    return <nav>
        <ul className="flex space-x-8">
            {menuItems.map((item, i) => (
                <motion.li
                    key={item.href}
                    variants={menuItemVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                >
                    <Link
                        href={item.href}
                        className="text-gray-100 hover:text-accent-400 transition-colors duration-300 font-medium border-b-2 border-transparent hover:border-accent-400"
                    >
                        {item.label}
                    </Link>
                </motion.li>
            ))}
        </ul>
    </nav>
}

export default NavbarComponent;