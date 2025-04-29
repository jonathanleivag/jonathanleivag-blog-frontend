import {AnimatePresence, motion} from "framer-motion";
import {MenuButtonComponentProps, PathProps} from "@/type";
import {FC} from "react";

const Path = (props: PathProps) => (
    <motion.path
        fill="transparent"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
        {...props}
    />
);


const MenuButtonComponent: FC<MenuButtonComponentProps> = ({isMenuOpen}) => (
    <motion.svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="h-6 w-6"
    >
        <AnimatePresence mode="wait">
            {isMenuOpen ? (
                <>
                    <Path
                        initial={{d: "M 4 6 L 20 6"}}
                        animate={{
                            d: "M 6 18 L 18 6",
                            transition: {duration: 0.3}
                        }}
                    />
                    <Path
                        initial={{d: "M 4 12 L 20 12", opacity: 1}}
                        animate={{
                            opacity: 0,
                            transition: {duration: 0.3}
                        }}
                    />
                    <Path
                        initial={{d: "M 4 18 L 20 18"}}
                        animate={{
                            d: "M 6 6 L 18 18",
                            transition: {duration: 0.3}
                        }}
                    />
                </>
            ) : (
                <>
                    <Path
                        initial={{d: "M 6 18 L 18 6"}}
                        animate={{
                            d: "M 4 6 L 20 6",
                            transition: {duration: 0.3}
                        }}
                    />
                    <Path
                        initial={{opacity: 0}}
                        animate={{
                            d: "M 4 12 L 20 12",
                            opacity: 1,
                            transition: {duration: 0.3}
                        }}
                    />
                    <Path
                        initial={{d: "M 6 6 L 18 18"}}
                        animate={{
                            d: "M 4 18 L 20 18",
                            transition: {duration: 0.3}
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    </motion.svg>
);

export default MenuButtonComponent;