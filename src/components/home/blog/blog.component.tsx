'use client'
import {FC} from "react";
import TitleComponent from "@/components/home/blog/title.component";
import CardSectionComponent from "@/components/home/blog/cardSection.component";


const BlogComponent: FC = () => {
  return (
    <section className="py-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent-100 via-primary-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 w-full">
         <TitleComponent />
            <div className="hidden w-[70%] md:block">
                <CardSectionComponent />
            </div>
        </div>
        <div className="md:hidden">
          <CardSectionComponent />
        </div>
      </div>
    </section>
  );
};

export default BlogComponent;
