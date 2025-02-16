declare module 'canvas-confetti' {
    type Shape = 'square' | 'circle' | 'star' | string;
    
    interface Options {
        particleCount?: number;
        angle?: number;
        spread?: number;
        startVelocity?: number;
        decay?: number;
        gravity?: number;
        drift?: number;
        ticks?: number;
        origin?: {
            x?: number;
            y?: number;
        };
        colors?: string[];
        shapes?: Shape[];
        scalar?: number;
        zIndex?: number;
        disableForReducedMotion?: boolean;
    }

    function confetti(options?: Options): Promise<void>;
    export default confetti;
} 