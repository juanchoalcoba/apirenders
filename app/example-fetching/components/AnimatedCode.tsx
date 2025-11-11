"use client";

import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

interface AnimatedCodeProps {
  code: string;
}

export default function AnimatedCode({ code }: AnimatedCodeProps) {
  const el = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: [code],
      typeSpeed: 20,
      showCursor: false,
      onStringTyped: () => {
        setTypedText(code);
      },
    });

    const interval = setInterval(() => {
      if (el.current) setTypedText(el.current.textContent || "");
    }, 10);

    return () => {
      typed.destroy();
      clearInterval(interval);
    };
  }, [code]); // importante: se vuelve a ejecutar si cambia el código

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl p-6 relative">
      <SyntaxHighlighter
        language="typescript"
        style={vscDarkPlus}
        customStyle={{
          background: "transparent",
          margin: 0,
          padding: 0,
          fontSize: "0.9rem",
          whiteSpace: "pre-wrap",
        }}
      >
        {typedText}
      </SyntaxHighlighter>

      {/* Cursor parpadeante */}
      {typedText !== code && (
        <span className="inline-block w-2 h-5 bg-white animate-pulse ml-1" />
      )}

      {/* Div oculto donde Typed.js escribe */}
      <div ref={el} className="hidden" />
    </div>
  );
}
