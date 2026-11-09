import { useEffect, type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Lenis from "lenis";
export type TemplateProps = {
  slots?: Record<string, ReactNode>;
  props?: Record<string, Record<string, unknown>>;
};
export const asset = (path: string) =>
  import.meta.env.BASE_URL + path.replace(/^\//, "");
export function Shell({
  children,
  css,
  title,
  className = "",
  style,
}: {
  children: ReactNode;
  css: string;
  title: string;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  useEffect(() => {
    document.title = title;
    if (reduced) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      prevent: (node) => !!node.closest("[data-lenis-prevent]"),
    });
    return () => lenis.destroy();
  }, [title, reduced]);
  return (
    <>
      <style>{css}</style>
      <motion.div
        className={"page min-h-screen " + className}
        style={style}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}

export type ViewProps = {
  Page: React.ComponentType<TemplateProps>;
  css: string;
  title: string;
};
