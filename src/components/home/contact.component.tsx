"use client"
import {FC} from "react";
import {motion} from "framer-motion";
import {useAppSelector} from "@/lib/redux/hooks";
import IconComponent from "@/components/shared/icon.component";
import Link from "next/link";

const ContactComponent: FC = () => {

  const socials = useAppSelector(state => state.social.socials)

  const infoContact = [
    {
      icon: <IconComponent icon={'linkedin'} />,
      title: "Linkedin",
      content: "jonathanleivag",
      link: socials.data.socials.find(social => social.icon === 'linkedin')?.url ?? ''
    },
    {
      icon: <IconComponent icon={'instagram'} />,
      title: "Escríbenos",
      content: "@jonathanleivag",
      link: socials.data.socials.find(social => social.icon === 'instagram')?.url ?? ''
    }
  ]

  return (
    <section className="min-h-screen relative overflow-hidden py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50"
      ></motion.div>

      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          whileInView={{ opacity: 0.2, scale: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                   bg-gradient-to-br from-blue-200/20 to-cyan-200/20 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -100 }}
          whileInView={{ opacity: 0.2, scale: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full
                   bg-gradient-to-tr from-emerald-200/20 to-sky-200/20 blur-3xl"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Conectemos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Estamos aquí para transformar tus ideas en realidad
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <input
                type="text"
                placeholder="Asunto"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />

              <textarea
                rows={6}
                placeholder="Tu mensaje"
                className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
              />

              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300"
              >
                Enviar Mensaje
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            {infoContact.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="flex items-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center w-full cursor-pointer"
                >
                  <div className="text-2xl bg-emerald-100 p-4 rounded-xl">
                    {item.icon}
                  </div>
                  <div className="ml-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.content}
                    </p>
                  </div>
                </Link>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactComponent;
