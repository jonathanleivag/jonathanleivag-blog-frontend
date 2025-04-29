import {FC} from "react";
import {motion} from "framer-motion";

const TitleComponent: FC = () => {
    return  <div className="relative mb-16">
        <motion.div
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary-500"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
        />

        <div className="relative">
            <motion.h2
                className="text-5xl font-extrabold text-center tracking-tight"
                viewport={{ once: true, margin: "-100px" }}
            >
              <span className="inline-block overflow-hidden">
                <motion.span
                    className="inline-block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent"
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  Últimas
                </motion.span>
              </span>
                {" "}
                <span className="inline-block overflow-hidden">
                <motion.span
                    className="inline-block text-gray-900"
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  Noticias
                </motion.span>
              </span>
            </motion.h2>
        </div>

        <motion.div
            className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-primary-500"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
        />
    </div>
}

export default TitleComponent;
