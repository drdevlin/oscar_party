import { forwardRef } from "react";
import { motion } from "framer-motion";

import { GhostAnimation } from "@/lib/motion";
import { Item } from "./Item";

export const Placeholder = forwardRef<HTMLDivElement>(function Placeholder(props, ref) {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} ref={ref}>
      <GhostAnimation><Item><div style={{ height: '2rem' }} /></Item></GhostAnimation>
      <GhostAnimation><Item><div style={{ height: '2rem' }} /></Item></GhostAnimation>
      <GhostAnimation><Item><div style={{ height: '2rem' }} /></Item></GhostAnimation>
      <GhostAnimation><Item><div style={{ height: '2rem' }} /></Item></GhostAnimation>
    </motion.div> 
  );
});