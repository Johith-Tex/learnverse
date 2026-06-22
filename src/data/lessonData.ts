// ============================================================
// LearnVerse Lesson Data
// Visual-first lesson content with interactive steps
// ============================================================

export type LessonStepType = 'visual' | 'interactive' | 'quiz' | 'info';

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface LessonStep {
  id: string;
  type: LessonStepType;
  title: string;
  content: string;
  visualType?: 'diagram' | 'graph' | 'animation' | 'simulation';
  visualData?: Record<string, unknown>;
  quizOptions?: QuizOption[];
  hint?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedMinutes: number;
  xpReward: number;
  coinReward: number;
  steps: LessonStep[];
  mascotIntro: string;
  mascotOutro: string;
}

// ============================================================
// Sample Lesson: Linear Functions
// ============================================================

export const lessons: Record<string, Lesson> = {
  'figma-basics': {
    id: 'figma-basics',
    title: 'Figma Fundamentals: The Canvas of the Web',
    description: 'Learn the core tools, workspace, and concepts of Figma to design your first user interface.',
    subject: 'UI/UX Engineering',
    difficulty: 'beginner',
    estimatedMinutes: 15,
    xpReward: 150,
    coinReward: 50,
    mascotIntro: "Welcome to Figma! 🎨 This is where ideas become beautiful interfaces. Grab your digital paintbrush, and let's go!",
    mascotOutro: "Incredible! 🌟 You now know your way around Figma. Next stop: wireframing the future!",
    steps: [
      {
        id: 'figma-step-1',
        type: 'info',
        title: 'The Infinite Canvas',
        content: 'Figma gives you an infinite digital canvas. Instead of creating multiple files for different screens, you create "Frames" side-by-side. A Frame is like an artboard or a screen on a phone.',
      },
      {
        id: 'figma-step-2',
        type: 'info',
        title: 'Shapes & Layers',
        content: 'Every UI is just rectangles, circles, and text stacked on top of each other! In Figma, these are organized in the Layers panel on the left. The higher a layer is in the list, the closer it is to the viewer.',
      },
      {
        id: 'figma-step-3',
        type: 'quiz',
        title: 'Layer Check!',
        content: 'If you want a button text to appear ON TOP of the button background, where should the text layer be in the Layers panel?',
        quizOptions: [
          { id: 'a', text: 'Below the background layer', isCorrect: false },
          { id: 'b', text: 'Above the background layer', isCorrect: true },
          { id: 'c', text: 'Grouped outside the frame', isCorrect: false }
        ]
      },
      {
        id: 'figma-step-4',
        type: 'info',
        title: 'The Magic of Auto Layout',
        content: 'Auto Layout is Figma\'s superpower. Instead of manually dragging elements when text gets longer, Auto Layout makes buttons and lists resize and pack themselves automatically, just like real CSS Flexbox code!',
      },
      {
        id: 'figma-step-5',
        type: 'quiz',
        title: 'Flexing your Brain',
        content: 'Which Figma feature behaves like CSS Flexbox and automatically resizes elements based on their content?',
        quizOptions: [
          { id: 'a', text: 'Component Sets', isCorrect: false },
          { id: 'b', text: 'Auto Layout', isCorrect: true },
          { id: 'c', text: 'Boolean Groups', isCorrect: false }
        ],
        hint: 'It does exactly what it says: layouts things automatically!'
      }
    ]
  },
  'linear-functions-lesson': {
    id: 'linear-functions-lesson',
    title: 'Slope & Intercept: Understanding Linear Functions',
    description: 'Learn how straight lines are defined by slope (m) and y-intercept (b) in the equation y = mx + b.',
    subject: 'Mathematics',
    difficulty: 'beginner',
    estimatedMinutes: 12,
    xpReward: 100,
    coinReward: 25,
    mascotIntro: "Hey explorer! 🦊 Ready to learn about lines? They're everywhere — from mountain slopes to rocket trajectories! Let's dive in!",
    mascotOutro: "Amazing work! 🎉 You've mastered linear functions! Every straight line in the universe now makes sense to you. Onward!",
    steps: [
      {
        id: 'lf-step-1',
        type: 'visual',
        title: 'What is a Linear Function?',
        content: 'A linear function creates a STRAIGHT LINE when graphed. It has the form y = mx + b, where m is the slope and b is the y-intercept.',
        visualType: 'diagram',
        visualData: {
          type: 'linear-equation',
          equation: 'y = 2x + 1',
          highlights: ['slope', 'intercept'],
        },
      },
      {
        id: 'lf-step-2',
        type: 'visual',
        title: 'Understanding Slope (m)',
        content: 'Slope tells you how STEEP a line is and which direction it goes. A positive slope goes UP ↗️, a negative slope goes DOWN ↘️.',
        visualType: 'animation',
        visualData: {
          type: 'slope-comparison',
          slopes: [0.5, 1, 2, -1],
          labels: ['Gentle', 'Medium', 'Steep', 'Negative'],
        },
      },
      {
        id: 'lf-step-3',
        type: 'interactive',
        title: 'Rise Over Run',
        content: 'Slope = Rise ÷ Run. The "rise" is how much the line goes UP, and the "run" is how much it goes to the RIGHT.',
        visualType: 'simulation',
        visualData: {
          type: 'rise-run-interactive',
          defaultRise: 2,
          defaultRun: 1,
        },
        hint: 'Try different rise and run values to see how the slope changes!',
      },
      {
        id: 'lf-step-4',
        type: 'quiz',
        title: 'Quick Check!',
        content: 'A line goes UP 3 units for every 1 unit to the RIGHT. What is the slope?',
        quizOptions: [
          { id: 'a', text: 'm = 1/3', isCorrect: false },
          { id: 'b', text: 'm = 3', isCorrect: true },
          { id: 'c', text: 'm = -3', isCorrect: false },
          { id: 'd', text: 'm = 0', isCorrect: false },
        ],
        hint: 'Remember: Slope = Rise ÷ Run',
      },
      {
        id: 'lf-step-5',
        type: 'visual',
        title: 'The Y-Intercept (b)',
        content: 'The y-intercept is WHERE the line crosses the y-axis. In y = mx + b, "b" is this crossing point.',
        visualType: 'diagram',
        visualData: {
          type: 'y-intercept',
          equations: ['y = 2x + 1', 'y = 2x + 3', 'y = 2x - 2'],
          interceptPoints: [1, 3, -2],
        },
      },
      {
        id: 'lf-step-6',
        type: 'interactive',
        title: 'Build Your Own Line!',
        content: 'Adjust the slope (m) and y-intercept (b) to create different lines. Watch how each parameter changes the graph!',
        visualType: 'simulation',
        visualData: {
          type: 'line-builder',
          defaultM: 1,
          defaultB: 0,
          rangeM: [-5, 5],
          rangeB: [-5, 5],
        },
      },
      {
        id: 'lf-step-7',
        type: 'quiz',
        title: 'Final Challenge!',
        content: 'What is the equation of a line with slope 2 that crosses the y-axis at (0, -3)?',
        quizOptions: [
          { id: 'a', text: 'y = -3x + 2', isCorrect: false },
          { id: 'b', text: 'y = 2x + 3', isCorrect: false },
          { id: 'c', text: 'y = 2x - 3', isCorrect: true },
          { id: 'd', text: 'y = -2x - 3', isCorrect: false },
        ],
        hint: 'Plug in: m = 2 and b = -3 into y = mx + b',
      },
    ],
  },

  'intro-equations-lesson': {
    id: 'intro-equations-lesson',
    title: 'What is an Equation?',
    description: 'Discover the fundamental concept of mathematical equations — balancing both sides.',
    subject: 'Mathematics',
    difficulty: 'beginner',
    estimatedMinutes: 8,
    xpReward: 50,
    coinReward: 10,
    mascotIntro: "Welcome, brave explorer! 🦊 Think of an equation like a seesaw — both sides must be BALANCED! Let's see how!",
    mascotOutro: "You did it! 🌟 You understand equations now! They're like puzzles waiting to be solved. Keep going!",
    steps: [
      {
        id: 'eq-step-1',
        type: 'visual',
        title: 'An Equation is a Balance',
        content: 'An equation says that two things are EQUAL. Think of a balance scale — both sides must weigh the same!',
        visualType: 'animation',
        visualData: { type: 'balance-scale', left: '3 + 2', right: '5' },
      },
      {
        id: 'eq-step-2',
        type: 'visual',
        title: 'The Equal Sign',
        content: 'The = sign is the MOST IMPORTANT part. It tells you the left side has the same value as the right side.',
        visualType: 'diagram',
        visualData: { type: 'equal-sign-highlight', equation: '7 = 3 + 4' },
      },
      {
        id: 'eq-step-3',
        type: 'interactive',
        title: 'Balance the Scale!',
        content: 'Drag numbers to make both sides equal. Can you find the right combination?',
        visualType: 'simulation',
        visualData: { type: 'drag-balance', target: 10, availableNumbers: [2, 3, 4, 5, 6, 7, 8] },
        hint: 'Try different combinations that add up to 10!',
      },
      {
        id: 'eq-step-4',
        type: 'quiz',
        title: 'Check Your Understanding',
        content: 'Which of these is an equation?',
        quizOptions: [
          { id: 'a', text: '3 + 5', isCorrect: false },
          { id: 'b', text: '3 + 5 = 8', isCorrect: true },
          { id: 'c', text: 'x + y', isCorrect: false },
          { id: 'd', text: '> 10', isCorrect: false },
        ],
        hint: 'An equation MUST have an equal sign (=)',
      },
      {
        id: 'eq-step-5',
        type: 'visual',
        title: 'Variables: The Mystery Numbers',
        content: 'Sometimes we use letters like x or y to represent unknown numbers. Solving means finding what number the letter represents!',
        visualType: 'animation',
        visualData: { type: 'variable-reveal', equation: 'x + 3 = 7', answer: 4 },
      },
      {
        id: 'eq-step-6',
        type: 'quiz',
        title: 'Solve it!',
        content: 'If x + 5 = 12, what is x?',
        quizOptions: [
          { id: 'a', text: 'x = 5', isCorrect: false },
          { id: 'b', text: 'x = 12', isCorrect: false },
          { id: 'c', text: 'x = 7', isCorrect: true },
          { id: 'd', text: 'x = 17', isCorrect: false },
        ],
        hint: 'What number plus 5 gives you 12?',
      },
    ],
  },

  'function-basics': {
    id: 'function-basics',
    title: 'Function Basics: Inputs & Outputs',
    description: 'Learn how functions transform inputs into outputs — like magical machines!',
    subject: 'Mathematics',
    difficulty: 'beginner',
    estimatedMinutes: 10,
    xpReward: 50,
    coinReward: 10,
    mascotIntro: "Ooh, functions are like MAGIC MACHINES! 🦊✨ You put a number in one end and a different number comes out the other!",
    mascotOutro: "You're a natural! 🎊 Functions are the building blocks of all advanced math. You're well on your way!",
    steps: [
      {
        id: 'fb-step-1',
        type: 'visual',
        title: 'The Function Machine',
        content: 'A function takes an INPUT, does something to it, and produces an OUTPUT. Think of it as a magical machine!',
        visualType: 'animation',
        visualData: { type: 'function-machine', input: 3, rule: 'multiply by 2', output: 6 },
      },
      {
        id: 'fb-step-2',
        type: 'interactive',
        title: 'Feed the Machine!',
        content: 'Try putting different numbers into the function f(x) = x + 5. What comes out?',
        visualType: 'simulation',
        visualData: { type: 'function-tester', rule: 'x + 5', inputs: [1, 3, 7, 10] },
      },
      {
        id: 'fb-step-3',
        type: 'quiz',
        title: 'Function Quiz',
        content: 'If f(x) = x × 3, what is f(4)?',
        quizOptions: [
          { id: 'a', text: '7', isCorrect: false },
          { id: 'b', text: '12', isCorrect: true },
          { id: 'c', text: '3', isCorrect: false },
          { id: 'd', text: '4', isCorrect: false },
        ],
        hint: 'Replace x with 4, then multiply by 3!',
      },
    ],
  },
};

export function getLesson(id: string): Lesson | undefined {
  return lessons[id];
}
