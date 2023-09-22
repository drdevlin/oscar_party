import { forwardRef } from "react";
import { motion } from "framer-motion";

import { GhostAnimation } from "@/lib/motion";
import { Item } from "./Item";

export const Placeholder = forwardRef<HTMLDivElement>(function Placeholder(props, ref) {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} ref={ref}>
      {Array(4).fill(<GhostAnimation><Item><div style={{ height: '2rem' }} /></Item></GhostAnimation>)}
    </motion.div> 
  );
});