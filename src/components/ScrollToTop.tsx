import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-elvie-navy text-primary-foreground shadow-lg flex items-center justify-center hover:bg-elvie-blue transition-colors"
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTop;
