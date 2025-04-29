import {FC} from "react";
import {motion} from "framer-motion";

const TitleComponent:FC = () => {
    return <div className="max-w-4xl mx-auto mb-16">
        <div className="relative">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-5xl font-bold flex flex-col md:flex-row items-center gap-3"
            >
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "3rem" }}
                    transition={{ delay: 0.2 }}
                    className="h-[2px] bg-primary-400 hidden md:block"
                />
                <span className="text-white">Proyectos</span>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-primary-400 relative"
                >
                    Destacados
                    <motion.svg
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute -bottom-2 left-0 w-full"
                        viewBox="0 0 100 10"
                    >
                        <path
                            d="M0 5 Q 25 0, 50 5 T 100 5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="text-primary-400"
                        />
                    </motion.svg>
                </motion.span>
            </motion.h2>
        </div>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="absolute -top-4 -left-4 w-32 h-32 bg-primary-400 rounded-full blur-3xl -z-10"
        />
    </div>
}

export default TitleComponent;
