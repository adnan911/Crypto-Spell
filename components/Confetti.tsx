import React, {
  useCallback,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import confetti from "canvas-confetti";
import type {
  GlobalOptions as ConfettiGlobalOptions,
  CreateTypes as ConfettiInstance,
  Options as ConfettiOptions,
} from "canvas-confetti";

interface ConfettiProps {
  active: boolean;
  colors?: string[];
  options?: ConfettiOptions;
  globalOptions?: ConfettiGlobalOptions;
}

export type ConfettiRef = {
  fire: (options?: ConfettiOptions) => void;
} | null;

const DEFAULT_COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6', '#ef4444', '#14b8a6'];
const DEFAULT_GLOBAL: ConfettiGlobalOptions = { resize: true, useWorker: true };

const Confetti = forwardRef<ConfettiRef, ConfettiProps>((props, ref) => {
  const {
    active,
    colors = DEFAULT_COLORS,
    options,
    globalOptions = DEFAULT_GLOBAL,
  } = props;
  
  const instanceRef = useRef<ConfettiInstance | null>(null);

  const canvasRef = useCallback((node: HTMLCanvasElement | null) => {
    if (node !== null) {
      if (instanceRef.current) return;
      instanceRef.current = confetti.create(node, {
        ...globalOptions,
        resize: true,
      });
    } else {
      if (instanceRef.current) {
        instanceRef.current.reset();
        instanceRef.current = null;
      }
    }
  }, [globalOptions]);

  const fire = useCallback(
    async (opts = {}) => {
      if (!instanceRef.current) return;

      try {
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          colors: colors,
          ...options,
          ...opts,
        };

        function shoot(angle: number, originX: number) {
          instanceRef.current?.({
            ...defaults,
            particleCount: Math.floor(count / 2),
            angle,
            spread: 70,
            origin: { x: originX, y: 0.6 },
            scalar: 1.2,
          });
        }

        shoot(60, 0);   // Left cannon
        shoot(120, 1);  // Right cannon
        
      } catch (error) {
        console.error("Confetti error:", error);
      }
    },
    [options, colors]
  );

  useImperativeHandle(ref, () => ({ fire }), [fire]);

  useEffect(() => {
    if (active && instanceRef.current) {
      fire();
    }
  }, [active, fire]);

  return (
    <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-[200] w-full h-full"
    />
  );
});

Confetti.displayName = "Confetti";

export default Confetti;
