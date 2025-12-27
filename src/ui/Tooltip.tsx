import { useState, type ReactNode } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
}

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const [show, setShow] = useState<boolean>(false);

  const positionClasses: Record<TooltipPosition, string> = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      {children}

      {show && (
        <div
          role="tooltip"
          className={`
            absolute z-40 px-2 py-1 text-xs rounded-md
            bg-gray-900 text-white
            whitespace-nowrap
            ${positionClasses[position]}
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
}
