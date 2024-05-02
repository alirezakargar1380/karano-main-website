import React, { useRef } from "react";
import {
    m,
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";

type Props = {
    children: React.ReactNode;
    rotation_range?: number;
    halt_rotation_range?: number;
};

let ROTATION_RANGE = 22.5;
// const ROTATION_RANGE = 32.5;
let HALF_ROTATION_RANGE = 22.5 / 2;

export default function TiltCard({ children, rotation_range, halt_rotation_range }: Props) {
    ROTATION_RANGE = rotation_range ? rotation_range : 22.5;
    HALF_ROTATION_RANGE = halt_rotation_range ? halt_rotation_range / 2 : 22.5 / 2;

    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <m.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-indigo-300 to-violet-300"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
            >
                {children}
            </div>
        </m.div>
    );
}