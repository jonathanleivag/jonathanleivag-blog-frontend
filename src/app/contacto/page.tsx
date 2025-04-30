'use client';
import {FC} from 'react';
import {motion} from 'framer-motion';

const Contact: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900 text-primary-50 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-primary-100 font-serif">Contáctame</h1>
          <p className="text-gray-400 mt-2 text-sm">
            ¿Tienes alguna pregunta o propuesta? Estoy abierto a colaboraciones y nuevas ideas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 space-y-5 shadow-md hover:shadow-lg transition"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-primary-100 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-primary-50 border border-gray-600 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-primary-100 mb-1">Correo electrónico</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-primary-50 border border-gray-600 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-primary-100 mb-1">Mensaje</label>
              <textarea
                id="message"
                rows={5}
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-primary-50 border border-gray-600 hover:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-md transition"
            >
              Enviar mensaje
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-900 border border-gray-700 rounded-xl p-8 space-y-4 shadow-md"
          >
            <h2 className="text-xl font-bold text-primary-100">Información de contacto</h2>
            <p className="text-gray-300 text-sm">Puedes escribirme directamente por correo o seguirme en redes:</p>
            <ul className="text-sm text-primary-100 space-y-3">
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m-4 4l4 4" />
                </svg>
                <span>Email: <a href="mailto:contacto@jonathanleiva.dev" className="text-accent-500 hover:text-accent-300">contacto@jonathanleiva.dev</a></span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                  <path d="M12 2C6.477 2 2 6.484 2 12.012c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.153-1.11-1.46-1.11-1.46-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.908-1.296 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.7 1.028 1.594 1.028 2.687 0 3.847-2.339 4.695-4.566 4.942.359.31.678.92.678 1.855 0 1.338-.012 2.419-.012 2.75 0 .269.18.58.688.481A10.013 10.013 0 0022 12.012C22 6.484 17.523 2 12 2z" />
                </svg>
                <span>GitHub: <a href="https://github.com/jonathanleivag" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-300">jonathanleivag</a></span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-accent-500" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11.75 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.25 11.268h-3v-5.604c0-1.337-.026-3.061-1.865-3.061-1.865 0-2.151 1.457-2.151 2.963v5.702h-3v-10h2.881v1.367h.041c.401-.757 1.379-1.555 2.838-1.555 3.034 0 3.595 1.997 3.595 4.59v5.598z" />
                </svg>
                <span>LinkedIn: <a href="#" className="text-accent-500 hover:text-accent-300">linkedin.com/in/jonathanleiva</a></span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
