export interface Building {
  id: string;
  name: string;
  type: 'school' | 'laboratory' | 'arena' | 'library' | 'tower';
  icon: string;
  description: string;
  lessonId?: string;
  isLocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  coinReward: number;
}

export interface City {
  id: string;
  name: string;
  description: string;
  icon: string;
  buildings: Building[];
  isLocked: boolean;
  isCompleted: boolean;
  position: { x: number; y: number };
}

export interface State {
  id: string;
  name: string;
  description: string;
  icon: string;
  cities: City[];
  isLocked: boolean;
  isCompleted: boolean;
  position: { x: number; y: number };
  color: string;
}

export interface Country {
  id: string;
  name: string;
  description: string;
  icon: string;
  states: State[];
  isLocked: boolean;
  isCompleted: boolean;
  position: { x: number; y: number };
  color: string;
  terrain: string;
}

export interface Continent {
  id: string;
  name: string;
  subject: string;
  description: string;
  icon: string;
  imagePath?: string;
  countries: Country[];
  color: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  terrain: string;
  globePosition: { lat: number; lng: number };
  isLocked: boolean;
}

const algebraCountry: Country = {
  id: 'algebra',
  name: 'Algebra Country',
  description: 'Master the language of mathematics through equations, functions, and abstract thinking.',
  icon: '🔤',
  terrain: 'rolling-hills',
  color: '#6366f1',
  position: { x: 25, y: 30 },
  isLocked: false,
  isCompleted: false,
  states: [
    {
      id: 'equations',
      name: 'Equations State',
      description: 'Learn to solve linear, quadratic, and systems of equations.',
      icon: '⚖️',
      color: '#818cf8',
      position: { x: 20, y: 25 },
      isLocked: false,
      isCompleted: false,
      cities: [
        {
          id: 'intro-equations',
          name: 'Introduction City',
          description: 'Your first steps into the world of equations.',
          icon: '🏘️',
          position: { x: 15, y: 20 },
          isLocked: false,
          isCompleted: true,
          buildings: [
            { id: 'eq-school-1', name: 'What is an Equation?', type: 'school', icon: '🏫', description: 'Learn the basics of mathematical equations.', lessonId: 'intro-equations-lesson', isLocked: false, isCompleted: true, xpReward: 50, coinReward: 10 },
            { id: 'eq-lab-1', name: 'Balance Lab', type: 'laboratory', icon: '🧪', description: 'Interactive balance simulation.', lessonId: 'balance-lab', isLocked: false, isCompleted: true, xpReward: 75, coinReward: 15 },
            { id: 'eq-arena-1', name: 'Equation Arena', type: 'arena', icon: '🎯', description: 'Test your equation skills!', lessonId: 'eq-quiz-1', isLocked: false, isCompleted: false, xpReward: 100, coinReward: 25 },
            { id: 'eq-library-1', name: 'Reference Library', type: 'library', icon: '📚', description: 'Review equation concepts.', isLocked: false, isCompleted: false, xpReward: 25, coinReward: 5 },
          ],
        },
        {
          id: 'linear-equations',
          name: 'Linear Equations City',
          description: 'Master solving equations with one variable.',
          icon: '📐',
          position: { x: 35, y: 30 },
          isLocked: false,
          isCompleted: false,
          buildings: [
            { id: 'lin-school-1', name: 'Solving for X', type: 'school', icon: '🏫', description: 'Learn to isolate variables.', lessonId: 'linear-basics', isLocked: false, isCompleted: false, xpReward: 50, coinReward: 10 },
            { id: 'lin-lab-1', name: 'Number Line Lab', type: 'laboratory', icon: '🧪', description: 'Visualize solutions on a number line.', isLocked: false, isCompleted: false, xpReward: 75, coinReward: 15 },
            { id: 'lin-arena-1', name: 'Speed Challenge', type: 'arena', icon: '🎯', description: 'Solve equations against the clock!', isLocked: true, isCompleted: false, xpReward: 100, coinReward: 25 },
            { id: 'lin-tower-1', name: 'Linear Tower', type: 'tower', icon: '🏆', description: 'Final assessment for linear equations.', isLocked: true, isCompleted: false, xpReward: 200, coinReward: 50 },
          ],
        },
        {
          id: 'quadratic-equations',
          name: 'Quadratic City',
          description: 'Explore the world of parabolas and quadratic solutions.',
          icon: '🎢',
          position: { x: 55, y: 20 },
          isLocked: true,
          isCompleted: false,
          buildings: [
            { id: 'quad-school-1', name: 'The Quadratic Formula', type: 'school', icon: '🏫', description: 'Unlock the famous formula.', lessonId: 'quadratic-formula', isLocked: true, isCompleted: false, xpReward: 75, coinReward: 15 },
            { id: 'quad-lab-1', name: 'Parabola Lab', type: 'laboratory', icon: '🧪', description: 'Interactive parabola graphing.', isLocked: true, isCompleted: false, xpReward: 100, coinReward: 20 },
            { id: 'quad-arena-1', name: 'Quadratic Arena', type: 'arena', icon: '🎯', description: 'Challenge yourself!', isLocked: true, isCompleted: false, xpReward: 125, coinReward: 30 },
            { id: 'quad-tower-1', name: 'Quadratic Tower', type: 'tower', icon: '🏆', description: 'Final quadratic assessment.', isLocked: true, isCompleted: false, xpReward: 250, coinReward: 60 },
          ],
        },
      ],
    },
    {
      id: 'functions',
      name: 'Functions State',
      description: 'Understand how inputs transform into outputs.',
      icon: 'ƒ',
      color: '#a78bfa',
      position: { x: 50, y: 45 },
      isLocked: false,
      isCompleted: false,
      cities: [
        {
          id: 'intro-functions',
          name: 'Introduction City',
          description: 'What are functions and why do they matter?',
          icon: '🌱',
          position: { x: 30, y: 40 },
          isLocked: false,
          isCompleted: false,
          buildings: [
            { id: 'fn-school-1', name: 'Function Basics', type: 'school', icon: '🏫', description: 'Learn what functions are.', lessonId: 'function-basics', isLocked: false, isCompleted: false, xpReward: 50, coinReward: 10 },
            { id: 'fn-lab-1', name: 'Function Machine', type: 'laboratory', icon: '🧪', description: 'Build your own function machine!', isLocked: false, isCompleted: false, xpReward: 75, coinReward: 15 },
            { id: 'fn-arena-1', name: 'Input-Output Arena', type: 'arena', icon: '🎯', description: 'Match inputs to outputs.', isLocked: true, isCompleted: false, xpReward: 100, coinReward: 25 },
          ],
        },
        {
          id: 'linear-functions',
          name: 'Linear Functions City',
          description: 'Straight lines and constant rates of change.',
          icon: '📈',
          position: { x: 55, y: 50 },
          isLocked: false,
          isCompleted: false,
          buildings: [
            { id: 'lf-school-1', name: 'Slope & Intercept', type: 'school', icon: '🏫', description: 'Master y = mx + b.', lessonId: 'linear-functions-lesson', isLocked: false, isCompleted: false, xpReward: 50, coinReward: 10 },
            { id: 'lf-lab-1', name: 'Graph Lab', type: 'laboratory', icon: '🧪', description: 'Interactive graphing simulator.', isLocked: false, isCompleted: false, xpReward: 75, coinReward: 15 },
            { id: 'lf-tower-1', name: 'Linear Tower', type: 'tower', icon: '🏆', description: 'Prove your linear mastery.', isLocked: true, isCompleted: false, xpReward: 200, coinReward: 50 },
          ],
        },
        {
          id: 'quadratic-functions',
          name: 'Quadratic Functions City',
          description: 'Curves, vertices, and the power of x².',
          icon: '🎆',
          position: { x: 75, y: 40 },
          isLocked: true,
          isCompleted: false,
          buildings: [
            { id: 'qf-school-1', name: 'Parabola Basics', type: 'school', icon: '🏫', description: 'Understanding quadratic curves.', isLocked: true, isCompleted: false, xpReward: 75, coinReward: 15 },
            { id: 'qf-lab-1', name: 'Vertex Explorer', type: 'laboratory', icon: '🧪', description: 'Find vertices interactively.', isLocked: true, isCompleted: false, xpReward: 100, coinReward: 20 },
          ],
        },
        {
          id: 'exponential-functions',
          name: 'Exponential City',
          description: 'Growth, decay, and the power of exponents.',
          icon: '🚀',
          position: { x: 80, y: 60 },
          isLocked: true,
          isCompleted: false,
          buildings: [
            { id: 'ef-school-1', name: 'Exponential Growth', type: 'school', icon: '🏫', description: 'Learn about rapid growth patterns.', isLocked: true, isCompleted: false, xpReward: 75, coinReward: 15 },
          ],
        },
      ],
    },
    {
      id: 'graphs',
      name: 'Graphs State',
      description: 'Visualize mathematics on the coordinate plane.',
      icon: '📊',
      color: '#c084fc',
      position: { x: 75, y: 25 },
      isLocked: true,
      isCompleted: false,
      cities: [
        {
          id: 'coordinate-plane',
          name: 'Coordinate City',
          description: 'Navigate the x-y plane.',
          icon: '🗺️',
          position: { x: 60, y: 20 },
          isLocked: true,
          isCompleted: false,
          buildings: [
            { id: 'cp-school-1', name: 'The Coordinate Plane', type: 'school', icon: '🏫', description: 'Points, axes, and quadrants.', isLocked: true, isCompleted: false, xpReward: 50, coinReward: 10 },
          ],
        },
      ],
    },
    {
      id: 'polynomials',
      name: 'Polynomials State',
      description: 'Higher-degree expressions and their secrets.',
      icon: '🧮',
      color: '#e879f9',
      position: { x: 40, y: 70 },
      isLocked: true,
      isCompleted: false,
      cities: [
        {
          id: 'poly-intro',
          name: 'Polynomial City',
          description: 'Introduction to polynomials.',
          icon: '🏙️',
          position: { x: 40, y: 65 },
          isLocked: true,
          isCompleted: false,
          buildings: [
            { id: 'poly-school-1', name: 'Polynomial Basics', type: 'school', icon: '🏫', description: 'Terms, degrees, and coefficients.', isLocked: true, isCompleted: false, xpReward: 50, coinReward: 10 },
          ],
        },
      ],
    },
  ],
};





export const continents: Continent[] = [
  {
    id: 'python',
    name: 'Python',
    subject: 'Data Science',
    description: 'The foundation of data science, AI, and backend scripting.',
    icon: '🐍',
    imagePath: '/assets/explore/python.png',
    countries: [algebraCountry], // Keep the mock country here so drill-down still works
    color: '#3b82f6',
    accentColor: '#60a5fa',
    gradientFrom: '#2563eb',
    gradientTo: '#3b82f6',
    terrain: 'data-streams',
    globePosition: { lat: 40, lng: -30 },
    isLocked: false,
  },
  {
    id: 'java',
    name: 'Java',
    subject: 'Backend Systems',
    description: 'Enterprise architecture, robust APIs, and object-oriented design.',
    icon: '☕',
    imagePath: '/assets/explore/java.png',
    countries: [],
    color: '#eab308',
    accentColor: '#fde047',
    gradientFrom: '#ca8a04',
    gradientTo: '#eab308',
    terrain: 'enterprise-towers',
    globePosition: { lat: 20, lng: 60 },
    isLocked: true,
  },
  {
    id: 'frontend',
    name: 'Frontend',
    subject: 'UI/UX Engineering',
    description: 'Craft beautiful, interactive experiences with React, HTML, and CSS.',
    icon: '✨',
    imagePath: '/assets/explore/frontend.png',
    countries: [],
    color: '#ec4899',
    accentColor: '#f472b6',
    gradientFrom: '#db2777',
    gradientTo: '#ec4899',
    terrain: 'glass-cities',
    globePosition: { lat: -20, lng: -40 },
    isLocked: true,
  },
  {
    id: 'database',
    name: 'Databases',
    subject: 'Data Storage',
    description: 'Master SQL, NoSQL, and data modeling to store the world\'s information.',
    icon: '🗄️',
    imagePath: '/assets/explore/database.png',
    countries: [],
    color: '#14b8a6',
    accentColor: '#2dd4bf',
    gradientFrom: '#0d9488',
    gradientTo: '#14b8a6',
    terrain: 'silicon-valleys',
    globePosition: { lat: -30, lng: 50 },
    isLocked: true,
  },
  {
    id: 'cloud',
    name: 'Cloud & DevOps',
    subject: 'Infrastructure',
    description: 'Scale applications globally using AWS, Docker, and Kubernetes.',
    icon: '☁️',
    imagePath: '/assets/explore/cloud.png',
    countries: [],
    color: '#8b5cf6',
    accentColor: '#a78bfa',
    gradientFrom: '#7c3aed',
    gradientTo: '#8b5cf6',
    terrain: 'floating-islands',
    globePosition: { lat: 45, lng: 130 },
    isLocked: true,
  },
  {
    id: 'security',
    name: 'Cybersecurity',
    subject: 'Security',
    description: 'Protect systems from threats, learn cryptography, and ethical hacking.',
    icon: '🛡️',
    imagePath: '/assets/explore/security.png',
    countries: [],
    color: '#ef4444',
    accentColor: '#f87171',
    gradientFrom: '#dc2626',
    gradientTo: '#ef4444',
    terrain: 'firewall-fortresses',
    globePosition: { lat: -10, lng: 140 },
    isLocked: true,
  },
];

// Helper to get continent by ID
export function getContinent(id: string): Continent | undefined {
  return continents.find(c => c.id === id);
}

// Helper to get country by ID within a continent
export function getCountry(continentId: string, countryId: string): Country | undefined {
  const continent = getContinent(continentId);
  return continent?.countries.find(c => c.id === countryId);
}

// Helper to get state by ID
export function getState(continentId: string, countryId: string, stateId: string): State | undefined {
  const country = getCountry(continentId, countryId);
  return country?.states.find(s => s.id === stateId);
}

// Helper to get city by ID
export function getCity(continentId: string, countryId: string, stateId: string, cityId: string): City | undefined {
  const state = getState(continentId, countryId, stateId);
  return state?.cities.find(c => c.id === cityId);
}
