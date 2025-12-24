import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Play, Terminal } from 'lucide-react';
import { useState } from 'react';

// Mock Data (matches QuestsPage)
const QUESTS_DATA: Record<string, any> = {
  '1': {
    id: 1,
    title: 'Hello Stacks',
    description: 'Write your first Clarity smart contract and deploy it to the testnet.',
    content: `
      <h2>The Challenge</h2>
      <p>Welcome to Stacks development! In this quest, you will learn the basics of Clarity, a decidable smart contract language.</p>
      
      <h3>Objective</h3>
      <p>Create a simple public function that returns "Hello, World!".</p>
      
      <h3>Steps</h3>
      <ol>
        <li>Define a public function named <code>say-hello</code></li>
        <li>Return a string literal</li>
      </ol>
    `,
    initialCode: ';; Write your contract here\n\n(define-public (say-hello)\n  (ok "Hello, World!")\n)',
    reward: 10,
    difficulty: 'Beginner',
  },
  // Fallback for other IDs for demo purposes
  'default': {
    id: 0,
    title: 'Quest Not Found',
    description: 'This quest does not exist.',
    content: '',
    initialCode: '',
    reward: 0,
    difficulty: 'Unknown',
  }
};

export const QuestDetailPage = () => {
  const { id } = useParams();
  const quest = QUESTS_DATA[id || ''] || (id ? QUESTS_DATA['1'] : QUESTS_DATA['default']); // Fallback to 1 for demo if ID valid but not in map, or default
  
  const [code, setCode] = useState(quest.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simulate execution
    setTimeout(() => {
      setIsRunning(false);
      setOutput('>> Analysis passed\n>> Contract deployed to testnet\n>> Function returns (ok "Hello, World!")');
      setIsCompleted(true);
    }, 1500);
  };

  if (!quest.id) {
     return <div className="pt-24 text-center text-white">Quest not found</div>;
  }

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="container mx-auto px-4">
        <Link to="/quests" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Quests
        </Link>
        
        <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Left Panel: Instructions */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-8">
            <div className="mb-6">
              <h1 className="mb-2 text-3xl font-bold text-white">{quest.title}</h1>
              <div className="flex gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  Difficulty: <span className="text-violet-400">{quest.difficulty}</span>
                </span>
                <span className="flex items-center gap-1">
                  Reward: <span className="text-violet-400">{quest.reward} STX</span>
                </span>
              </div>
            </div>

            <div 
              className="prose prose-invert max-w-none flex-1 overflow-y-auto pr-2"
              dangerouslySetInnerHTML={{ __html: quest.content }}
            />
          </div>

          {/* Right Panel: Editor */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e]">
              <div className="flex items-center justify-between border-b border-white/10 bg-[#252526] px-4 py-2">
                <span className="flex items-center gap-2 text-sm text-gray-400">
                  <Terminal className="h-4 w-4" />
                  contract.clar
                </span>
                <button
                  onClick={handleRun}
                  disabled={isRunning || isCompleted}
                  className={`flex items-center gap-2 rounded bg-green-600 px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-green-700 disabled:opacity-50`}
                >
                  <Play className="h-3 w-3" />
                  {isRunning ? 'Running...' : 'Run & Verify'}
                </button>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm text-gray-300 focus:outline-none"
                spellCheck={false}
              />
            </div>

            {/* Output Console */}
            <div className="h-48 overflow-hidden rounded-2xl border border-white/10 bg-black p-4 font-mono text-sm">
              <div className="mb-2 text-xs uppercase tracking-wider text-gray-500">Console Output</div>
              {output ? (
                <pre className="whitespace-pre-wrap text-green-400">{output}</pre>
              ) : (
                <div className="text-gray-600 italic">Ready to execute...</div>
              )}
            </div>
            
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/10 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">Quest Completed!</h3>
                    <p className="text-sm text-gray-400">You earned {quest.reward} STX</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-sm font-bold text-green-400 hover:underline">
                  Claim Reward <ChevronRight className="h-4 w-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
