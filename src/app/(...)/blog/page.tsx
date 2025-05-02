'use client';

import Image from "next/image";
import {motion} from "framer-motion";
import {FC, useState} from 'react';

const dummyPosts = [
  {
    id: 1,
    title: 'Introducción al Desarrollo Web Moderno',
    excerpt: 'Explora cómo el desarrollo web ha evolucionado en los últimos años con nuevas herramientas y tecnologías.',
    date: '2025-04-15',
    image: "/hero-image.webp",
    category: 'Desarrollo Web'
  },
  {
    id: 2,
    title: 'Tailwind CSS con Oklch: Diseños más precisos',
    excerpt: 'Descubre cómo utilizar Oklch para lograr mejores contrastes y accesibilidad en tus interfaces.',
    date: '2025-04-12',
    image: "/hero-image.webp",
    category: 'CSS'
  },
  {
    id: 3,
    title: 'React Server Components: El futuro del frontend',
    excerpt: 'Analizamos cómo los Server Components están cambiando la forma de estructurar aplicaciones en React.',
    date: '2025-04-10',
    image: "/hero-image.webp",
    category: 'React'
  }
];

const Blog: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const filteredPosts = dummyPosts.filter(
    (post) =>
      (!selectedCategory || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <section  className="min-h-screen bg-gray-950 text-primary-50 px-4 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-primary-100 font-serif drop-shadow"
        >
          Blog
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 mt-2 mb-6"
        >
          Ideas, tutoriales y reflexiones del mundo tech
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          {['Todos', 'Desarrollo Web', 'CSS', 'React'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === 'Todos' ? null : cat)}
              className={`px-4 py-1 rounded-full text-sm border ${
                selectedCategory === cat || (cat === 'Todos' && selectedCategory === null)
                  ? 'bg-primary-700 text-white border-primary-700'
                  : 'text-primary-100 border-primary-700 hover:bg-primary-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
        <motion.input
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          type="text"
          placeholder="Buscar artículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-2/3 px-4 py-2 rounded-lg bg-gray-800 text-primary-50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      <div className="max-w-6xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={600}
              height={300}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <span className="inline-block bg-primary-700 text-white text-xs px-2 py-1 rounded-full uppercase tracking-widest mb-4">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-primary-100 mb-2">{post.title}</h2>
                <p className="text-gray-300 text-sm mb-4">{post.excerpt}</p>
              </div>
              <div className="flex justify-between items-center mt-auto text-sm text-gray-500">
                <span>{new Date(post.date).toLocaleDateString()}</span>
                <a href="#" className="text-accent-500 hover:text-accent-300 font-medium">Leer más →</a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="flex justify-center mt-12 gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1
                ? 'bg-primary-700 text-white'
                : 'bg-gray-800 text-primary-100 hover:bg-primary-800'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Blog;
