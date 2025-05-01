'use client';

import {FC, useEffect, useState} from "react";
import {motion} from "framer-motion";
import CardNewsComponent from "@/components/news/cardNews.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {Gnews} from "@/type";
import {appendNews, initialDataNews} from "@/lib/redux/features/news/news.slice";


const News: FC = () => {
  const {news} = useAppSelector(state => state.news)
  const dispatch = useAppDispatch()
  const [page, setPage] = useState<number>(1);
  const [tag, setTag] = useState<string>('')

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch(`/api/news?page=${page}&per_page=${page === 1 ? 5: 4}&tag=${tag}`);
        const data: Gnews[] = await response.json();
        if (page === 1) {
          dispatch(initialDataNews(data));
        } else {
          dispatch(appendNews(data));
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    }

    void dataFetch();
  }, [page, dispatch, tag]);

  const handleSetTag = (tag: string) =>{
    setTag(tag)
    setPage(1)
  }
  const uniqueTags = Array.from(
    new Set(
      news.flatMap((cat) => cat.tags.split(",").map((t) => t.trim()))
    )
  );
  return (
    <div className="min-h-screen bg-gray-950 text-primary-50">
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="border-b bg-transparent bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border-primary-700 py-10"
      >
        <div className="container mx-auto px-4 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-100 tracking-tight font-serif drop-shadow-md">
            Tecno<span className="text-accent-500">Noticias</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg md:text-xl mt-2 italic">
            Actualidad, innovación y futuro tecnológico
          </p>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8 ">
        <div className="flex-1">
          <section className="my-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-4 text-primary-100"
            >
              Destacado
            </motion.h2>
            {news.length > 0 && (<CardNewsComponent news={news[0]} />)}
          </section>

          <section>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl font-semibold mb-4 text-primary-100"
            >
              Más Noticias
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {news.slice(1).map((news, index) => (
                <CardNewsComponent key={news.id+index+1} news={news} />
              ))}
            </div>
            {news.length >0 && (
                <motion.div
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                  <button
                      onClick={() => setPage(prev => prev + 1)}
                      className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-full font-medium transition-colors duration-300 flex items-center gap-2 cursor-pointer"
                  >
                    Ver más
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </motion.div>
            )}
          </section>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-full lg:w-1/3 my-10"
        >
          <section className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-primary-100">Últimas noticias</h3>
            <ul className="space-y-2 text-sm text-primary-300">
              {news.map((item) => (
                <li key={item.id} className="hover:underline">
                  <a href={item.url} target={'_blank'}>{item.title}</a>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4 text-primary-100">Categorías populares</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSetTag('')}
                className={`text-white px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${tag === '' ? 'bg-accent-700 hover:bg-accent-800' : 'bg-accent-800 hover:bg-accent-900'}`}
              >
                chile
              </button>
              {uniqueTags.map((item, index) => (
                <button
                  onClick={() => handleSetTag(item)}
                  key={index}
                  className={`text-white px-3 py-1 rounded-full text-sm transition-colors cursor-pointer ${tag.trim() === item ? 'bg-primary-300 hover:bg-primary-400' : 'bg-primary-700 hover:bg-primary-600'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        </motion.aside>
      </div>
    </div>
  );
};

export default News;
