import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, backgroundImage }: PageHeaderProps) => {
  return (
    <section className="relative flex min-h-[240px] items-end overflow-hidden pt-20 sm:min-h-[min(320px,90svh)] md:h-[45svh]">
      {backgroundImage && (
        <motion.img
          src={backgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 6, ease: "easeOut" }}
        />
      )}
      <div className="absolute inset-0 elvie-overlay" />
      <div className="container relative z-10 mx-auto px-4 pb-8 sm:pb-12">
        <motion.h1
          className="break-words text-3xl font-bold tracking-wide text-primary-foreground sm:text-4xl md:text-6xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h1>
        <motion.div
          className="h-1 bg-elvie-blue-light rounded-full mt-4"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
      </div>
    </section>
  );
};

export default PageHeader;
