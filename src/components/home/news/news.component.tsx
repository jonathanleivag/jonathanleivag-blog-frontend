"use client"

import {FC, useEffect} from "react";
import {motion} from "framer-motion";
import {Gnews} from "@/type";
import CardComponent from "@/components/home/news/card.component";
import TitleComponent from "@/components/home/news/title.component";
import {useAppDispatch, useAppSelector} from "@/lib/redux/hooks";
import {initialDataNews} from "@/lib/redux/features/news/news.slice";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const NewsComponent: FC = () => {

  const news = useAppSelector(store => store.news)
  const appDispatch = useAppDispatch()

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const response = await fetch('/api/news?page=1&per_page=3');
        const data: Gnews[] = await response.json();
        appDispatch(initialDataNews(data))
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    void  dataFetch()
  }, [appDispatch]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
       <TitleComponent />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {news.news.map((items, index) => (
            <CardComponent key={items.id}  news={items} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewsComponent;
