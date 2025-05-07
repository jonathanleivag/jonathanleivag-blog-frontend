import {FC} from "react";
import {motion} from "framer-motion";

const LoadingScreen: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut"
                }}
                className="mb-8 animate-float"
            >
                <div className="h-16 w-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">B</span>
                </div>
            </motion.div>

            <div className="w-48 h-1.5 bg-primary-100 rounded-full overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "linear"
                    }}
                    className="h-full bg-primary-600"
                />
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-600 text-sm font-medium"
            >
                Cargando contenido...
            </motion.p>

            <div className="flex space-x-2 mt-4">
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: "reverse",
                            duration: 0.5,
                            delay: index * 0.15
                        }}
                        className="w-2 h-2 bg-primary-500 rounded-full"
                    />
                ))}
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 -left-4 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50 animate-float" />
                <div className="absolute bottom-1/4 -right-4 w-72 h-72 bg-accent-100 rounded-full blur-3xl opacity-50 animate-float-delayed" />
            </div>
        </div>
    );
};

export default LoadingScreen;
