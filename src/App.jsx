import styled, { createGlobalStyle } from 'styled-components';
import { motion, useViewportScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import SubmarineImg from './assets/submarine-uploaded.png';
import fishAnimation from './assets/fish.json';
import seahorseGif from './assets/seahorse.gif';
import octopusAnimation from './assets/Octopus.json';
import jellyfishAnimation from './assets/Jellyfish.json';
import fishGif1 from './assets/fish-18642_256.gif';
import fishGif2 from './assets/fish-18858_256.gif';
import sunkenshipImg from './assets/sunkenship.png';
import pirateshipImg from './assets/pirateship.png';
import diverAnimation from './assets/xdfIgVfIrI.json';
import sharkAnimation from './assets/XG561pRRaw.json';
import whaleAnimation from './assets/M2YhYVimYa.json';
import tortoiseAnimation from './assets/OkqEAMAHyL.json';
import seaPlants1 from './assets/seaplants-removebg-preview.png';
import seaPlants2 from './assets/seaplants-removebg-preview (1).png';
import seaRocks from './assets/searocks-removebg-preview.png';
import seaWeed from './assets/seaweed-removebg-preview.png';
import islandImg from './assets/island.png';

const GlobalStyle = createGlobalStyle`
  body {
    background: linear-gradient(to bottom, #b3d8f7 0%, #7ec4e3 50%, #0a2342 100%);
    margin: 0;
    overflow-x: hidden;
    min-height: 100vh;
  }
`;

const WaterContainer = styled.div`
  width: 100vw;
  height: 300vh;
  position: relative;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

const WhiteSpace = styled(motion.div)`
  width: 100vw;
  height: 33vh;
  position: relative;
  overflow: hidden;
`;

const Sun = styled(motion.div)`
  position: absolute;
  top: 30px;
  left: 50px;
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, #ffd700 0%, #ffed4e 50%, #ffb347 100%);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
  z-index: 1001;
`;

const WaterSurface = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  z-index: 6;
  pointer-events: none;
  overflow: hidden;
`;

const Wave = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
  border-radius: 50% 50% 0 0;
`;

const Wave2 = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: -50%;
  width: 200%;
  height: 80px;
  background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
  border-radius: 50% 50% 0 0;
`;

const Wave3 = styled(motion.div)`
  position: absolute;
  top: 40px;
  left: 0;
  width: 200%;
  height: 60px;
  background: linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.03) 50%, transparent 100%);
  border-radius: 50% 50% 0 0;
`;

const SubmarineWrapper = styled(motion.div)`
  position: fixed;
  top: calc(33vh - 138px);
  left: 32px;
  width: 320px;
  z-index: 10;
  user-select: none;
  pointer-events: none;
`;

const Bubble = styled(motion.div)`
  position: absolute;
  left: 110px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: linear-gradient(180deg, var(--color-aqua) 60%, var(--color-white) 100%);
  box-shadow: 0 0 12px 2px var(--color-aqua);
  opacity: 0.7;
`;

const Fan = styled(motion.div)`
  position: absolute;
  left: 0px;
  top: 120px;
  width: 48px;
  height: 48px;
  z-index: 11;
  pointer-events: none;
`;

const SeaCreature = styled(motion.div)`
  position: absolute;
  pointer-events: none;
`;

const ShipDebris = styled(motion.div)`
  position: absolute;
  pointer-events: none;
`;

const SeafloorSand = styled.div`
  position: absolute;
  top: 320vh;
  left: 0;
  width: 100vw;
  height: 80px;
  background: linear-gradient(to top, #2d1810 0%, #3d2810 50%, #4d3810 100%);
  z-index: -1;
  box-shadow: inset 0 5px 10px rgba(0,0,0,0.3);
  margin: 0;
  padding: 0;
  clip-path: polygon(
    0% 100%,
    5% 60%,
    12% 80%,
    18% 40%,
    25% 75%,
    32% 55%,
    40% 85%,
    48% 35%,
    55% 78%,
    62% 52%,
    68% 82%,
    75% 48%,
    82% 75%,
    88% 58%,
    95% 80%,
    100% 100%
  );
`;

const SeaEnvironment = styled(motion.div)`
  position: absolute;
  pointer-events: none;
`;

function AnimatedBubbles({ y, isScrollingDown }) {
  if (!isScrollingDown) return null;
  return Array.from({ length: 8 }).map((_, i) => (
    <Bubble
      key={i}
      style={{
        top: 60 + i * 18 - y * 0.5 - i * 20,
        left: 180 + Math.sin(i * 1.2) * 20 + (i % 2 === 0 ? 10 : -10),
        scale: 1 - i * 0.07,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 0.7, scale: 1 - i * 0.07 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse', delay: i * 0.2 }}
    />
  ));
}

function FanSVG() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <ellipse cx="24" cy="10" rx="6" ry="12" fill="#ffe156" opacity="0.8"/>
        <ellipse cx="24" cy="38" rx="6" ry="12" fill="#ffe156" opacity="0.8"/>
        <ellipse cx="10" cy="24" rx="12" ry="6" fill="#ffe156" opacity="0.8"/>
        <ellipse cx="38" cy="24" rx="12" ry="6" fill="#ffe156" opacity="0.8"/>
        <circle cx="24" cy="24" r="6" fill="#e6b800" />
      </g>
    </svg>
  );
}

// Surface Layer Creatures (0-100vh)
function SurfaceCreatures() {
  return (
    <>
      {/* Tortoise - Surface */}
      <SeaCreature
        style={{
          left: '35vw', // Shifted right from 20vw
          top: '30vh',
          width: 200,
          height: 160,
          zIndex: 5,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -20, 0],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={tortoiseAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Small Fish 1 - Surface */}
      <SeaCreature
        style={{
          left: '75vw', // Shifted right from 60vw
          top: '50vh',
          width: 80,
          height: 50,
          zIndex: 5,
        }}
        animate={{
          x: [0, 150, 0],
          y: [0, -25, 0],
        }}
        transition={{
          x: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={fishAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Small Fish 2 - Surface */}
      <SeaCreature
        style={{
          left: '85vw', // Shifted right from 80vw
          top: '40vh',
          width: 70,
          height: 45,
          zIndex: 5,
        }}
        animate={{
          x: [0, -120, 0],
          y: [0, 30, 0],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif1} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Small Fish 3 - Surface */}
      <SeaCreature
        style={{
          left: '55vw', // Shifted right from 40vw
          top: '60vh',
          width: 90,
          height: 55,
          zIndex: 5,
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -15, 0],
        }}
        transition={{
          x: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif2} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>
    </>
  );
}

// Mid-Depth Layer Creatures (100vh-200vh)
function MidDepthCreatures() {
  return (
    <>
      {/* Deep Sea Diver */}
      <SeaCreature
        style={{
          left: '45vw', // Shifted right from 30vw
          top: '120vh',
          width: 80,
          height: 100,
          zIndex: 4,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -25, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          x: { duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={diverAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Seahorse */}
      <SeaCreature
        style={{
          left: '75vw', // Shifted right from 70vw
          top: '130vh',
          width: 80,
          height: 100,
          zIndex: 4,
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          x: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seahorseGif} 
          alt="Seahorse" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Tortoise - Mid Depth */}
      <SeaCreature
        style={{
          left: '65vw', // Shifted right from 60vw
          top: '140vh',
          width: 200,
          height: 160,
          zIndex: 4,
        }}
        animate={{
          x: [0, -120, 0],
          y: [0, -30, 0],
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={tortoiseAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Big Fish 1 - Mid Depth */}
      <SeaCreature
        style={{
          left: '35vw', // Shifted right from 20vw
          top: '110vh',
          width: 150,
          height: 90,
          zIndex: 4,
        }}
        animate={{
          x: [0, 200, 0],
          y: [0, -40, 0],
        }}
        transition={{
          x: { duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={fishAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Big Fish 2 - Mid Depth */}
      <SeaCreature
        style={{
          left: '85vw', // Shifted right from 80vw
          top: '150vh',
          width: 140,
          height: 85,
          zIndex: 4,
        }}
        animate={{
          x: [0, -180, 0],
          y: [0, 35, 0],
        }}
        transition={{
          x: { duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif1} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Small Fish 4 - Mid Depth */}
      <SeaCreature
        style={{
          left: '55vw', // Shifted right from 50vw
          top: '160vh',
          width: 75,
          height: 50,
          zIndex: 4,
        }}
        animate={{
          x: [0, 90, 0],
          y: [0, -20, 0],
        }}
        transition={{
          x: { duration: 11, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif2} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Small Fish 5 - Mid Depth */}
      <SeaCreature
        style={{
          left: '25vw', // Shifted right from 10vw
          top: '170vh',
          width: 65,
          height: 40,
          zIndex: 4,
        }}
        animate={{
          x: [0, 120, 0],
          y: [0, 25, 0],
        }}
        transition={{
          x: { duration: 13, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 6.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={fishAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>
    </>
  );
}

// Deep Layer Creatures (200vh-300vh)
function DeepCreatures() {
  return (
    <>
      {/* Jellyfish */}
      <SeaCreature
        style={{
          left: '45vw', // Shifted right from 40vw
          top: '210vh',
          width: 50,
          height: 70,
          zIndex: 3,
        }}
        animate={{
          x: [0, 80, 0],
          y: [0, -30, 0],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={jellyfishAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Octopus */}
      <SeaCreature
        style={{
          left: '75vw', // Shifted right from 70vw
          top: '220vh',
          width: 100,
          height: 80,
          zIndex: 3,
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -40, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          x: { duration: 20, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={octopusAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Seahorse - Mirrored */}
      <SeaCreature
        style={{
          left: '25vw', // Shifted right from 20vw
          top: '230vh',
          width: 80,
          height: 100,
          zIndex: 3,
          transform: 'scaleX(-1)',
        }}
        animate={{
          x: [0, 60, 0],
          y: [0, -25, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          x: { duration: 9, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seahorseGif} 
          alt="Seahorse" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Fish 6 - Deep */}
      <SeaCreature
        style={{
          left: '65vw', // Shifted right from 60vw
          top: '240vh',
          width: 110,
          height: 70,
          zIndex: 3,
        }}
        animate={{
          x: [0, -140, 0],
          y: [0, 30, 0],
        }}
        transition={{
          x: { duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={fishAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Fish 7 - Deep */}
      <SeaCreature
        style={{
          left: '35vw', // Shifted right from 30vw
          top: '250vh',
          width: 95,
          height: 60,
          zIndex: 3,
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, -35, 0],
        }}
        transition={{
          x: { duration: 11, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif1} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Fish 8 - Deep */}
      <SeaCreature
        style={{
          left: '85vw', // Shifted right from 80vw
          top: '260vh',
          width: 85,
          height: 55,
          zIndex: 3,
        }}
        animate={{
          x: [0, -90, 0],
          y: [0, 20, 0],
        }}
        transition={{
          x: { duration: 13, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 6.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif2} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>

      {/* Shark */}
      <SeaCreature
        style={{
          left: '55vw', // Shifted right from 50vw
          top: '270vh',
          width: 600,
          height: 300,
          zIndex: 3,
        }}
        animate={{
          x: [0, 300, 0],
          y: [0, -30, 0],
        }}
        transition={{
          x: { duration: 25, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={sharkAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Whale - Moved higher */}
      <SeaCreature
        style={{
          left: '25vw', // Shifted right from 20vw
          top: '270vh', // Same depth as shark
          width: 800,
          height: 500,
          zIndex: 3,
        }}
        animate={{
          x: [0, -200, 0],
          y: [0, 60, 0],
        }}
        transition={{
          x: { duration: 30, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={whaleAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Resting Spot 2 - Seaweed and Plants */}
      <SeaEnvironment
        style={{
          left: '75vw',
          top: '245vh',
          width: 180,
          height: 140,
          zIndex: 2,
        }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: { duration: 4.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seaPlants2} 
          alt="Sea Plants" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaEnvironment>

      <SeaEnvironment
        style={{
          left: '85vw',
          top: '250vh',
          width: 90,
          height: 130,
          zIndex: 2,
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          y: { duration: 5.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seaWeed} 
          alt="Seaweed" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaEnvironment>

      {/* Octopus near resting spot 2 */}
      <SeaCreature
        style={{
          left: '70vw',
          top: '255vh',
          width: 80,
          height: 65,
          zIndex: 3,
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          x: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <Lottie
          animationData={octopusAnimation}
          loop={true}
          autoplay={true}
          style={{ width: '100%', height: '100%' }}
        />
      </SeaCreature>

      {/* Resting Spot 3 - All 4 elements */}
      <SeaEnvironment
        style={{
          left: '45vw',
          top: '235vh',
          width: 160,
          height: 120,
          zIndex: 2,
        }}
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          y: { duration: 4, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seaPlants1} 
          alt="Sea Plants" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaEnvironment>

      <SeaEnvironment
        style={{
          left: '50vw',
          top: '240vh',
          width: 100,
          height: 70,
          zIndex: 1,
        }}
        animate={{
          y: [0, -3, 0],
        }}
        transition={{
          y: { duration: 6.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seaRocks} 
          alt="Sea Rocks" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaEnvironment>

      <SeaEnvironment
        style={{
          left: '55vw',
          top: '245vh',
          width: 70,
          height: 110,
          zIndex: 2,
        }}
        animate={{
          y: [0, -7, 0],
        }}
        transition={{
          y: { duration: 5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seaWeed} 
          alt="Seaweed" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaEnvironment>

      <SeaEnvironment
        style={{
          left: '60vw',
          top: '235vh',
          width: 90,
          height: 115,
          zIndex: 2,
        }}
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          y: { duration: 4.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={seaPlants2} 
          alt="Sea Plants" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaEnvironment>

      {/* Fish near resting spot 3 */}
      <SeaCreature
        style={{
          left: '65vw',
          top: '250vh',
          width: 60,
          height: 40,
          zIndex: 3,
        }}
        animate={{
          x: [0, -35, 0],
          y: [0, 15, 0],
        }}
        transition={{
          x: { duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          y: { duration: 3.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={fishGif1} 
          alt="Fish" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </SeaCreature>
    </>
  );
}

// Deep Sea Layer - Shipwrecks (200vh-300vh)
function DeepSeaShipwrecks() {
  return (
    <>
      {/* Sunken Ship */}
      <ShipDebris
        style={{
          left: '15vw',
          top: '290vh', // Fine-tuned position
          width: 500,
          height: 350,
          zIndex: 3,
        }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          y: { duration: 8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={sunkenshipImg} 
          alt="Sunken Ship" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </ShipDebris>

      {/* Pirate Ship */}
      <ShipDebris
        style={{
          left: '55vw',
          top: '295vh', // Fine-tuned position
          width: 450,
          height: 320,
          zIndex: 3,
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          y: { duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
          rotate: { duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
        }}
      >
        <img 
          src={pirateshipImg} 
          alt="Pirate Ship" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
        />
      </ShipDebris>
    </>
  );
}

function App() {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 2000], [0, 200]);
  const shake = useSpring(useTransform(scrollY, [0, 1000], [0, 8]), { stiffness: 100, damping: 8 });

  const lastY = useRef(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  // Preload all assets
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        // Preload all Lottie animations
        const animations = [
          fishAnimation,
          octopusAnimation,
          jellyfishAnimation,
          diverAnimation,
          sharkAnimation,
          whaleAnimation,
          tortoiseAnimation
        ];

        // Preload all images
        const images = [
          SubmarineImg,
          seahorseGif,
          fishGif1,
          fishGif2,
          sunkenshipImg,
          pirateshipImg,
          seaPlants1,
          seaPlants2,
          seaRocks,
          seaWeed,
          islandImg
        ];

        // Create promises for all assets
        const animationPromises = animations.map(anim => {
          return new Promise((resolve) => {
            // Lottie animations are already loaded as JSON
            setTimeout(resolve, 100); // Small delay to ensure processing
          });
        });

        const imagePromises = images.map(src => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
              // Ensure image is fully loaded
              setTimeout(resolve, 50);
            };
            img.onerror = reject;
            img.src = src;
          });
        });

        // Wait for all assets to load
        await Promise.all([...animationPromises, ...imagePromises]);
        
        // Additional delay to ensure everything is ready
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setAssetsLoaded(true);
      } catch (error) {
        console.error('Error preloading assets:', error);
        // Even if some assets fail, continue after a delay
        setTimeout(() => setAssetsLoaded(true), 1000);
      }
    };

    preloadAssets();
  }, []);

  useEffect(() => {
    return scrollY.onChange((v) => {
      setIsScrollingDown(v > lastY.current);
      lastY.current = v;
    });
  }, [scrollY]);

  const fanRotation = useMotionValue(0);
  useAnimationFrame((t, delta) => {
    fanRotation.set(fanRotation.get() + (isScrollingDown ? 8 : 1));
  });

  // Show loading state while assets are being preloaded
  if (!assetsLoaded) {
    return (
      <>
        <GlobalStyle />
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            fontSize: '32px',
            color: 'white',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            🌊 Loading Underwater Adventure 🌊
          </div>
          <div style={{
            width: '200px',
            height: '4px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <motion.div
              style={{
                width: '100%',
                height: '100%',
                background: 'white',
                borderRadius: '2px'
              }}
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            />
          </div>
          <div style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            marginTop: '20px',
            textAlign: 'center'
          }}>
            Preparing sea creatures and ocean depths...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <WhiteSpace
        animate={{
          background: [
            "linear-gradient(135deg, #ffd700 0%, #ffed4e 30%, #ffb347 60%, #ffa500 100%)",
            "linear-gradient(135deg, #ffb347 0%, #ff8fab 30%, #ffb3d1 60%, #ffd1dc 100%)",
            "linear-gradient(135deg, #ff6b9d 0%, #ff8fab 30%, #ffb3d1 60%, #ffd1dc 100%)",
            "linear-gradient(135deg, #2c1810 0%, #1a0f0a 30%, #0a0502 60%, #000000 100%)",
            "linear-gradient(135deg, #ffd700 0%, #ffed4e 30%, #ffb347 60%, #ffa500 100%)"
          ]
        }}
        transition={{
          background: { duration: 40, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Sun
          animate={{
            scale: [1, 1.1, 1, 0.8, 0.6, 0.4, 0.2, 0, 0, 0, 0.2, 0.4, 0.6, 0.8, 1],
            rotate: [0, 360],
            opacity: [1, 1, 1, 0.8, 0.6, 0.4, 0.2, 0, 0, 0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          transition={{
            scale: { duration: 40, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            opacity: { duration: 40, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        
        {/* Island at the top of the screen */}
        <motion.div
          style={{
            position: 'absolute',
            top: '116px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '200px',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <img 
            src={islandImg} 
            alt="Island" 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
            }} 
          />
        </motion.div>
      </WhiteSpace>
      <WaterContainer>
        <WaterSurface>
          <Wave
            animate={{
              x: [0, -50, 0],
            }}
            transition={{
              x: { duration: 8, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <Wave2
            animate={{
              x: [0, 50, 0],
            }}
            transition={{
              x: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <Wave3
            animate={{
              x: [0, -30, 0],
            }}
            transition={{
              x: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </WaterSurface>
        <SubmarineWrapper style={{ y, rotate: shake }}>
          <img src={SubmarineImg} alt="Submarine" style={{ width: '100%', height: 'auto', display: 'block' }} />
          <Fan style={{ rotate: fanRotation }}>
            <FanSVG />
          </Fan>
          <AnimatedBubbles y={y.get()} isScrollingDown={isScrollingDown} />
        </SubmarineWrapper>
        
        {/* Surface Layer */}
        <SurfaceCreatures />
        
        {/* Mid-Depth Layer */}
        <MidDepthCreatures />
        
        {/* Deep Sea Layer */}
        <DeepCreatures />
        
        {/* Deep Sea Shipwrecks */}
        <DeepSeaShipwrecks />
        
        {/* Seafloor Sand - at the very bottom */}
        <SeafloorSand />
      </WaterContainer>
    </>
  );
}

export default App;
