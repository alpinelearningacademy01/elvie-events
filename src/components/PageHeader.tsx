import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, backgroundImage }: PageHeaderProps) => {
  return (
    <section className="relative h-[45vh] min-h-[320px] flex items-end overflow-hidden">
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
      <div className="relative z-10 container mx-auto px-4 pb-12">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-primary-foreground tracking-wide"
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
