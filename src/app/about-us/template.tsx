'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';

export default function AboutUsTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remove the exit animation class when the page loads
  useEffect(() => {
    document.documentElement.classList.remove('page-exit');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="page-transition-container"
    >
      {children}
    </motion.div>
  );
} 