'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Scissors,
  Compass,
  Wand2,
  Video,
  Bot,
  FileText,
  Folder,
  RotateCw,
  TrendingUp,
  ChevronDown,
  SidebarClose,
  SidebarOpen,
  ArrowLeft,
  ExternalLink,
  Flame,
  Clock,
  Sparkles,
  Check,
  Upload,
  Link as LinkIcon,
  Play,
  Share2,
  SlidersHorizontal,
  Plus,
  Clapperboard,
  HelpCircle,
  PlayCircle,
  X,
  FileVideo,
  Download,
  Copy,
  Terminal,
  Cpu,
  LayoutGrid,
  ArrowUp,
  AlertTriangle,
  Zap,
  Home,
  Music,
  Image as ImageIcon,
  BookOpen,
  Eye,
  Search,
  CheckCircle2,
  Tv,
  MessageSquare,
  Layers,
  Sparkle,
  Film,
  Settings,
  LogOut,
  CreditCard,
  User,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

/* --- TYPES --- */
interface PromptCardData {
  id: number;
  tag: string;
  duration: string;
  title: string;
  prompt: string;
  category: string;
  image: string;
}

interface VideoItem {
  id: number;
  title: string;
  channel: string;
  views: string;
  timeAgo: string;
  viewsPerHour: string;
  duration: string;
  thumbnail: string;
  category: string;
  videoSrc?: string;
}

interface WizardFrame {
  image: string;
  caption: string;
}

interface WizardIdea {
  id: number;
  title: string;
  desc: string;
  frames: WizardFrame[];
}

interface ProjectClip {
  id: string;
  title: string;
  sourceUrl: string;
  duration: string;
  score: number;
  videoSrc: string;
  thumbnail: string;
  createdAt: string;
}

/* --- CONSTANT DATA --- */
const PROMPT_CARDS: PromptCardData[] = [
  {
    id: 1,
    tag: 'Found-footage story',
    duration: '30 s',
    title: 'The pizza dog',
    prompt: '"Doorbell camera at dusk: a golden retriever delivers a pizza to the neighbours\' porch, rings the bell with its nose, and waits politely for a tip"',
    category: 'Story',
    image: '/images/image-1.jpg',
  },
  {
    id: 2,
    tag: 'Porch cam',
    duration: '8 s',
    title: 'Goose vs delivery driver',
    prompt: 'A delivery driver sets down a parcel and a goose chases them back down the path',
    category: 'Footage',
    image: '/images/image-2.jpg',
  },
  {
    id: 3,
    tag: 'Security cam',
    duration: '8 s',
    title: 'Raccoon raids the fridge',
    prompt: 'A raccoon wanders into an empty office kitchen at night and opens the fridge',
    category: 'Footage',
    image: '/images/image-3.jpg',
  },
  {
    id: 4,
    tag: 'Chest cam',
    duration: '8 s',
    title: 'Goat on the ridge',
    prompt: 'Hiking a misty ridge when a mountain goat steps onto the trail right ahead',
    category: 'Nature',
    image: '/images/image-4.jpg',
  },
  {
    id: 5,
    tag: 'Phone video',
    duration: '8 s',
    title: 'Seagull sandwich heist',
    prompt: 'A seagull grabs a whole sandwich off a cafe table by the beach',
    category: 'Footage',
    image: '/images/image-10.jpg',
  },
  {
    id: 6,
    tag: 'Anime moment',
    duration: '8 s',
    title: 'Rooftop storm courier',
    prompt: 'A courier on a bicycle races a thunderstorm across the rooftops of a sleepy city',
    category: 'Animated',
    image: '/images/image-11.jpg',
  },
  {
    id: 7,
    tag: 'Press test',
    duration: '8 s',
    title: 'Bottles under the press',
    prompt: 'A stack of old glass bottles crushed slowly under a hydraulic press',
    category: 'Footage',
    image: '/images/image-20.jpg',
  },
  {
    id: 8,
    tag: 'Wild nature',
    duration: '8 s',
    title: 'Snow leopard at dawn',
    prompt: 'A snow leopard picking its way along a rocky ledge at dawn',
    category: 'Nature',
    image: '/images/image-21.jpg',
  },
  {
    id: 9,
    tag: 'Ambient scene',
    duration: '10 s',
    title: 'Rain on the window',
    prompt: 'Rain running down a window at night, the lights of a city blurred into soft bokeh beyond the glass',
    category: 'Nature',
    image: '/images/image-22.jpg',
  },
  {
    id: 10,
    tag: 'Toybox 3D',
    duration: '10 s',
    title: 'Robot meets cactus',
    prompt: 'A tiny robot tries to water a cactus and gets poked on the nose',
    category: 'Kids',
    image: '/images/image-23.jpg',
  },
  {
    id: 11,
    tag: 'Courtroom comedy',
    duration: '8 s',
    title: 'Duck-quack ringtone',
    prompt: 'A lawyer\'s big closing speech is cut off when his own phone rings with a duck-quack ringtone',
    category: 'Story',
    image: '/images/image-24.jpg',
  },
  {
    id: 12,
    tag: 'Open-world gameplay',
    duration: '8 s',
    title: 'Parked on the pier',
    prompt: 'The player parks a sports car perfectly on a pier, steps out, and it rolls into the harbour',
    category: 'Gameplay',
    image: '/images/image-25.jpg',
  },
  {
    id: 13,
    tag: 'Storybook 3D',
    duration: '12 s',
    title: 'The lighthouse fireflies',
    prompt: 'A shy lighthouse keeper\'s lamp goes out and the fireflies of the bay come to light the way home for a lost boat',
    category: 'Story',
    image: '/images/image-26.jpg',
  },
  {
    id: 14,
    tag: '3D cartoon',
    duration: '8 s',
    title: 'Jungle vine swing',
    prompt: 'A curious toddler and a big friendly blue hippo swing on jungle vines to a sparkling waterfall',
    category: 'Kids',
    image: '/images/image-27.jpg',
  },
  {
    id: 15,
    tag: 'Nursery rhyme',
    duration: '8 s',
    title: 'Five little puddle ducks',
    prompt: 'Five little ducks splash in a puddle and sing: splish, splash, quack quack, puddle time is here',
    category: 'Kids',
    image: '/images/image-28.jpg',
  },
  {
    id: 16,
    tag: '3D explainer',
    duration: '10 s',
    title: 'Falling into a volcano',
    prompt: 'What would happen if you fell into a volcano: magma density, thermal shock and crust physics',
    category: 'Footage',
    image: '/images/image-29.jpg',
  },
  {
    id: 17,
    tag: 'Ranking videos',
    duration: '6 s',
    title: 'Kiddie-pool cannonball',
    prompt: 'A man jumps off a garage roof into a kiddie pool and the pool bursts into giant splash',
    category: 'Gameplay',
    image: '/images/image-30.jpg',
  },
  {
    id: 18,
    tag: 'UGC and ads',
    duration: '10 s',
    title: 'Mini blender unboxing',
    prompt: 'A woman unboxes a pastel mini blender in her kitchen and makes a fresh strawberry smoothie in ten seconds',
    category: 'Ads',
    image: '/images/image-31.jpg',
  },
  {
    id: 19,
    tag: 'AI influencer',
    duration: '8 s',
    title: 'The coffee trick',
    prompt: 'A cheerful woman with short red hair in a denim jacket tells her phone the one coffee trick that changed her mornings',
    category: 'Ads',
    image: '/images/image-32.jpg',
  },
  {
    id: 20,
    tag: 'Property walkthrough',
    duration: '10 s',
    title: 'Two beds by the park',
    prompt: 'A bright two-bedroom flat with oak floors, from the front door through the open kitchen to a balcony over the park',
    category: 'Footage',
    image: '/images/image-33.jpg',
  },
  {
    id: 21,
    tag: 'Custom',
    duration: '8 s',
    title: 'Umbrella from a cup',
    prompt: 'A street magician in a rainy city pulls an umbrella out of a paper cup and hands it to a passer-by',
    category: 'Custom',
    image: '/images/image-34.jpg',
  },
];

const PROMPT_CATEGORIES = [
  'All',
  'Footage',
  'Animated',
  'Kids',
  'Nature',
  'Gameplay',
  'Ads',
  'Story',
  'Custom',
];

const STUDIO_FAN_CARDS = [
  { id: 1, tag: 'Security cam', title: 'Raccoon raids fridge', image: '/images/image-3.jpg', prompt: 'A raccoon wanders into an empty office kitchen at night and opens the fridge' },
  { id: 2, tag: 'Press test', title: 'Bottles under press', image: '/images/image-20.jpg', prompt: 'A stack of old glass bottles crushed slowly under a hydraulic press in 4k' },
  { id: 3, tag: 'Porch cam', title: 'Goose vs delivery driver', image: '/images/image-2.jpg', prompt: 'A delivery driver sets down a parcel and a goose chases them back down the path' },
  { id: 4, tag: 'Toybox 3D', title: 'Robot meets cactus', image: '/images/image-23.jpg', prompt: 'A tiny robot tries to water a cactus and gets poked on the nose' },
  { id: 5, tag: 'Courtroom', title: 'Duck-quack ringtone', image: '/images/image-24.jpg', prompt: 'A lawyer\'s big closing speech is cut off when his own phone rings with a duck-quack ringtone' },
];

const STUDIO_TEMPLATES = [
  { id: 1, tag: 'Found-footage story', title: 'The pizza dog', image: '/images/image-1.jpg', prompt: 'Doorbell camera at dusk: a golden retriever delivers a pizza to neighbours' },
  { id: 2, tag: 'Porch cam', title: 'Goose vs delivery driver', image: '/images/image-2.jpg', prompt: 'A delivery driver sets down a parcel and a goose chases them back down the path' },
  { id: 3, tag: 'Security cam', title: 'Raccoon raids the fridge', image: '/images/image-3.jpg', prompt: 'A raccoon wanders into an empty office kitchen at night and opens the fridge' },
  { id: 4, tag: 'Chest cam', title: 'Goat on the ridge', image: '/images/image-4.jpg', prompt: 'Hiking a misty ridge when a mountain goat steps onto the trail right ahead' },
  { id: 5, tag: 'Phone video', title: 'Seagull sandwich heist', image: '/images/image-10.jpg', prompt: 'A seagull grabs a whole sandwich off a cafe table by the beach' },
  { id: 6, tag: 'Anime moment', title: 'Rooftop storm courier', image: '/images/image-11.jpg', prompt: 'A courier on a bicycle races a thunderstorm across the rooftops of a sleepy city' },
  { id: 7, tag: 'Press test', title: 'Hydraulic crush', image: '/images/image-20.jpg', prompt: 'Crushing vintage electronics under 100-ton hydraulic press' },
  { id: 8, tag: 'Wild nature', title: 'Snow leopard dawn', image: '/images/image-21.jpg', prompt: 'A snow leopard walking on snowy mountain cliff at golden hour' },
  { id: 9, tag: 'Ambient scene', title: 'Rain bokeh lights', image: '/images/image-22.jpg', prompt: 'Heavy rain droplets sliding down car window overlooking neon Tokyo' },
  { id: 10, tag: 'Toybox 3D', title: 'Claymation frog', image: '/images/image-23.jpg', prompt: 'Chubby claymation frog hopping on giant mushroom in enchanted forest' },
  { id: 11, tag: 'Courtroom', title: 'Surprise witness', image: '/images/image-24.jpg', prompt: 'Dramatic courtroom gasps when surprise witness steps into court' },
  { id: 12, tag: 'Open-world', title: 'Pier drift stunt', image: '/images/image-25.jpg', prompt: 'Sports car drifting through rainy pier container shipyard' },
];

const EXPLORE_VIDEOS: VideoItem[] = [
  {
    id: 1,
    title: "INDIA'S GOT LATENT S2 EP9 ft. Raftaar, Balraj Ghai, Sahil Kale",
    channel: 'Samay Raina',
    views: '19.8M views',
    timeAgo: '20h ago',
    viewsPerHour: '780.5K views per hour',
    duration: '50m',
    thumbnail: '/images/image-1.jpg',
    category: 'Comedy',
    videoSrc: '/videos/video-62.mp4',
  },
  {
    id: 2,
    title: "India's Dramatic Last Ball Win | IND vs PAK | Hindi | Highlights",
    channel: 'Sony LIV',
    views: '8.4M views',
    timeAgo: '1d ago',
    viewsPerHour: '51.9K views per hour',
    duration: '28m',
    thumbnail: '/images/image-2.jpg',
    category: 'Sports',
    videoSrc: '/videos/video-63.mp4',
  },
  {
    id: 3,
    title: "India's Dramatic Last Ball Win | DP World Men's U19 Asia Cup 2026",
    channel: 'Sony Sports Network',
    views: '8.0M views',
    timeAgo: '1d ago',
    viewsPerHour: '40K views per hour',
    duration: '28m',
    thumbnail: '/images/image-3.jpg',
    category: 'Sports',
    videoSrc: '/videos/video-64.mp4',
  },
  {
    id: 4,
    title: "INDIA'S GOT LATENT S2 EP8 ft. MC Stan, Tanmay Bhat, Madhur Virli",
    channel: 'Samay Raina',
    views: '26.8M views',
    timeAgo: '21d ago',
    viewsPerHour: '27.2K views per hour',
    duration: '50m',
    thumbnail: '/images/image-4.jpg',
    category: 'Comedy',
    videoSrc: '/videos/video-65.mp4',
  },
  {
    id: 5,
    title: "Oprah's Favorite Things: Caregivers Get the Surprise of a Lifetime",
    channel: 'Oprah',
    views: '2.7M views',
    timeAgo: '3d ago',
    viewsPerHour: '17.4K views per hour',
    duration: '1:19',
    thumbnail: '/images/image-10.jpg',
    category: 'Interview',
    videoSrc: '/videos/video-66.mp4',
  },
  {
    id: 6,
    title: "Katt Williams Talks About His Nine Lives & Stand Up Comeback",
    channel: 'Listen and Laugh',
    views: '2.5M views',
    timeAgo: '2d ago',
    viewsPerHour: '15.5K views per hour',
    duration: '1:11',
    thumbnail: '/images/image-11.jpg',
    category: 'Comedy',
    videoSrc: '/videos/video-67.mp4',
  },
  {
    id: 7,
    title: 'Joe Rogan Experience #2081 - Protect Our Parks 10',
    channel: 'PowerfulJRE',
    views: '2.2M views',
    timeAgo: '5d ago',
    viewsPerHour: '13.3K views per hour',
    duration: '4:16',
    thumbnail: '/images/image-20.jpg',
    category: 'Podcasts',
    videoSrc: '/videos/video-68.mp4',
  },
  {
    id: 8,
    title: 'How Police Captured The Highway Cop Killer - True Crime Special',
    channel: 'BlueTube Police',
    views: '1.9M views',
    timeAgo: '14h ago',
    viewsPerHour: '11.8K views per hour',
    duration: '45m',
    thumbnail: '/images/image-21.jpg',
    category: 'True crime',
    videoSrc: '/videos/video-69.mp4',
  },
  {
    id: 9,
    title: 'SETELAH TSUNAMI - KHM PART 401 - ACEH Documentary',
    channel: 'Nadia Omara',
    views: '1.6M views',
    timeAgo: '17h ago',
    viewsPerHour: '10.1K views per hour',
    duration: '31m',
    thumbnail: '/images/image-22.jpg',
    category: 'Education',
    videoSrc: '/videos/video-70.mp4',
  },
  {
    id: 10,
    title: 'Marvel Television VoiceCast S101 Full Episodes | Official Disney+',
    channel: 'Marvel Entertainment',
    views: '2.2M views',
    timeAgo: '3d ago',
    viewsPerHour: '7.8K views per hour',
    duration: '19m',
    thumbnail: '/images/image-23.jpg',
    category: 'Interview',
    videoSrc: '/videos/video-95.mp4',
  },
  {
    id: 11,
    title: 'Katt Williams: They Tied Me To A Pole And Beat Me',
    channel: 'Club Shay Shay',
    views: '1.4M views',
    timeAgo: '1d ago',
    viewsPerHour: '6.5K views per hour',
    duration: '45m',
    thumbnail: '/images/image-24.jpg',
    category: 'Comedy',
    videoSrc: '/videos/video-96.mp4',
  },
  {
    id: 12,
    title: 'The Rise and Reckoning of Jensen Huang | The Circuit with Emily Chang',
    channel: 'Bloomberg Originals',
    views: '1.1M views',
    timeAgo: '2d ago',
    viewsPerHour: '5.6K views per hour',
    duration: '45m',
    thumbnail: '/images/image-25.jpg',
    category: 'Tech',
    videoSrc: '/videos/video-5.mp4',
  },
];

const WIZARD_VIDEO_IDEAS: WizardIdea[] = [
  {
    id: 1,
    title: 'Podcast best moments',
    desc: 'The strongest moments of an episode, framed for vertical with speaker tracking',
    frames: [
      { image: '/images/image-1.jpg', caption: 'HE' },
      { image: '/images/image-2.jpg', caption: 'THIS' },
      { image: '/images/image-3.jpg', caption: 'NO' },
    ],
  },
  {
    id: 2,
    title: 'Twitch rage moments',
    desc: 'Every time chat gets a reaction out of a streamer, smash keyboard moments',
    frames: [
      { image: '/images/image-4.jpg', caption: 'NO' },
      { image: '/images/image-10.jpg', caption: 'WHAT' },
      { image: '/images/image-11.jpg', caption: "I'M" },
    ],
  },
  {
    id: 3,
    title: 'Kick stream highlights',
    desc: 'The big moments out of a long stream, gaming & IRL stream highlights',
    frames: [
      { image: '/images/image-20.jpg', caption: 'THE' },
      { image: '/images/image-21.jpg', caption: "LET'S" },
      { image: '/images/image-22.jpg', caption: 'WE' },
    ],
  },
  {
    id: 4,
    title: 'Work-out with captions',
    desc: 'First-person gym workout with punchy kinetic captions and high tempo audio',
    frames: [
      { image: '/images/image-23.jpg', caption: 'SOLID' },
      { image: '/images/image-24.jpg', caption: 'CHANGED' },
      { image: '/images/image-25.jpg', caption: 'WOAH' },
    ],
  },
  {
    id: 5,
    title: 'Split POV',
    desc: 'Two perspectives synchronized seamlessly in one vertical short',
    frames: [
      { image: '/images/image-26.jpg', caption: 'NEW' },
      { image: '/images/image-27.jpg', caption: 'JUST' },
      { image: '/images/image-28.jpg', caption: 'DONE' },
    ],
  },
  {
    id: 6,
    title: 'Studio fast 2',
    desc: 'AI animation, cinematic cyberpunk aesthetic with kinetic motion',
    frames: [
      { image: '/images/image-29.jpg', caption: 'CLUTCH' },
      { image: '/images/image-30.jpg', caption: 'OH' },
      { image: '/images/image-31.jpg', caption: 'GOD' },
    ],
  },
  {
    id: 7,
    title: 'Found-footage stream',
    desc: 'Doorbell camera and security cam strange encounters at dusk',
    frames: [
      { image: '/images/image-32.jpg', caption: 'LOOK' },
      { image: '/images/image-33.jpg', caption: 'WAIT' },
      { image: '/images/image-34.jpg', caption: 'SEE' },
    ],
  },
  {
    id: 8,
    title: '3D cartoon / claymation',
    desc: 'Whimsical miniature scenes in motion with playful clay figures',
    frames: [
      { image: '/images/image-35.jpg', caption: 'CLAY' },
      { image: '/images/image-36.jpg', caption: 'POP' },
      { image: '/images/image-37.jpg', caption: 'WOW' },
    ],
  },
  {
    id: 9,
    title: 'Cute cartoon 3D',
    desc: 'Playful baby toy characters in animated shorts with bright colors',
    frames: [
      { image: '/images/image-38.jpg', caption: 'BABY' },
      { image: '/images/image-39.jpg', caption: 'SMILE' },
      { image: '/images/image-40.jpg', caption: 'JOY' },
    ],
  },
  {
    id: 10,
    title: 'Nursery rhyme',
    desc: 'Delightful toddler 3D animation musical songs and catchy melodies',
    frames: [
      { image: '/images/image-41.jpg', caption: 'SING' },
      { image: '/images/image-42.jpg', caption: 'DUCK' },
      { image: '/images/image-43.jpg', caption: 'SPLASH' },
    ],
  },
  {
    id: 11,
    title: 'Animal moments',
    desc: 'Funny pets, wild nature and wildlife encounters caught on video',
    frames: [
      { image: '/images/image-44.jpg', caption: 'CAT' },
      { image: '/images/image-45.jpg', caption: 'DOG' },
      { image: '/images/image-46.jpg', caption: 'WILD' },
    ],
  },
  {
    id: 12,
    title: 'Caught on camera',
    desc: 'Security, dashcam and phone moments caught live in high definition',
    frames: [
      { image: '/images/image-47.jpg', caption: 'OMG' },
      { image: '/images/image-48.jpg', caption: 'WATCH' },
      { image: '/images/image-49.jpg', caption: 'REAL' },
    ],
  },
  {
    id: 13,
    title: 'Courtroom real drama',
    desc: 'Heated trials, lawyer arguments and surprise testimony',
    frames: [
      { image: '/images/image-50.jpg', caption: 'ORDER' },
      { image: '/images/image-51.jpg', caption: 'JUDGE' },
      { image: '/images/image-52.jpg', caption: 'PROOF' },
    ],
  },
  {
    id: 14,
    title: 'Retro aesthetic montage',
    desc: 'Film look, 90s camcorder and VHS feels with vintage grading',
    frames: [
      { image: '/images/image-53.jpg', caption: '90S' },
      { image: '/images/image-1.jpg', caption: 'VHS' },
      { image: '/images/image-2.jpg', caption: 'TAPE' },
    ],
  },
  {
    id: 15,
    title: '4K UHD ASMR',
    desc: 'Satisfying kinetic motion & hydraulic press tests with crystal audio',
    frames: [
      { image: '/images/image-3.jpg', caption: 'CRUSH' },
      { image: '/images/image-4.jpg', caption: 'PRESS' },
      { image: '/images/image-10.jpg', caption: 'CHILL' },
    ],
  },
  {
    id: 16,
    title: 'AI influencer',
    desc: 'Talking head with hyper-realistic script delivery and expressions',
    frames: [
      { image: '/images/image-11.jpg', caption: 'TIP' },
      { image: '/images/image-20.jpg', caption: 'HACK' },
      { image: '/images/image-21.jpg', caption: 'GLOW' },
    ],
  },
  {
    id: 17,
    title: 'Bouncing videos',
    desc: 'Hypnotic 3D loop simulations and physics with endless bounce',
    frames: [
      { image: '/images/image-22.jpg', caption: 'BOUNCE' },
      { image: '/images/image-23.jpg', caption: 'LOOP' },
      { image: '/images/image-24.jpg', caption: 'FLOW' },
    ],
  },
  {
    id: 18,
    title: 'AI car/space explainer',
    desc: 'Documentary style 3D space and machine explainers with cutaways',
    frames: [
      { image: '/images/image-25.jpg', caption: 'ORBIT' },
      { image: '/images/image-26.jpg', caption: 'MOON' },
      { image: '/images/image-27.jpg', caption: 'MARS' },
    ],
  },
  {
    id: 19,
    title: 'Property walkthrough',
    desc: 'Smooth cinematic real-estate tours with floor plans and highlights',
    frames: [
      { image: '/images/image-28.jpg', caption: 'HOME' },
      { image: '/images/image-29.jpg', caption: 'LUXURY' },
      { image: '/images/image-30.jpg', caption: 'VIEW' },
    ],
  },
  {
    id: 20,
    title: 'GTA style gameplay',
    desc: 'Cinematic open-world sports car stunts and police chases',
    frames: [
      { image: '/images/image-31.jpg', caption: 'SPEED' },
      { image: '/images/image-32.jpg', caption: 'DRIFT' },
      { image: '/images/image-33.jpg', caption: 'WIN' },
    ],
  },
  {
    id: 21,
    title: 'Anime your video',
    desc: 'Turn real life video clips into anime style scenes with ink outlines',
    frames: [
      { image: '/images/image-34.jpg', caption: 'ANIME' },
      { image: '/images/image-35.jpg', caption: 'FIGHT' },
      { image: '/images/image-36.jpg', caption: 'SPARK' },
    ],
  },
  {
    id: 22,
    title: 'Coloring book for Amazon KDP',
    desc: 'Create and outline children coloring book pages and printable covers',
    frames: [
      { image: '/images/image-37.jpg', caption: 'DRAW' },
      { image: '/images/image-38.jpg', caption: 'KDP' },
      { image: '/images/image-39.jpg', caption: 'BOOK' },
    ],
  },
  {
    id: 23,
    title: 'AI images',
    desc: 'High-res realistic photo prompts, fashion & photography',
    frames: [
      { image: '/images/image-40.jpg', caption: 'PHOTO' },
      { image: '/images/image-41.jpg', caption: 'STUDIO' },
      { image: '/images/image-42.jpg', caption: 'RAW' },
    ],
  },
];

const WIZARD_SINGLE_LOOKS = [
  { id: 1, title: 'Doorbell cam at dusk', tag: 'Found-footage', image: '/images/image-1.jpg' },
  { id: 2, title: 'Raccoon raids kitchen', tag: 'Security cam', image: '/images/image-3.jpg' },
  { id: 3, title: 'Seagull sandwich heist', tag: 'Phone video', image: '/images/image-10.jpg' },
  { id: 4, title: 'Bottles under hydraulic press', tag: 'Press test', image: '/images/image-20.jpg' },
  { id: 5, title: 'Goose vs delivery driver', tag: 'Porch cam', image: '/images/image-2.jpg' },
  { id: 6, title: 'Goat on misty ridge', tag: 'Chest cam', image: '/images/image-4.jpg' },
  { id: 7, title: 'Rooftop storm courier', tag: 'Anime moment', image: '/images/image-11.jpg' },
  { id: 8, title: 'Snow leopard at dawn', tag: 'Wild nature', image: '/images/image-21.jpg' },
];

export default function ClipscutApp() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<
    'studio' | 'wizard' | 'claude' | 'caption-remover' | 'prompt-library' | 'clip' | 'explore'
  >('wizard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // User & Credits State
  const [credits, setCredits] = useState(0);
  const [clipsCount, setClipsCount] = useState(0);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video Player Modal
  const [activeVideoModal, setActiveVideoModal] = useState<{
    isOpen: boolean;
    videoSrc: string;
    title: string;
    subtitle?: string;
  } | null>(null);

  // Filter & Search States
  const [promptCategory, setPromptCategory] = useState('All');
  const [exploreCategory, setExploreCategory] = useState('All');
  const [exploreList, setExploreList] = useState(EXPLORE_VIDEOS);
  const [isRefreshingFeed, setIsRefreshingFeed] = useState(false);
  const [makingId, setMakingId] = useState<number | null>(null);
  const [copiedMcp, setCopiedMcp] = useState(false);

  // Wizard Tab Filter
  const [wizardTab, setWizardTab] = useState('Clip a video');

  // Clip Dashboard States
  const [clipUrl, setClipUrl] = useState('');
  const [isClipping, setIsClipping] = useState(false);
  const [clipStep, setClipStep] = useState<string>('');
  const [clipProgress, setClipProgress] = useState(0);
  const [recentProjects, setRecentProjects] = useState<ProjectClip[]>([]);

  // Studio States
  const [studioDeckIndex, setStudioDeckIndex] = useState(2); // Porch cam
  const [studioPrompt, setStudioPrompt] = useState(
    'A delivery driver sets down a parcel and a goose chases them back down the path'
  );
  const [selectedTemplateTag, setSelectedTemplateTag] = useState('Porch cam');
  const [templateFilter, setTemplateFilter] = useState('All');
  const [studioQuality, setStudioQuality] = useState<'480p' | '720p' | '1080p'>('480p');
  const [studioDuration, setStudioDuration] = useState<'5s' | '8s' | '15s' | '30s'>('8s');
  const [studioModel, setStudioModel] = useState<'Clipscut Shorts' | 'Cinematic 4K' | 'Fast Anime'>('Clipscut Shorts');
  const [isStudioGenerating, setIsStudioGenerating] = useState(false);
  const [studioProgress, setStudioProgress] = useState(0);

  // Caption Remover States
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isRemovingCaptions, setIsRemovingCaptions] = useState(false);
  const [captionProgress, setCaptionProgress] = useState(0);
  const [captionStage, setCaptionStage] = useState('Detecting subtitle bounding boxes...');
  const [isCaptionDone, setIsCaptionDone] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const clipFileInputRef = useRef<HTMLInputElement>(null);

  // MCP Claude States
  const [activeMcpTab, setActiveMcpTab] = useState('Stream clips');
  const [mcpPlatform, setMcpPlatform] = useState<'Claude' | 'ChatGPT' | 'Claude Code & Cursor'>('Claude');

  const MCP_URL = 'https://Clipscut.ai/api/mcp';

  // Helper Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Sync hash with currentPage
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'studio') setCurrentPage('studio');
      else if (hash === 'wizard') setCurrentPage('wizard');
      else if (hash === 'claude' || hash === 'use-in-claude') setCurrentPage('claude');
      else if (hash === 'caption-remover') setCurrentPage('caption-remover');
      else if (hash === 'prompt-library') setCurrentPage('prompt-library');
      else if (hash === 'clip') setCurrentPage('clip');
      else if (hash === 'explore') setCurrentPage('explore');
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: typeof currentPage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = (text: string, label: string = 'URL copied to clipboard!') => {
    navigator.clipboard.writeText(text);
    setCopiedMcp(true);
    showToast(label);
    setTimeout(() => setCopiedMcp(false), 2000);
  };

  // Enhance prompt with AI
  const handleEnhancePrompt = () => {
    const additions = [
      'shot on 35mm film, hyper-realistic, dramatic lighting, 4K UHD cinematic angle',
      'golden hour lighting, punchy kinetic typography, viral hook pacing',
      'extreme close-up macro details, smooth camera push-in, rich color grading',
    ];
    const picked = additions[Math.floor(Math.random() * additions.length)];
    setStudioPrompt((prev) => `${prev.trim()}, ${picked}`);
    showToast('Prompt enhanced with cinematic keywords ✨');
  };

  // Run Studio Generation
  const handleGenerateShort = () => {
    if (credits < 8) {
      setIsPricingModalOpen(true);
      return;
    }

    setCredits((prev) => Math.max(0, prev - 8));
    setIsStudioGenerating(true);
    setStudioProgress(15);
    showToast('Generating short with Clipscut Shorts model...');

    const interval = setInterval(() => {
      setStudioProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          setIsStudioGenerating(false);

          // Add generated video to projects
          const newProject: ProjectClip = {
            id: `proj-${Date.now()}`,
            title: studioPrompt.slice(0, 36) + '...',
            sourceUrl: 'Studio Text-to-Video',
            duration: studioDuration,
            score: 9.8,
            videoSrc: '/videos/video-62.mp4',
            thumbnail: STUDIO_FAN_CARDS[studioDeckIndex]?.image || '/images/image-1.jpg',
            createdAt: 'Just now',
          };
          setRecentProjects((p) => [newProject, ...p]);
          setClipsCount((c) => c + 1);
          showToast('Short successfully rendered! Added to projects 🎬');
          return 100;
        }
        return prev + 20;
      });
    }, 450);
  };

  // Run Clipping Process
  const handleStartClipping = (customUrl?: string) => {
    const targetUrl = customUrl || clipUrl;
    if (!targetUrl.trim()) {
      showToast('Please paste a video link or pick one below!');
      return;
    }

    setIsClipping(true);
    setClipProgress(10);
    setClipStep('Downloading video stream and analyzing speech...');

    setTimeout(() => {
      setClipProgress(45);
      setClipStep('Identifying highest retention moments and viral hooks...');
    }, 1000);

    setTimeout(() => {
      setClipProgress(80);
      setClipStep('Framing speaker vertical 9:16 and applying animated captions...');
    }, 2000);

    setTimeout(() => {
      setClipProgress(100);
      setIsClipping(false);

      const generatedClips: ProjectClip[] = [
        {
          id: `clip-1-${Date.now()}`,
          title: 'Dramatic punchline and audience roar',
          sourceUrl: targetUrl,
          duration: '32s',
          score: 9.8,
          videoSrc: '/videos/video-63.mp4',
          thumbnail: '/images/image-1.jpg',
          createdAt: 'Just now',
        },
        {
          id: `clip-2-${Date.now()}`,
          title: 'Unbelievable plot twist moment',
          sourceUrl: targetUrl,
          duration: '45s',
          score: 9.4,
          videoSrc: '/videos/video-64.mp4',
          thumbnail: '/images/image-2.jpg',
          createdAt: 'Just now',
        },
      ];

      setRecentProjects((prev) => [...generatedClips, ...prev]);
      setClipsCount((c) => c + 2);
      showToast('Created 2 high-scoring viral clips! 🚀');
    }, 3000);
  };

  // Caption Remover Simulation
  const handleCaptionFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFile(file.name);
      startCaptionRemovalProcess();
    }
  };

  const startCaptionRemovalProcess = () => {
    setIsRemovingCaptions(true);
    setIsCaptionDone(false);
    setCaptionProgress(15);
    setCaptionStage('Scanning subtitle bounding boxes...');

    setTimeout(() => {
      setCaptionProgress(48);
      setCaptionStage('AI temporal frame inpainting & background reconstruction...');
    }, 1200);

    setTimeout(() => {
      setCaptionProgress(85);
      setCaptionStage('Encoding high-bitrate clean video cut...');
    }, 2400);

    setTimeout(() => {
      setCaptionProgress(100);
      setIsRemovingCaptions(false);
      setIsCaptionDone(true);
      showToast('Burned-in captions removed cleanly! ✨');
    }, 3400);
  };

  // Explore Refresh
  const handleRefreshExplore = () => {
    setIsRefreshingFeed(true);
    setTimeout(() => {
      setExploreList((prev) => [...prev].sort(() => Math.random() - 0.5));
      setIsRefreshingFeed(false);
      showToast('Trending feed refreshed!');
    }, 500);
  };

  // Add Free Credits Action
  const handleClaimFreeTrial = () => {
    setCredits((prev) => prev + 50);
    setIsPricingModalOpen(false);
    showToast('Added 50 Free Trial Credits to your account! 🎉');
  };

  // MCP Content depending on Platform
  const getMcpSnippet = () => {
    if (mcpPlatform === 'Claude') {
      return MCP_URL;
    } else if (mcpPlatform === 'ChatGPT') {
      return 'https://Clipscut.ai/api/mcp/gpt-schema.json';
    } else {
      return 'claude mcp add clipscut https://Clipscut.ai/api/mcp';
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#191c1f] flex font-sans selection:bg-[#2a3ffb] selection:text-white">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#191C1F] text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/10 animate-rise">
          <Sparkles className="w-4 h-4 text-[#FFE600]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#16181A] rounded-[24px] overflow-hidden max-w-[850px] w-full border border-white/15 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 text-white">
              <div>
                <h3 className="font-semibold text-sm sm:text-base leading-tight truncate">
                  {activeVideoModal.title}
                </h3>
                {activeVideoModal.subtitle && (
                  <p className="text-xs text-white/60">{activeVideoModal.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={activeVideoModal.videoSrc}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 bg-zinc-900/90 flex items-center justify-between">
              <span className="text-xs text-white/60">Clipscut HD Player</span>
              <div className="flex items-center gap-2">
                <a
                  href={activeVideoModal.videoSrc}
                  download="clipscut-video.mp4"
                  className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download MP4</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PLANS & PRICING MODAL */}
      {isPricingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[28px] max-w-[750px] w-full p-6 sm:p-8 shadow-2xl border border-[#e2e2e7] flex flex-col gap-6 relative">
            <button
              type="button"
              onClick={() => setIsPricingModalOpen(false)}
              className="absolute top-5 right-5 text-[#8D969E] hover:text-[#191C1F] p-1.5 rounded-full hover:bg-[#f4f4f4]"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2A3FFB] mb-1">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Clipscut Credits & Plans</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-tight font-medium text-[#191C1F]">
                Choose a plan to make videos
              </h2>
              <p className="text-xs sm:text-sm text-[#505A63] mt-1">
                Every video short uses 8 credits. Get instant credits or claim your free starter quota.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Free Trial Tier */}
              <div className="border border-[#e2e2e7] rounded-[20px] p-5 flex flex-col justify-between hover:border-[#2A3FFB] transition-all bg-[#FCFCFD]">
                <div>
                  <span className="text-xs font-bold text-[#8D969E]">Starter Trial</span>
                  <div className="text-2xl font-bold text-[#191C1F] mt-1">Free</div>
                  <p className="text-xs text-[#505A63] mt-1">50 trial credits to explore features</p>
                  <ul className="text-xs text-[#505A63] space-y-1.5 mt-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>6 high-def video generations</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>Standard generation speed</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={handleClaimFreeTrial}
                  className="mt-6 bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-all shadow-sm active:scale-95 text-center"
                >
                  Claim 50 Credits
                </button>
              </div>

              {/* Creator Tier */}
              <div className="border-2 border-[#2A3FFB] rounded-[20px] p-5 flex flex-col justify-between relative bg-white shadow-md">
                <span className="absolute -top-3 left-5 bg-[#2A3FFB] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  Popular
                </span>
                <div>
                  <span className="text-xs font-bold text-[#2A3FFB]">Creator</span>
                  <div className="text-2xl font-bold text-[#191C1F] mt-1">
                    $19 <span className="text-xs font-normal text-[#8D969E]">/ mo</span>
                  </div>
                  <p className="text-xs text-[#505A63] mt-1">200 credits renewed monthly</p>
                  <ul className="text-xs text-[#505A63] space-y-1.5 mt-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>25 AI shorts & caption cuts</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>1080p high quality render</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>Claude & ChatGPT MCP support</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCredits((c) => c + 200);
                    setIsPricingModalOpen(false);
                    showToast('Subscribed to Creator plan! 200 credits added.');
                  }}
                  className="mt-6 bg-[#191C1F] hover:bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-all shadow-sm active:scale-95 text-center"
                >
                  Select Creator
                </button>
              </div>

              {/* Pro Tier */}
              <div className="border border-[#e2e2e7] rounded-[20px] p-5 flex flex-col justify-between hover:border-[#2A3FFB] transition-all bg-[#FCFCFD]">
                <div>
                  <span className="text-xs font-bold text-[#8D969E]">Pro Studio</span>
                  <div className="text-2xl font-bold text-[#191C1F] mt-1">
                    $49 <span className="text-xs font-normal text-[#8D969E]">/ mo</span>
                  </div>
                  <p className="text-xs text-[#505A63] mt-1">1,000 monthly credits & API</p>
                  <ul className="text-xs text-[#505A63] space-y-1.5 mt-4">
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>125 high definition shorts</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>Fast queue generation</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                      <span>Custom brand kit & fonts</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCredits((c) => c + 1000);
                    setIsPricingModalOpen(false);
                    showToast('Subscribed to Pro Studio plan! 1000 credits added.');
                  }}
                  className="mt-6 bg-[#191C1F] hover:bg-black text-white text-xs font-semibold py-2.5 px-4 rounded-full transition-all shadow-sm active:scale-95 text-center"
                >
                  Select Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEFT SIDEBAR */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white border-r border-[#f4f4f4] flex flex-col justify-between transition-all duration-200 ${
          sidebarOpen ? 'w-[230px]' : 'w-[68px]'
        }`}
      >
        <div className="flex flex-col">
          {/* Header Brand */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-transparent">
            <a
              href="#wizard"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('wizard');
              }}
              className="flex items-center gap-2.5 overflow-hidden"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FFE600] flex items-center justify-center font-black text-sm text-[#191C1F] shrink-0 shadow-sm">
                C
              </div>
              {sidebarOpen && (
                <span className="font-tight text-lg font-bold tracking-tight text-[#191c1f]">
                  Clipscut
                </span>
              )}
            </a>
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#8D969E] hover:text-[#191C1F] p-1.5 rounded-lg hover:bg-[#f4f4f4] transition-colors"
              title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {sidebarOpen ? <SidebarClose className="w-4 h-4" /> : <SidebarOpen className="w-4 h-4" />}
            </button>
          </div>

          {/* STUDIO SPECIFIC SIDEBAR (media_234fb6ef) */}
          {currentPage === 'studio' ? (
            <div className="p-3 space-y-4">
              <button
                type="button"
                onClick={() => navigateTo('wizard')}
                className="flex items-center gap-2 text-xs font-medium text-[#505A63] hover:text-[#191C1F] px-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {sidebarOpen && <span>Home</span>}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStudioPrompt('Enter a new prompt for your short...');
                  showToast('Ready for new project!');
                }}
                className="w-full bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                {sidebarOpen && <span>New project</span>}
              </button>

              {sidebarOpen && (
                <div className="px-2 pt-2 text-xs text-[#8D969E] space-y-1">
                  <div className="flex justify-between font-medium">
                    <span>Projects</span>
                    <span>{recentProjects.length}</span>
                  </div>
                  <p className="text-[11px] pt-1 text-[#8D969E]/80">
                    {recentProjects.length === 0
                      ? 'Your projects show up here.'
                      : `${recentProjects.length} generated project(s)`}
                  </p>
                </div>
              )}

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => navigateTo('prompt-library')}
                  className="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium text-[#505A63] hover:text-[#191C1F] rounded-lg w-full"
                >
                  <LayoutGrid className="w-4 h-4 text-[#8D969E]" />
                  {sidebarOpen && <span>All videos</span>}
                </button>
              </div>
            </div>
          ) : (
            /* DEFAULT NAVIGATION LINKS */
            <nav className="p-3 space-y-1">
              <button
                type="button"
                onClick={() => navigateTo('clip')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
                  currentPage === 'clip'
                    ? 'bg-[#f4f4f4] text-[#191C1F] font-semibold'
                    : 'text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4]'
                }`}
              >
                <Scissors className="w-4 h-4 shrink-0 text-[#191C1F]" />
                {sidebarOpen && <span>Clip</span>}
              </button>

              <button
                type="button"
                onClick={() => navigateTo('explore')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
                  currentPage === 'explore'
                    ? 'bg-[#f4f4f4] text-[#191C1F] font-semibold'
                    : 'text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4]'
                }`}
              >
                <Compass className="w-4 h-4 shrink-0 text-[#191C1F]" />
                {sidebarOpen && <span>Explore</span>}
              </button>

              {/* Wizard (Agent) */}
              <button
                type="button"
                onClick={() => navigateTo('wizard')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
                  currentPage === 'wizard'
                    ? 'bg-[#f4f4f4] text-[#191C1F] font-semibold'
                    : 'text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wand2 className="w-4 h-4 shrink-0 text-[#191C1F]" />
                  {sidebarOpen && <span>Wizard</span>}
                </div>
                {sidebarOpen && <span className="badge-pill">Agent</span>}
              </button>

              {/* Studio */}
              <button
                type="button"
                onClick={() => navigateTo('studio')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4] transition-colors text-left"
              >
                <Video className="w-4 h-4 shrink-0 text-[#191C1F]" />
                {sidebarOpen && <span>Studio</span>}
              </button>

              {/* Use in Claude */}
              <button
                type="button"
                onClick={() => navigateTo('claude')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
                  currentPage === 'claude'
                    ? 'bg-[#f4f4f4] text-[#191C1F] font-semibold'
                    : 'text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4]'
                }`}
              >
                <Bot className="w-4 h-4 shrink-0 text-[#191C1F]" />
                {sidebarOpen && <span>Use in Claude</span>}
              </button>

              {/* Library Group */}
              <div className="pt-4">
                {sidebarOpen && (
                  <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#8D969E] mb-1.5">
                    Library
                  </p>
                )}
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => navigateTo('prompt-library')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
                      currentPage === 'prompt-library'
                        ? 'bg-[#f4f4f4] text-[#191C1F] font-semibold'
                        : 'text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4]'
                    }`}
                  >
                    <FileText className="w-4 h-4 shrink-0 text-[#191C1F]" />
                    {sidebarOpen && <span>Prompt library</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (recentProjects.length > 0) {
                        navigateTo('clip');
                      } else {
                        navigateTo('studio');
                        showToast('Start a project to see it in your library!');
                      }
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4] transition-colors text-left"
                  >
                    <Folder className="w-4 h-4 shrink-0 text-[#191C1F]" />
                    {sidebarOpen && <span>My projects ({recentProjects.length})</span>}
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('caption-remover')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors text-left ${
                      currentPage === 'caption-remover'
                        ? 'bg-[#f4f4f4] text-[#191C1F] font-semibold'
                        : 'text-[#505A63] hover:text-[#191C1F] hover:bg-[#f4f4f4]'
                    }`}
                  >
                    <Scissors className="w-4 h-4 shrink-0 text-[#191C1F]" />
                    {sidebarOpen && <span>Caption remover</span>}
                  </button>
                </div>
              </div>
            </nav>
          )}
        </div>

        {/* User Account Popover */}
        <div className="p-3 border-t border-[#f4f4f4] relative">
          {isAccountOpen && (
            <div className="absolute bottom-16 left-3 right-3 bg-white border border-[#e2e2e7] rounded-2xl shadow-xl p-3 flex flex-col gap-2 z-50">
              <div className="pb-2 border-b border-[#f4f4f4]">
                <span className="text-xs font-semibold text-[#191C1F] block">afrinakthar80</span>
                <span className="text-[11px] text-[#8D969E]">afrinakthar80@gmail.com</span>
              </div>
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-[#505A63]">Credits remaining</span>
                <span className="font-bold text-[#00A87E]">{credits} credits</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsAccountOpen(false);
                  setIsPricingModalOpen(true);
                }}
                className="w-full bg-[#191C1F] hover:bg-black text-white text-xs font-semibold py-2 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Add Credits / Plans</span>
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsAccountOpen(!isAccountOpen)}
            className="flex w-full items-center gap-2.5 p-1.5 rounded-xl hover:bg-[#f4f4f4] transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-full bg-[#191C1F] text-white flex items-center justify-center font-bold text-xs shrink-0">
              A
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#191C1F] truncate leading-tight">
                  afrinakthar80
                </div>
                <div className="text-[11px] font-semibold text-[#00A87E] flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00A87E]" />
                  <span>{credits} credits</span>
                </div>
              </div>
            )}
            {sidebarOpen && <ChevronDown className="w-3.5 h-3.5 text-[#8D969E] shrink-0" />}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main
        className={`flex-1 min-w-0 transition-all duration-200 ${
          sidebarOpen ? 'pl-[230px]' : 'pl-[68px]'
        }`}
      >
        {/* ======================================================== */}
        {/* 1. PAGE: WIZARD / "Make something today"                 */}
        {/* ======================================================== */}
        {currentPage === 'wizard' && (
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-10 flex flex-col gap-10">
            {/* Header / Title */}
            <div className="flex flex-col items-center justify-center text-center gap-5 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFE600] flex items-center justify-center font-black text-base text-[#191C1F] shadow-sm">
                  C
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-tight font-medium text-[#191C1F] tracking-tight">
                  Make something today
                </h1>
              </div>

              {/* Plan Banner */}
              <div className="w-full max-w-[680px] bg-white border border-[#e2e2e7] rounded-[24px] px-6 py-3.5 flex items-center justify-between gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <span className="text-xs sm:text-[13px] text-[#191C1F] font-normal">
                  Choose a plan to clip and edit with the Wizard.
                </span>
                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="bg-[#191C1F] hover:bg-black text-white text-xs font-semibold px-5 py-2 rounded-full transition-all shrink-0 active:scale-95"
                >
                  See plans
                </button>
              </div>

              {/* Quick Action Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full scrollbar-none">
                {[
                  { label: 'Clip a video', icon: Scissors, action: () => navigateTo('clip') },
                  { label: 'Make a video', icon: Sparkles, action: () => navigateTo('studio') },
                  { label: 'Make images', icon: ImageIcon, action: () => { setStudioPrompt('Cinematic 4K realistic photography portrait'); navigateTo('studio'); } },
                  { label: 'Coloring book', icon: BookOpen, action: () => { setStudioPrompt('Children storybook coloring book outline illustration'); navigateTo('studio'); } },
                  { label: 'Remove captions', icon: Scissors, action: () => navigateTo('caption-remover') },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = wizardTab === tab.label;
                  return (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => {
                        setWizardTab(tab.label);
                        tab.action();
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all border shrink-0 ${
                        isActive
                          ? 'bg-[#191C1F] text-white border-[#191C1F]'
                          : 'bg-white text-[#191C1F] border-[#e2e2e7] hover:border-[#191C1F]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION: Video ideas (3-Column Grid with 3-frame vertical panels per card) */}
            <div className="flex flex-col gap-4">
              <h2 className="text-base sm:text-lg font-bold text-[#191C1F]">Video ideas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {WIZARD_VIDEO_IDEAS.map((idea) => (
                  <div
                    key={idea.id}
                    className="bg-white border border-[#e2e2e7] hover:border-[#2A3FFB]/60 rounded-[22px] p-3 flex flex-col justify-between gap-3 group transition-all shadow-sm hover:shadow-md"
                  >
                    {/* 3 Vertical Frames Side-by-Side */}
                    <div className="grid grid-cols-3 gap-1.5 rounded-[16px] overflow-hidden bg-black p-1">
                      {idea.frames.map((frame, fIdx) => (
                        <div
                          key={fIdx}
                          onClick={() => {
                            setActiveVideoModal({
                              isOpen: true,
                              videoSrc: `/videos/video-${(fIdx % 10) + 62}.mp4`,
                              title: `${idea.title} - Clip #${fIdx + 1}`,
                              subtitle: `Kinetic hook: "${frame.caption}"`,
                            });
                          }}
                          className="relative aspect-[9/16] rounded-[10px] overflow-hidden bg-zinc-900 group/frame cursor-pointer"
                        >
                          <img
                            src={frame.image}
                            alt={frame.caption}
                            className="w-full h-full object-cover group-hover/frame:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/frame:opacity-100 flex items-center justify-center transition-opacity">
                            <Play className="w-5 h-5 text-white fill-current" />
                          </div>
                          <div className="absolute inset-x-0 bottom-2 text-center px-1">
                            <span className="font-black text-xs sm:text-[13px] text-[#FFE600] tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              {frame.caption}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Card Footer: Title + Subtitle + "Use prompt" Button */}
                    <div className="flex items-start justify-between gap-3 pt-1 px-1">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm text-[#191C1F] leading-tight mb-1 truncate">
                          {idea.title}
                        </h3>
                        <p className="text-[11px] text-[#505A63] line-clamp-1 leading-normal">
                          {idea.desc}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setStudioPrompt(idea.desc);
                          navigateTo('studio');
                          showToast(`Loaded "${idea.title}" into Studio!`);
                        }}
                        className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold px-4 py-1.5 rounded-full shrink-0 transition-all shadow-sm active:scale-95"
                      >
                        Use prompt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: Single-clip looks */}
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-bold text-[#191C1F]">Single-clip looks</h2>
                <button
                  type="button"
                  onClick={() => navigateTo('prompt-library')}
                  className="text-xs font-semibold text-[#2A3FFB] hover:underline"
                >
                  View more →
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {WIZARD_SINGLE_LOOKS.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setStudioPrompt(`Single-clip short in ${item.tag} style: ${item.title}`);
                      navigateTo('studio');
                      showToast(`Selected ${item.tag} style!`);
                    }}
                    className="relative rounded-[20px] overflow-hidden bg-zinc-900 aspect-[9/13] group cursor-pointer shadow-sm hover:ring-2 hover:ring-[#2A3FFB] transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] text-white/70 font-semibold">{item.tag}</span>
                      <p className="font-semibold text-xs leading-tight truncate">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION: Everyday tools */}
            <div className="flex flex-col gap-3 pt-4 pb-12">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#8D969E]">
                Everyday tools
              </h2>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'Clip', icon: Scissors, act: () => navigateTo('clip') },
                  { name: 'Generator', icon: Zap, act: () => navigateTo('studio') },
                  { name: 'Story', icon: BookOpen, act: () => { setPromptCategory('Story'); navigateTo('prompt-library'); } },
                  { name: 'Image', icon: ImageIcon, act: () => { setStudioPrompt('Cinematic photography portrait'); navigateTo('studio'); } },
                  { name: 'Coloring book', icon: BookOpen, act: () => { setStudioPrompt('Coloring book outline page for children'); navigateTo('studio'); } },
                  { name: 'Remove captions', icon: Scissors, act: () => navigateTo('caption-remover') },
                  { name: 'Captions', icon: MessageSquare, act: () => navigateTo('caption-remover') },
                  { name: 'Trending', icon: Flame, act: () => navigateTo('explore') },
                  { name: 'Text', icon: FileText, act: () => navigateTo('prompt-library') },
                  { name: 'Cut', icon: Scissors, act: () => navigateTo('clip') },
                  { name: 'Layout', icon: LayoutGrid, act: () => navigateTo('studio') },
                  { name: 'Headline', icon: FileText, act: () => navigateTo('explore') },
                  { name: 'Fix audio', icon: Music, act: () => showToast('Audio AI voice enhancement loaded') },
                  { name: 'Import', icon: Download, act: () => clipFileInputRef.current?.click() },
                  { name: 'Jobs', icon: Folder, act: () => navigateTo('clip') },
                  { name: 'Credits', icon: Zap, act: () => setIsPricingModalOpen(true) },
                ].map((tool, idx) => {
                  const ToolIcon = tool.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={tool.act}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F4F4F4] hover:bg-[#e8e8ed] text-xs font-semibold text-[#191C1F] transition-colors"
                    >
                      <ToolIcon className="w-3 h-3 text-[#505A63]" />
                      <span>{tool.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 2. PAGE: STUDIO                                          */}
        {/* ======================================================== */}
        {currentPage === 'studio' && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-10">
            {/* Top Deck / Interactive Fan of Thumbnails */}
            <div className="flex flex-col items-center justify-center pt-4">
              <div className="relative flex items-center justify-center w-full max-w-[500px] h-[170px]">
                {STUDIO_FAN_CARDS.map((card, idx) => {
                  const isCenter = idx === studioDeckIndex;
                  const offset = idx - 2;
                  const rot = offset * 8;
                  const xShift = offset * 70;
                  const yShift = Math.abs(offset) * 8;

                  return (
                    <div
                      key={card.id}
                      onClick={() => {
                        setStudioDeckIndex(idx);
                        setSelectedTemplateTag(card.tag);
                        setStudioPrompt(card.prompt);
                        showToast(`Selected "${card.tag}" style!`);
                      }}
                      style={{
                        transform: `translateX(${xShift}px) translateY(${yShift}px) rotate(${rot}deg)`,
                        zIndex: isCenter ? 20 : 10 - Math.abs(offset),
                      }}
                      className={`absolute w-[108px] h-[155px] rounded-[18px] overflow-hidden bg-zinc-900 border-2 cursor-pointer transition-all duration-300 shadow-xl ${
                        isCenter
                          ? 'border-[#2A3FFB] ring-4 ring-[#2A3FFB]/30 scale-110'
                          : 'border-white opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-2 left-2 text-[9px] font-bold text-white bg-black/60 px-1.5 py-0.5 rounded">
                        {card.tag}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl font-tight font-medium text-[#191C1F] tracking-tight mt-8 mb-6 text-center">
                Make a short that already works
              </h1>

              {/* Studio Prompt Box */}
              <div className="w-full max-w-[760px] bg-white border border-[#e2e2e7] rounded-[24px] p-4 sm:p-5 shadow-sm flex flex-col gap-4">
                <div className="flex items-start gap-3.5">
                  <div
                    onClick={() => {
                      const next = (studioDeckIndex + 1) % STUDIO_FAN_CARDS.length;
                      setStudioDeckIndex(next);
                      setStudioPrompt(STUDIO_FAN_CARDS[next].prompt);
                      setSelectedTemplateTag(STUDIO_FAN_CARDS[next].tag);
                    }}
                    className="relative w-[75px] h-[85px] rounded-[14px] overflow-hidden bg-[#16181A] shrink-0 border border-[#e2e2e7] group cursor-pointer"
                    title="Click to cycle style"
                  >
                    <img
                      src={STUDIO_FAN_CARDS[studioDeckIndex]?.image || '/images/image-2.jpg'}
                      alt="Preview"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-black/75 py-0.5 text-center text-[9px] text-white font-medium">
                      {STUDIO_FAN_CARDS[studioDeckIndex]?.tag || selectedTemplateTag}
                      <span className="block text-[8px] text-[#FFE600]">Change</span>
                    </div>
                  </div>

                  <textarea
                    value={studioPrompt}
                    onChange={(e) => setStudioPrompt(e.target.value)}
                    rows={2}
                    className="flex-1 bg-transparent text-sm sm:text-[15px] text-[#191C1F] font-normal resize-none focus:outline-none placeholder-gray-400 pt-1"
                    placeholder="Describe the video you want to generate..."
                  />

                  <button
                    type="button"
                    onClick={handleEnhancePrompt}
                    className="text-[#8D969E] hover:text-[#2A3FFB] p-1.5 transition-colors"
                    title="Enhance prompt with AI"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Row: Options Pills + Credits & Arrow */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#f4f4f4]">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => showToast('Advanced aspect ratios: 9:16 vertical short selected')}
                      className="w-7 h-7 rounded-full bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#191C1F] flex items-center justify-center text-sm font-semibold"
                      title="Aspect ratio"
                    >
                      +
                    </button>

                    {/* Model Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        const models: typeof studioModel[] = ['Clipscut Shorts', 'Cinematic 4K', 'Fast Anime'];
                        const next = models[(models.indexOf(studioModel) + 1) % models.length];
                        setStudioModel(next);
                        showToast(`Switched model to ${next}`);
                      }}
                      className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#191C1F] text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                    >
                      <div className="w-3.5 h-3.5 rounded bg-[#191C1F] text-white flex items-center justify-center text-[9px] font-bold">
                        C
                      </div>
                      <span>{studioModel}</span>
                    </button>

                    {/* Resolution Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        const q: typeof studioQuality[] = ['480p', '720p', '1080p'];
                        const next = q[(q.indexOf(studioQuality) + 1) % q.length];
                        setStudioQuality(next);
                        showToast(`Render resolution set to ${next}`);
                      }}
                      className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#505A63] hover:text-[#191C1F] text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                    >
                      {studioQuality}
                    </button>

                    {/* Duration Pill */}
                    <button
                      type="button"
                      onClick={() => {
                        const d: typeof studioDuration[] = ['5s', '8s', '15s', '30s'];
                        const next = d[(d.indexOf(studioDuration) + 1) % d.length];
                        setStudioDuration(next);
                        showToast(`Short duration set to ${next}`);
                      }}
                      className="bg-[#f4f4f4] hover:bg-[#eaeaea] text-[#505A63] hover:text-[#191C1F] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1 transition-colors"
                    >
                      <Clock className="w-3 h-3" />
                      <span>{studioDuration}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span className="bg-rose-50 text-rose-600 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>8</span>
                    </span>

                    <button
                      type="button"
                      disabled={isStudioGenerating}
                      onClick={handleGenerateShort}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm active:scale-95 ${
                        isStudioGenerating
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-[#2A3FFB] hover:bg-[#2031db] text-white'
                      }`}
                      title="Generate Short"
                    >
                      {isStudioGenerating ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ArrowUp className="w-4 h-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </div>

                {isStudioGenerating && (
                  <div className="pt-2 border-t border-[#f4f4f4]">
                    <div className="flex justify-between text-xs text-[#505A63] mb-1">
                      <span>Synthesizing frames & audio...</span>
                      <span>{studioProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#f4f4f4] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2A3FFB] transition-all duration-300"
                        style={{ width: `${studioProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Warning Notice Banner */}
              <div className="w-full max-w-[760px] mt-3 bg-[#FFF5F5] border border-[#FFE0E0] rounded-[20px] p-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                  <div>
                    <span className="font-semibold text-xs text-[#191C1F] block">
                      Choose a plan to make videos
                    </span>
                    <span className="text-[11px] text-[#505A63]">
                      This video needs 8, you have {credits} left.
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsPricingModalOpen(true)}
                  className="bg-[#191C1F] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full transition-all shrink-0 active:scale-95"
                >
                  See plans
                </button>
              </div>
            </div>

            {/* TEMPLATES SECTION */}
            <div className="flex flex-col gap-4 pt-4 pb-12">
              <h2 className="text-2xl font-tight font-medium text-[#191C1F]">
                Templates
              </h2>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {[
                  'All',
                  'Found-footage story',
                  'Porch cam',
                  'Security cam',
                  'Chest cam',
                  'Phone video',
                  'Anime moment',
                  'Press test',
                  'Wild nature',
                  'Ambient scene',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setTemplateFilter(tag)}
                    className={`shrink-0 rounded-full text-xs font-semibold px-4 py-2 transition-all ${
                      templateFilter === tag
                        ? 'bg-[#191C1F] text-white'
                        : 'bg-[#F4F4F4] text-[#505A63] hover:text-[#191C1F]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* 6-Column Card Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-2">
                {STUDIO_TEMPLATES.filter((t) => templateFilter === 'All' || t.tag === templateFilter).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedTemplateTag(item.tag);
                      setStudioPrompt(item.prompt);
                      showToast(`Selected "${item.title}"`);
                      window.scrollTo({ top: 120, behavior: 'smooth' });
                    }}
                    className="relative rounded-[20px] overflow-hidden bg-[#16181A] aspect-[9/15] group cursor-pointer shadow-sm hover:ring-2 hover:ring-[#2A3FFB] transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                      <span className="text-[10px] text-white/80 font-medium leading-tight">
                        {item.tag}
                      </span>
                      <p className="font-semibold text-xs leading-tight truncate mt-0.5">
                        {item.title}
                      </p>
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                      <span className="bg-white text-[#191C1F] text-[10px] font-bold px-2.5 py-1.5 rounded-full shadow">
                        Make one like this
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. PAGE: CLIP DASHBOARD                                  */}
        {/* ======================================================== */}
        {currentPage === 'clip' && (
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 flex flex-col gap-10">
            {/* HERO BLACK CONTAINER WITH INTERACTIVE URL INPUT */}
            <section className="relative overflow-hidden rounded-[28px] border-[3px] border-white shadow-[0px_20px_40px_0px_rgba(0,0,0,0.35)] bg-black p-8 sm:p-12 lg:p-14 hero-radial-card text-white min-h-[380px] flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-[680px] flex flex-col justify-between z-10">
                <span className="text-xs text-white/60 font-semibold uppercase tracking-wider mb-2">
                  Now clip
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-medium tracking-[-2.4px] leading-[1.05] text-white mb-6 font-tight">
                  What are we clipping today?
                </h1>

                {/* Input Bar */}
                <div className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[24px] p-2 flex flex-col sm:flex-row items-center gap-2 mb-4">
                  <div className="flex-1 w-full flex items-center px-3 py-1.5">
                    <LinkIcon className="w-4 h-4 text-white/60 mr-2.5 shrink-0" />
                    <input
                      type="text"
                      value={clipUrl}
                      onChange={(e) => setClipUrl(e.target.value)}
                      placeholder="Paste a YouTube, Twitch or Kick link"
                      className="w-full bg-transparent text-sm text-white placeholder-white/60 focus:outline-none"
                    />
                  </div>

                  <input
                    type="file"
                    ref={clipFileInputRef}
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setClipUrl(e.target.files[0].name);
                        handleStartClipping(e.target.files[0].name);
                      }
                    }}
                  />

                  <button
                    type="button"
                    disabled={isClipping}
                    onClick={() => handleStartClipping()}
                    className="button-primary text-xs font-semibold px-5 py-2.5 shrink-0 bg-white text-[#191C1F] hover:bg-gray-100"
                  >
                    {isClipping ? 'Clipping...' : 'Get clips'}
                  </button>

                  <button
                    type="button"
                    onClick={() => clipFileInputRef.current?.click()}
                    className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all shrink-0 active:scale-95"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                  </button>
                </div>

                {isClipping && (
                  <div className="bg-white/10 rounded-2xl p-4 mb-3 border border-white/20">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{clipStep}</span>
                      <span>{clipProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2A3FFB] transition-all duration-300"
                        style={{ width: `${clipProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs text-white/60">
                  Works with YouTube, Twitch and Kick links, or upload an MP4, MOV, AVI or 3GP file. Up to 600 minutes, 10 GB and 4K.
                </p>
              </div>

              {/* Floating Phones Mockup */}
              <div className="relative w-full max-w-[340px] h-[260px] hidden sm:flex items-center justify-center shrink-0">
                <div
                  onClick={() => {
                    setActiveVideoModal({
                      isOpen: true,
                      videoSrc: '/videos/video-62.mp4',
                      title: 'Viral Pod Moment (Score 9.6)',
                    });
                  }}
                  className="absolute left-0 w-[110px] h-[190px] rounded-[20px] overflow-hidden border-2 border-white/80 shadow-2xl rotate-[-10deg] translate-y-3 z-10 bg-zinc-900 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img src="/images/image-1.jpg" alt="Preview 1" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#2A3FFB] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    9.6
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveVideoModal({
                      isOpen: true,
                      videoSrc: '/videos/video-63.mp4',
                      title: 'Top Rated Short (Score 9.1)',
                    });
                  }}
                  className="absolute w-[120px] h-[215px] rounded-[22px] overflow-hidden border-2 border-white shadow-2xl z-20 bg-zinc-900 ring-4 ring-[#2A3FFB]/30 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img src="/images/image-2.jpg" alt="Preview 2" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#2A3FFB] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    9.1
                  </span>
                </div>

                <div
                  onClick={() => {
                    setActiveVideoModal({
                      isOpen: true,
                      videoSrc: '/videos/video-64.mp4',
                      title: 'Reactions Short (Score 8.9)',
                    });
                  }}
                  className="absolute right-0 w-[110px] h-[190px] rounded-[20px] overflow-hidden border-2 border-white/80 shadow-2xl rotate-[10deg] translate-y-3 z-10 bg-zinc-900 cursor-pointer hover:scale-105 transition-transform"
                >
                  <img src="/images/image-3.jpg" alt="Preview 3" className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-[#2A3FFB] text-white text-[9px] font-black px-1.5 py-0.5 rounded-full">
                    8.9
                  </span>
                </div>
              </div>
            </section>

            {/* THREE STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div
                onClick={() => setIsPricingModalOpen(true)}
                className="card p-6 flex flex-col justify-between h-[150px] shadow-sm cursor-pointer hover:border-[#2A3FFB]/40 transition-colors"
              >
                <span className="text-xs font-semibold text-[#8D969E]">Credits left</span>
                <div>
                  <div className="text-4xl font-semibold text-[#191C1F]">{credits}</div>
                  <div className="text-xs text-[#2A3FFB] font-medium mt-1">
                    {credits === 0 ? '+ Add credits / view plans' : 'Active balance'}
                  </div>
                </div>
              </div>

              <div className="card p-6 flex flex-col justify-between h-[150px] shadow-sm">
                <span className="text-xs font-semibold text-[#8D969E]">Clips made this month</span>
                <div>
                  <div className="text-4xl font-semibold text-[#191C1F]">{clipsCount}</div>
                  <div className="text-xs text-[#8D969E] mt-1">
                    from {recentProjects.length} video(s) clipped
                  </div>
                </div>
              </div>

              {/* Trending Now Gradient Card */}
              <div className="rounded-[20px] p-5 flex flex-col justify-between h-[150px] bg-gradient-to-r from-[#2A3FFB] to-[#1E2DB8] text-white shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between z-10">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white/90">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Trending right now</span>
                  </div>
                  <img src="/images/image-1.jpg" alt="Trending" className="w-12 h-7 object-cover rounded-md border border-white/30" />
                </div>
                <div className="flex items-end justify-between z-10">
                  <div>
                    <div className="text-2xl font-bold tracking-tight">+780.5K views/hr</div>
                    <div className="text-xs text-white/80 mt-0.5">Samay Raina • 50m</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setClipUrl('https://youtube.com/watch?v=samay-raina-latent-ep9');
                      handleStartClipping('https://youtube.com/watch?v=samay-raina-latent-ep9');
                    }}
                    className="bg-white text-[#191C1F] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                  >
                    Clip it
                  </button>
                </div>
              </div>
            </div>

            {/* RECENT PROJECTS SECTION */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium tracking-tight text-[#191C1F] font-tight">
                  Recent projects
                </h2>
                {recentProjects.length > 0 && (
                  <span className="text-xs text-[#505A63]">
                    Showing {recentProjects.length} generated short(s)
                  </span>
                )}
              </div>

              {recentProjects.length === 0 ? (
                <div className="bg-[#F4F4F4] rounded-[24px] p-10 flex flex-col items-center justify-center text-center gap-2">
                  <h3 className="font-semibold text-base text-[#191C1F]">No projects yet</h3>
                  <p className="text-xs text-[#505A63]">
                    Paste a link above or click "Clip it" to generate your first viral cut.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {recentProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white border border-[#e2e2e7] rounded-[22px] p-3 flex flex-col justify-between gap-3 shadow-sm hover:shadow-md transition-all"
                    >
                      <div
                        onClick={() => {
                          setActiveVideoModal({
                            isOpen: true,
                            videoSrc: proj.videoSrc,
                            title: proj.title,
                            subtitle: `Score: ${proj.score}/10 · ${proj.duration}`,
                          });
                        }}
                        className="relative aspect-[9/14] rounded-[16px] overflow-hidden bg-zinc-900 group cursor-pointer"
                      >
                        <img src={proj.thumbnail} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        <span className="absolute top-2 left-2 bg-[#2A3FFB] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                          ★ {proj.score}
                        </span>
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Play className="w-8 h-8 text-white fill-current" />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-xs sm:text-sm text-[#191C1F] line-clamp-1">
                          {proj.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-[#8D969E] mt-1">
                          <span>{proj.duration}</span>
                          <span>{proj.createdAt}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-[#f4f4f4]">
                        <a
                          href={proj.videoSrc}
                          download="clipscut.mp4"
                          className="flex-1 bg-[#F4F4F4] hover:bg-[#eaeaea] text-[#191C1F] text-xs font-semibold py-1.5 rounded-full flex items-center justify-center gap-1 transition-colors"
                        >
                          <Download className="w-3 h-3" />
                          <span>Save</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('https://clipscut.ai/watch/' + proj.id, 'Clip link copied!')}
                          className="w-7 h-7 rounded-full bg-[#F4F4F4] hover:bg-[#eaeaea] text-[#191C1F] flex items-center justify-center transition-colors"
                          title="Share clip"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CLAUDE & CHATGPT MCP BANNER */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-[#191C1F] font-tight">
                    Clip right inside Claude and ChatGPT
                  </h2>
                  <p className="text-xs text-[#505A63] mt-0.5">
                    Connect Clipscut once, then paste a link in the chat.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('claude')}
                  className="bg-[#F4F4F4] hover:bg-[#e8e8ed] text-xs font-semibold text-[#191C1F] px-4 py-2 rounded-full transition-colors"
                >
                  Set up Clipscut MCP
                </button>
              </div>

              {/* Chat Interface Preview */}
              <div className="bg-[#F4F4F4] rounded-[24px] p-6 lg:p-8 flex flex-col gap-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {['Stream clips', 'Podcasts', 'Captions', 'AI videos', 'Kids cartoons'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveMcpTab(tab)}
                      className={`text-xs font-semibold px-4 py-1.5 rounded-full transition-all ${
                        activeMcpTab === tab
                          ? 'bg-[#191C1F] text-white'
                          : 'bg-white text-[#505A63] hover:text-[#191C1F]'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                  <div className="lg:col-span-2 bg-white rounded-[20px] p-6 border border-[#e2e2e7] flex flex-col gap-4 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-[#8D969E] border-b border-[#f4f4f4] pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#d97757]" />
                        <span className="font-semibold text-[#191C1F]">Claude 3.7 Sonnet</span>
                      </div>
                      <span>Connected to Clipscut</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="self-end bg-[#F4F4F4] text-[#191C1F] text-xs sm:text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%]">
                        {activeMcpTab === 'Stream clips' && 'Clip every time chat gets a reaction out of him in this Twitch VOD.'}
                        {activeMcpTab === 'Podcasts' && 'Clip the best moments from this podcast episode, frame each speaker for vertical and add captions.'}
                        {activeMcpTab === 'Captions' && 'Restyle captions with bold kinetic colors, drop shadows and bounce animations.'}
                        {activeMcpTab === 'AI videos' && 'Generate a 10s cinematic cyberpunk street scene short from text.'}
                        {activeMcpTab === 'Kids cartoons' && 'Create a colorful 3D baby hippo cartoon clip with upbeat sound effects.'}
                      </div>

                      <div className="self-start bg-[#EEF2FF] border border-[#2A3FFB]/20 text-[#191C1F] text-xs sm:text-sm p-4 rounded-2xl rounded-tl-sm flex flex-col gap-2 max-w-[90%]">
                        <div className="flex items-center gap-2 text-[#2A3FFB] font-semibold text-xs">
                          <Scissors className="w-3.5 h-3.5" />
                          <span>Clipscut MCP Agent</span>
                        </div>
                        <p className="text-xs text-[#505A63]">
                          Found the clips! Graded 9/10 • Auto-Speaker tracking • Captioned and ready to post.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setActiveVideoModal({
                        isOpen: true,
                        videoSrc: '/videos/video-63.mp4',
                        title: 'Clipscut Result Preview',
                      });
                    }}
                    className="relative rounded-[20px] overflow-hidden bg-zinc-900 aspect-[9/14] max-w-[240px] mx-auto shadow-xl border-2 border-white cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img src="/images/image-1.jpg" alt="Result demo" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Play className="w-8 h-8 text-white fill-current" />
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end text-white">
                      <span className="text-[10px] text-white/70">Result</span>
                      <span className="text-xs font-bold leading-tight">Click to watch short</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* EXPLORE SECTION PREVIEW */}
            <div className="flex flex-col gap-4 pb-12">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-medium tracking-tight text-[#191C1F] font-tight">
                    Explore
                  </h2>
                  <p className="text-xs text-[#505A63] mt-0.5">
                    Trending videos ready to clip, updated hourly
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('explore')}
                  className="bg-[#F4F4F4] hover:bg-[#e8e8ed] text-xs font-semibold text-[#191C1F] px-4 py-2 rounded-full transition-colors"
                >
                  Show more
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {EXPLORE_VIDEOS.slice(0, 6).map((video) => (
                  <div
                    key={video.id}
                    className="flex flex-col gap-2.5 group cursor-pointer"
                    onClick={() => {
                      setClipUrl(`https://youtube.com/watch?v=sample-${video.id}`);
                      handleStartClipping(`https://youtube.com/watch?v=sample-${video.id}`);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="relative aspect-video rounded-[18px] overflow-hidden bg-zinc-900 shadow-sm">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#191C1F] line-clamp-2 leading-snug group-hover:text-[#2A3FFB] transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-[#505A63] mt-1">{video.channel}</p>
                      <div className="flex items-center gap-2 text-[11px] text-[#8D969E] mt-0.5">
                        <span>{video.views}</span>
                        <span>•</span>
                        <span>{video.timeAgo}</span>
                        <span>•</span>
                        <span className="text-[#00A87E] font-semibold">{video.viewsPerHour}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 4. PAGE: EXPLORE PAGE                                    */}
        {/* ======================================================== */}
        {currentPage === 'explore' && (
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 flex flex-col gap-8 pb-16">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h1 className="text-6xl sm:text-7xl lg:text-[88px] font-medium tracking-[-3.2px] leading-[84.48px] text-[#191c1f] font-tight">
                    Explore
                  </h1>
                  <p className="text-sm text-[#505A63] mt-1">
                    Trending videos ready to clip, updated hourly
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRefreshExplore}
                  className="bg-[#F4F4F4] hover:bg-[#e8e8ed] text-xs font-semibold text-[#191C1F] px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-colors self-start sm:self-auto active:scale-95"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${isRefreshingFeed ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
                {[
                  'All',
                  'Podcasts',
                  'Interview',
                  'Business',
                  'Comedy',
                  'True crime',
                  'News',
                  'Education',
                  'Sports',
                  'Gaming',
                  'Fitness',
                  'Tech',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setExploreCategory(cat)}
                    className={`shrink-0 rounded-full text-xs font-semibold px-4 py-2 transition-all ${
                      exploreCategory === cat
                        ? 'bg-[#191C1F] text-white'
                        : 'bg-[#F4F4F4] text-[#505A63] hover:text-[#191C1F]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {exploreList
                .filter((v) => exploreCategory === 'All' || v.category === exploreCategory)
                .map((video) => (
                  <div key={video.id} className="flex flex-col gap-3 group bg-white">
                    <div
                      onClick={() => {
                        setActiveVideoModal({
                          isOpen: true,
                          videoSrc: video.videoSrc || '/videos/video-62.mp4',
                          title: video.title,
                          subtitle: `${video.channel} • ${video.views}`,
                        });
                      }}
                      className="relative aspect-video rounded-[20px] overflow-hidden bg-zinc-900 shadow-sm cursor-pointer"
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-2.5 right-2.5 bg-black/80 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                        {video.duration}
                      </span>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setClipUrl(`https://youtube.com/watch?v=sample-${video.id}`);
                            navigateTo('clip');
                            handleStartClipping(`https://youtube.com/watch?v=sample-${video.id}`);
                          }}
                          className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-bold px-4 py-2 rounded-full shadow flex items-center gap-1.5 active:scale-95 transition-all"
                        >
                          <Scissors className="w-3.5 h-3.5" />
                          <span>Get clips</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3
                        onClick={() => {
                          setActiveVideoModal({
                            isOpen: true,
                            videoSrc: video.videoSrc || '/videos/video-62.mp4',
                            title: video.title,
                            subtitle: `${video.channel} • ${video.views}`,
                          });
                        }}
                        className="font-semibold text-[15px] text-[#191C1F] line-clamp-2 leading-snug group-hover:text-[#2A3FFB] transition-colors cursor-pointer"
                      >
                        {video.title}
                      </h3>
                      <p className="text-xs text-[#505A63] mt-1">{video.channel}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#8D969E] mt-1">
                        <span>{video.views}</span>
                        <span>•</span>
                        <span>{video.timeAgo}</span>
                        <span>•</span>
                        <span className="text-[#00A87E] font-semibold">{video.viewsPerHour}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="button"
                onClick={() => {
                  setExploreList((prev) => [
                    ...prev,
                    ...EXPLORE_VIDEOS.map((v) => ({ ...v, id: v.id + 100 })),
                  ]);
                  showToast('Loaded more trending videos!');
                }}
                className="bg-[#F4F4F4] hover:bg-[#e8e8ed] text-xs font-semibold text-[#191C1F] px-8 py-3 rounded-full transition-colors active:scale-95"
              >
                Show more
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 5. PAGE: PROMPT LIBRARY                                  */}
        {/* ======================================================== */}
        {currentPage === 'prompt-library' && (
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-10 flex flex-col gap-7">
            <div>
              <button
                type="button"
                onClick={() => navigateTo('studio')}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#505A63] hover:text-[#191C1F] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Studio</span>
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-5xl sm:text-6xl lg:text-[72px] font-medium tracking-[-2.8px] leading-[1.04] text-[#191c1f] font-tight">
                Prompt library
              </h1>
              <p className="max-w-[850px] text-sm sm:text-[15px] leading-relaxed text-[#505A63]">
                Videos made in Studio, each with the exact idea behind it. Pick one to make your own version: the style and idea are filled in, and you see the price before anything is charged.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {PROMPT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setPromptCategory(cat)}
                  className={`shrink-0 rounded-full text-xs font-semibold px-4 py-2 transition-all ${
                    promptCategory === cat
                      ? 'bg-[#191C1F] text-white'
                      : 'bg-[#F4F4F4] text-[#505A63] hover:text-[#191C1F]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Prompt Cards 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full pb-16">
              {PROMPT_CARDS.filter(
                (card) => promptCategory === 'All' || card.category === promptCategory
              ).map((card) => (
                <div
                  key={card.id}
                  className="bg-[#F4F4F4] rounded-[22px] p-3.5 flex gap-3.5 items-stretch transition-all hover:bg-[#ededed] group"
                >
                  <div
                    onClick={() => {
                      setActiveVideoModal({
                        isOpen: true,
                        videoSrc: `/videos/video-${(card.id % 10) + 62}.mp4`,
                        title: card.title,
                        subtitle: `${card.tag} · ${card.duration}`,
                      });
                    }}
                    className="w-[115px] sm:w-[125px] shrink-0 rounded-[16px] overflow-hidden bg-[#16181A] relative aspect-[9/16] shadow-sm cursor-pointer group/thumb"
                  >
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center transition-opacity">
                      <Play className="w-6 h-6 text-white fill-current" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                    <div>
                      <div className="text-[11px] font-semibold text-[#2A3FFB] tracking-tight mb-1">
                        {card.tag} · {card.duration}
                      </div>
                      <h3 className="font-semibold text-[15px] text-[#191C1F] leading-snug mb-1.5">
                        {card.title}
                      </h3>
                      <p className="text-[12px] text-[#505A63] leading-[18px] line-clamp-4">
                        {card.prompt}
                      </p>
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setMakingId(card.id);
                          setStudioPrompt(card.prompt);
                          setSelectedTemplateTag(card.tag);
                          setTimeout(() => {
                            setMakingId(null);
                            navigateTo('studio');
                            showToast(`Loaded "${card.title}" into Studio!`);
                          }, 300);
                        }}
                        className="bg-[#191C1F] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                      >
                        {makingId === card.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#00A87E]" />
                            <span>Loading...</span>
                          </>
                        ) : (
                          <span>Make this</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 6. PAGE: USE IN CLAUDE                                   */}
        {/* ======================================================== */}
        {currentPage === 'claude' && (
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-10">
            {/* Blue Hero Card */}
            <div className="relative rounded-[28px] bg-[#2A3FFB] text-white p-10 sm:p-14 text-center overflow-hidden shadow-lg flex flex-col items-center justify-center">
              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full mb-6 shadow-sm">
                <span className="text-[#d97757] font-bold text-lg leading-none">✱</span>
                <div className="w-6 h-6 rounded-md bg-[#191C1F] flex items-center justify-center text-white text-xs font-bold">
                  <Scissors className="w-3.5 h-3.5 text-[#2a3ffb]" />
                </div>
                <Bot className="w-4 h-4 text-[#191C1F]" />
              </div>

              <h1 className="text-3xl sm:text-5xl font-tight font-medium text-white tracking-tight mb-8">
                Clipscut MCP for {mcpPlatform}
              </h1>

              <div className="inline-flex p-1 bg-white/15 backdrop-blur-md rounded-full border border-white/20 gap-1 flex-wrap justify-center">
                {(['Claude', 'ChatGPT', 'Claude Code & Cursor'] as const).map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => {
                      setMcpPlatform(platform);
                      showToast(`Switched configuration to ${platform}`);
                    }}
                    className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      mcpPlatform === platform
                        ? 'bg-white text-[#191C1F] shadow-sm'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {platform === 'Claude' && <span className="mr-1">✦</span>}
                    {platform}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Step Instruction Cards */}
            <div className="bg-white border border-[#e2e2e7] rounded-[24px] p-6 sm:p-10 shadow-sm flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-6 border-b border-[#f4f4f4]">
                <div className="flex flex-col justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-[#8D969E] mb-2">1</div>
                    <h3 className="font-semibold text-base text-[#191C1F] mb-1.5">
                      {mcpPlatform === 'Claude Code & Cursor' ? 'Copy CLI command' : 'Copy connector URL'}
                    </h3>
                    <p className="text-xs text-[#505A63] leading-relaxed mb-4">
                      Clipscut works natively in Claude, Cursor, and automated chat workflows.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(getMcpSnippet(), 'MCP Connector copied!')}
                    className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
                  >
                    {copiedMcp ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMcp ? 'Copied' : 'Copy URL'}</span>
                  </button>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-[#8D969E] mb-2">2</div>
                    <h3 className="font-semibold text-base text-[#191C1F] mb-1.5">
                      Connect in {mcpPlatform}
                    </h3>
                    <p className="text-xs text-[#505A63] leading-relaxed mb-4">
                      <strong>Customize → Connectors → Add</strong>. Name it Clipscut, paste URL, then click Connect.
                    </p>
                  </div>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white hover:bg-[#f4f4f4] text-[#191C1F] border border-[#e2e2e7] text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>Open {mcpPlatform.split(' ')[0]}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8D969E]" />
                  </a>
                </div>

                <div className="flex flex-col justify-between items-start">
                  <div>
                    <div className="text-xs font-bold text-[#8D969E] mb-2">3</div>
                    <h3 className="font-semibold text-base text-[#191C1F] mb-1.5">
                      Ask for a video
                    </h3>
                    <p className="text-xs text-[#505A63] leading-relaxed mb-4">
                      Paste any video link in chat and ask for viral shorts. They render inline!
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigateTo('clip');
                      showToast('Try pasting a link here to test clipping!');
                    }}
                    className="bg-white hover:bg-[#f4f4f4] text-[#191C1F] border border-[#e2e2e7] text-xs font-semibold px-4 py-2 rounded-full inline-flex items-center gap-1.5 transition-all"
                  >
                    <span>Test in Clipscut</span>
                    <Scissors className="w-3.5 h-3.5 text-[#2A3FFB]" />
                  </button>
                </div>
              </div>

              {/* URL Display Box */}
              <div className="bg-[#fcfcfc] rounded-2xl border border-[#e2e2e7] p-5 flex flex-col gap-2">
                <span className="text-xs font-semibold text-[#191C1F]">
                  {mcpPlatform === 'Claude Code & Cursor'
                    ? 'Terminal CLI command'
                    : 'Connector URL for manual entry'}
                </span>

                <div className="flex items-center bg-white border border-[#e2e2e7] rounded-xl px-4 py-2 justify-between gap-3">
                  <span className="font-mono text-xs sm:text-sm text-[#191C1F] truncate select-all">
                    {getMcpSnippet()}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(getMcpSnippet(), 'Copied snippet!')}
                    className="bg-[#191C1F] hover:bg-black text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shrink-0 transition-all shadow-sm active:scale-95"
                  >
                    {copiedMcp ? <Check className="w-3.5 h-3.5 text-[#00A87E]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedMcp ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Plan notice strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#F4F4F4] rounded-[20px]">
              <p className="text-xs sm:text-sm text-[#505A63]">
                You sign in with your Clipscut account when you connect. Making clips uses your credits balance ({credits} credits currently available).
              </p>
              <button
                type="button"
                onClick={() => setIsPricingModalOpen(true)}
                className="bg-[#191C1F] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all shrink-0 active:scale-95"
              >
                Pick a plan
              </button>
            </div>

            {/* What you can make section */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-[#191C1F]">What you can make</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROMPT_CARDS.slice(0, 6).map((card) => (
                  <div key={card.id} className="bg-[#F4F4F4] rounded-[22px] p-4 flex flex-col justify-between gap-3">
                    <div
                      onClick={() => {
                        setActiveVideoModal({
                          isOpen: true,
                          videoSrc: `/videos/video-${(card.id % 10) + 62}.mp4`,
                          title: card.title,
                          subtitle: card.tag,
                        });
                      }}
                      className="relative aspect-[16/10] rounded-[16px] overflow-hidden bg-zinc-900 cursor-pointer group"
                    >
                      <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Play className="w-6 h-6 text-white fill-current" />
                      </div>
                      <span className="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                        {card.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sm text-[#191C1F]">{card.title}</h3>
                      <p className="text-xs text-[#505A63] line-clamp-2 mt-1">{card.prompt}</p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => copyToClipboard(card.prompt, 'Prompt copied!')}
                        className="bg-white hover:bg-gray-100 text-[#191C1F] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#e2e2e7] transition-colors"
                      >
                        Copy prompt
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setStudioPrompt(card.prompt);
                          setSelectedTemplateTag(card.tag);
                          navigateTo('studio');
                          showToast('Loaded into Studio!');
                        }}
                        className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors active:scale-95"
                      >
                        Create in Studio
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* 7. PAGE: CAPTION REMOVER                                 */}
        {/* ======================================================== */}
        {currentPage === 'caption-remover' && (
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-8 flex flex-col gap-10">
            {/* Header / Action Row */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#2A3FFB] hover:bg-[#2031db] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Remove captions</span>
              </button>

              <div className="flex items-center gap-2 text-sm font-semibold text-[#191C1F]">
                <span>Caption Remover</span>
                <span className="bg-[#EEF2FF] text-[#2A3FFB] text-[11px] font-semibold px-2 py-0.5 rounded-full">
                  Beta
                </span>
              </div>
            </div>

            {/* Central Box / Dropzone */}
            <div className="flex flex-col items-center justify-center pt-8 pb-16">
              <h1 className="text-3xl sm:text-4xl md:text-[44px] font-medium tracking-tight text-[#191C1F] mb-8 text-center font-tight">
                Remove captions from a video
              </h1>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                    setUploadedFile(e.dataTransfer.files[0].name);
                    startCaptionRemovalProcess();
                  }
                }}
                className="w-full max-w-[740px] border-2 border-dashed border-[#d4d4d8] hover:border-[#2A3FFB]/60 rounded-[28px] p-8 sm:p-14 text-center bg-white flex flex-col items-center justify-center gap-4 transition-all shadow-sm"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleCaptionFileUpload}
                  accept="video/mp4,video/quicktime,video/webm"
                  className="hidden"
                />

                {isRemovingCaptions ? (
                  <div className="py-6 flex flex-col items-center gap-4 w-full max-w-sm">
                    <div className="w-12 h-12 rounded-full border-3 border-[#2A3FFB] border-t-transparent animate-spin" />
                    <div className="w-full">
                      <p className="font-semibold text-base text-[#191C1F]">
                        {captionStage}
                      </p>
                      <div className="w-full bg-[#f4f4f4] rounded-full h-2 mt-3 overflow-hidden">
                        <div
                          className="bg-[#2A3FFB] h-full transition-all duration-300"
                          style={{ width: `${captionProgress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[#8D969E] mt-2 block">
                        Processing {uploadedFile || 'sample video'} ({captionProgress}%)
                      </span>
                    </div>
                  </div>
                ) : isCaptionDone ? (
                  <div className="py-4 flex flex-col items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-[#00A87E]/10 text-[#00A87E] flex items-center justify-center">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <p className="font-semibold text-base text-[#191C1F]">
                        Captions successfully removed!
                      </p>
                      <p className="text-xs text-[#505A63] mt-1">{uploadedFile || 'video-clean.mp4'}</p>
                    </div>

                    {/* Clean Video Preview */}
                    <div className="w-full max-w-[320px] aspect-[9/14] rounded-2xl overflow-hidden bg-black shadow-lg my-2">
                      <video
                        src="/videos/video-5.mp4"
                        controls
                        autoPlay
                        loop
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <a
                        href="/videos/video-5.mp4"
                        download="clean-video-clipscut.mp4"
                        className="bg-[#2A3FFB] hover:bg-[#2031db] text-white font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 shadow-sm active:scale-95"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Clean Cut</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCaptionDone(false);
                          setUploadedFile(null);
                        }}
                        className="bg-[#F4F4F4] hover:bg-[#eaeaea] text-[#191C1F] font-semibold text-xs px-4 py-2.5 rounded-full transition-colors"
                      >
                        Remove Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl bg-[#F4F4F4] flex items-center justify-center text-[#191C1F] mb-1">
                      <Clapperboard className="w-6 h-6 stroke-[1.75]" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#191C1F]">
                        Drop a video, or browse
                      </p>
                      <p className="text-sm text-[#505A63] leading-relaxed max-w-[340px] mt-1">
                        We remove the burned-in captions and give you a clean cut.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 my-1">
                      <span className="bg-[#F4F4F4] text-[#505A63] text-xs font-medium px-3 py-1 rounded-full">
                        MP4, MOV or WebM
                      </span>
                      <span className="bg-[#F4F4F4] text-[#505A63] text-xs font-medium px-3 py-1 rounded-full">
                        Up to 60 seconds
                      </span>
                      <span className="bg-[#F4F4F4] text-[#505A63] text-xs font-medium px-3 py-1 rounded-full">
                        Up to 30 MB
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-[#F4F4F4] hover:bg-[#e8e8ed] text-[#191C1F] font-semibold text-sm px-6 py-2.5 rounded-full flex items-center gap-2 transition-all active:scale-95 my-1"
                    >
                      <Upload className="w-4 h-4 stroke-[2]" />
                      <span>Choose video</span>
                    </button>

                    <p className="text-xs text-[#8D969E]">
                      Only use videos you own or have permission to edit.
                    </p>
                  </>
                )}
              </div>

              {/* How it works toggle */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => setShowHowItWorks(!showHowItWorks)}
                  className="inline-flex items-center gap-2 text-xs font-medium text-[#505A63] hover:text-[#191C1F] transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-[#8D969E]" />
                  <span>How it works</span>
                </button>
              </div>

              {showHowItWorks && (
                <div className="mt-6 w-full max-w-[740px] bg-[#F4F4F4] rounded-[20px] p-6 text-xs text-[#505A63] grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="font-bold text-[#191C1F] block mb-1">1. Detection</span>
                    Our vision model detects bounding boxes of text and burned-in subtitle frames.
                  </div>
                  <div>
                    <span className="font-bold text-[#191C1F] block mb-1">2. Inpainting</span>
                    AI temporal inpainting reconstructs the covered pixels using adjacent video frames.
                  </div>
                  <div>
                    <span className="font-bold text-[#191C1F] block mb-1">3. Clean Cut</span>
                    Export a high-definition, caption-free MP4 ready for fresh branding and fonts.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
