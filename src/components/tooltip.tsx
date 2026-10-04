"use client";

import {
  cloneElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";

/** Portaled so sidebar scrolling never clips the label. */
export function Tooltip({
  label,
  enabled = true,
  children,
}: {
  label: string;
  enabled?: boolean;
  children: ReactElement<{ "aria-describedby"?: string }>;
}) {
  const id = useId();
  const anchor = useRef<HTMLSpanElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }
  function show() {
    cancelClose();
    if (!enabled || !anchor.current) return;
    const rect = anchor.current.getBoundingClientRect();
    setPosition({
      top: Math.max(
        24,
        Math.min(window.innerHeight - 24, rect.top + rect.height / 2),
      ),
      left: Math.min(rect.right + 12, window.innerWidth - 220),
    });
  }
  function closeSoon() {
    cancelClose();
    closeTimer.current = setTimeout(() => setPosition(null), 120);
  }
  useEffect(() => {
    if (!position) return;
    const hide = () => setPosition(null);
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") hide();
    };
    window.addEventListener("keydown", keydown);
    window.addEventListener("resize", hide);
    window.addEventListener("scroll", hide, true);
    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("resize", hide);
      window.removeEventListener("scroll", hide, true);
    };
  }, [position]);
  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );
  const visible = enabled && !!position;
  return (
    <span
      ref={anchor}
      className="tooltip-anchor"
      onMouseEnter={show}
      onMouseLeave={closeSoon}
      onFocus={show}
      onBlur={() => {
        cancelClose();
        setPosition(null);
      }}
      onClick={() => setPosition(null)}
    >
      {cloneElement(children, { "aria-describedby": visible ? id : undefined })}
      {visible &&
        createPortal(
          <span
            id={id}
            role="tooltip"
            className="navigation-tooltip"
            style={position}
            onMouseEnter={cancelClose}
            onMouseLeave={closeSoon}
          >
            {label}
          </span>,
          document.body,
        )}
    </span>
  );
}
