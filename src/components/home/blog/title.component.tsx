import {FC} from "react";
import {motion} from "framer-motion";

const TitleComponent:FC = () => {
    return  <div className="md:w-1/3 mb-8 md:mb-0">
        <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            className="text-5xl font-bold text-white mb-4 leading-tight"
        >
            Explora Nuestro
            <span className="block text-primary-400">Blog Tech</span>
            <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: false }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute bottom-0 left-0 h-1 bg-primary-400"
            />
        </motion.h2>
        <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-200 pr-8"
        >
            Descubre las últimas tendencias, tutoriales y mejores prácticas en desarrollo web y tecnología.
        </motion.p>
    </div>
}

export default TitleComponent;
