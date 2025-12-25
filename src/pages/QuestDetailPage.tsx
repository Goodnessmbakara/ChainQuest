import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Play, Terminal } from 'lucide-react';
import { useState } from 'react';
// @ts-ignore
import confetti from 'canvas-confetti';
import { completeQuest } from '../lib/contracts/quest-manager';
import { claimRewards } from '../lib/contracts/reward-distributor';

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
  '2': {
    id: 2,
    title: 'Data Storage 101',
    description: 'Learn how to store and retrieve data on the Stacks blockchain using maps and variables.',
    content: `
      <h2>Storing Data on Stacks</h2>
      <p>Smart contracts often need to store state. Clarity provides <code>define-data-var</code> for single values and <code>define-map</code> for key-value stores.</p>
      <h3>Objective</h3>
      <p>Define a data variable named <code>message</code> and a function to update it.</p>
    `,
    initialCode: ';; Define a data variable\n(define-data-var message (string-utf8 50) u"Hello")\n\n(define-public (set-message (new-msg (string-utf8 50)))\n  (ok (var-set message new-msg))\n)',
    reward: 15,
    difficulty: 'Beginner',
  },
  '3': {
    id: 3,
    title: 'Sip-009 NFT',
    description: 'Build your own NFT contract implementing the SIP-009 standard.',
    content: `
      <h2>Non-Fungible Tokens (NFTs)</h2>
      <p>SIP-009 is the standard for NFTs on Stacks. It defines traits that your contract must implement to be compatible with wallets and marketplaces.</p>
      <h3>Objective</h3>
      <p>Define a new NFT and a mint function.</p>
    `,
    initialCode: '(define-non-fungible-token my-nft uint)\n\n(define-public (mint (recipient principal))\n  (nft-mint? my-nft u1 recipient)\n)',
    reward: 50,
    difficulty: 'Intermediate',
  },
  '4': {
    id: 4,
    title: 'DeFi Swap',
    description: 'Create a simple token swap contract using SIP-010 fungible tokens.',
    content: `
      <h2>Decentralized Finance (DeFi)</h2>
      <p>Swapping tokens is a fundamental building block of DeFi. In Clarity, you can transfer assets safely with post-conditions.</p>
      <h3>Objective</h3>
      <p>Write a function that transfers STX from the sender to the contract.</p>
    `,
    initialCode: '(define-public (deposit (amount uint))\n  (stx-transfer? amount tx-sender (as-contract tx-sender))\n)',
    reward: 100,
    difficulty: 'Advanced',
  },
  '5': {
    id: 5,
    title: 'Wallet Connect',
    description: 'Integrate a frontend with your smart contract using Stacks.js and WalletConnect.',
    content: `
      <h2>Frontend Integration</h2>
      <p>Connecting your dApp to user wallets is crucial. Learn how to use Stacks.js to authenticate users and sign transactions.</p>
      <h3>Objective</h3>
      <p>Simulate a frontend connection verification.</p>
    `,
    initialCode: ';; This quest focuses on frontend code\n;; Click Run to simulate the connection flow.',
    reward: 25,
    difficulty: 'Intermediate',
  },
  '6': {
    id: 6,
    title: 'Bitcoin Oracle',
    description: 'Read Bitcoin state directly from your Clarity smart contract using Proof-of-Transfer.',
    content: `
      <h2>Bitcoin on Stacks</h2>
      <p>Stacks has visibility into the Bitcoin chain. You can read block headers and verify transactions using <code>contract-call?</code> to the PoX contract.</p>
      <h3>Objective</h3>
      <p>Fetch the current burn block height (Bitcoin block height).</p>
    `,
    initialCode: '(define-read-only (get-btc-height)\n  (ok burn-block-height)\n)',
    reward: 150,
    difficulty: 'Advanced',
  },
  '7': {
    id: 7,
    title: 'Access Control',
    description: 'Implement secure access controls and ownership management in your contracts.',
    content: `
      <h2>Security & Access Control</h2>
      <p>Not everyone should be able to call sensitive functions. Use <code>asserts!</code> to check if the <code>tx-sender</code> is authorized.</p>
      <h3>Objective</h3>
      <p>Protect a function so only the contract owner can call it.</p>
    `,
    initialCode: ';; Define owner\n(define-constant contract-owner tx-sender)\n\n(define-public (admin-only)\n  (begin\n    (asserts! (is-eq tx-sender contract-owner) (err u100))\n    (ok "Admin access granted")\n  )\n)',
  },
};

export const QuestDetailPage = () => {
  const { id } = useParams();
  const quest = QUESTS_DATA[id || ''] || (id ? QUESTS_DATA['1'] : QUESTS_DATA['default']); 
  
  const [code, setCode] = useState(quest.initialCode);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput(null);

    try {
      // Simulate verification period
      setOutput('>> Verifying solution...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, we would verify the code locally or via a backend first
      // Here we assume the code is correct and trigger the on-chain transaction
      
      setOutput('>> Solution verified. Requesting signature...');
      await completeQuest(quest.id);
      
      setOutput('>> Transaction submitted!\\n>> Quest marked as complete.');
      setIsCompleted(true);
      
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#6366f1', '#10b981'],
      });
    } catch (error) {
      console.error(error);
      setOutput(`>> Error: ${error instanceof Error ? error.message : 'Transaction failed'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleClaim = async () => {
    try {
      await claimRewards();
      alert('Reward claim transaction submitted!');
    } catch (e) {
      console.error(e);
    }
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
                <button onClick={handleClaim} className="flex items-center gap-1 text-sm font-bold text-green-400 hover:underline">
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
