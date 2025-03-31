import { memo, useMemo } from 'react';
import { LazyMotion, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';

const pathVariants = {
  hidden: {
    strokeDashoffset: 3000,
    strokeDasharray: 3000,
  },
  visible: (custom: number) => ({
    strokeDashoffset: 0,
    transition: { duration: 3, delay: custom * 1 },
  }),
};

const GlassCircle = ({
  size,
  color,
  initialX,
  initialY,
  index,
}: {
  size: number;
  color: string;
  initialX: string;
  initialY: string;
  index: number;
}) => {
  return (
    <m.div
      className='absolute rounded-full opacity-0 backdrop-blur-[1px]'
      initial={{
        width: size,
        height: size,
        backgroundColor: color,
        left: initialX,
        top: initialY,
      }}
      animate={{
        x: [0, 100, 0],
        y: [0, -100, 0],
        scale: [0, 1, 0],
        rotate: [0, 360],
        opacity: [0.1, 0.5, 0.1],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'reverse',
        delay: index * 0.5,
      }}
    />
  );
};

function FlowingCurves() {
  const circles = useMemo(
    () => [
      { size: 40, color: '#8b5cf6', x: '20%', y: '30%' },
      { size: 50, color: '#3b82f6', x: '60%', y: '40%' },
      { size: 35, color: '#ec4899', x: '80%', y: '50%' },
      { size: 45, color: '#14b8a6', x: '40%', y: '60%' },
      { size: 30, color: '#8b5cf6', x: '30%', y: '70%' },
      { size: 55, color: '#3b82f6', x: '70%', y: '80%' },
      { size: 40, color: '#ec4899', x: '50%', y: '90%' },
      { size: 35, color: '#14b8a6', x: '90%', y: '100%' },
    ],
    [],
  );

  return (
    <div className='fixed inset-0 -z-[1] h-full w-full overflow-hidden'>
      <LazyMotion features={domAnimation}>
        {circles.map((circle, index) => (
          <GlassCircle
            key={index}
            size={circle.size}
            color={circle.color}
            initialX={circle.x}
            initialY={circle.y}
            index={index}
          />
        ))}

        <svg
          className='flowing-curves-svg h-full w-full opacity-20'
          viewBox='0 0 1202 1080'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          preserveAspectRatio='xMidYMid slice'
        >
          <m.path
            d='M1621.88 -47.1813C1451.86 -40.9397 1088.86 85.9397 996.98 543.524C905.102 1001.11 422.711 1152.88 193 1171.56'
            stroke='url(#gradient1)'
            strokeWidth={6}
            initial='hidden'
            animate='visible'
            variants={pathVariants}
            custom={0}
          />

          <m.path
            d='M1710.67 356.612C1545.47 315.917 1161.58 338.213 947.557 752.964C733.532 1167.71 228.009 1181.15 2.00008 1136.03'
            stroke='url(#gradient2)'
            strokeWidth={6}
            initial='hidden'
            animate='visible'
            variants={pathVariants}
            custom={1}
          />

          <m.path
            d='M1500 200C1300 300 1000 100 800 400C600 700 300 800 100 600'
            stroke='url(#gradient3)'
            strokeWidth={6}
            initial='hidden'
            animate='visible'
            variants={pathVariants}
            custom={2}
          />

          <defs>
            <linearGradient id='gradient1' x1='0%' y1='0%' x2='100%' y2='100%'>
              <stop offset='0%' stopColor='#8b5cf6' />
              <stop offset='100%' stopColor='#3b82f6' />
            </linearGradient>

            <linearGradient id='gradient2' x1='0%' y1='100%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#ec4899' />
              <stop offset='100%' stopColor='#8b5cf6' />
            </linearGradient>

            <linearGradient id='gradient3' x1='0%' y1='0%' x2='100%' y2='0%'>
              <stop offset='0%' stopColor='#14b8a6' />
              <stop offset='100%' stopColor='#3b82f6' />
            </linearGradient>
          </defs>
        </svg>
      </LazyMotion>
    </div>
  );
}

export default memo(FlowingCurves);
