import React, { useState, useEffect } from 'react';
import { StageId, Badge, UserAnswerRecord } from './types';
import { INITIAL_BADGES } from './data/questions';
import { Navbar } from './components/Navbar';
import { CheatSheetModal } from './components/CheatSheetModal';
import { WelcomeScreen } from './components/stages/WelcomeScreen';
import { Mission1Subjects } from './components/stages/Mission1Subjects';
import { Mission2Spelling } from './components/stages/Mission2Spelling';
import { Mission3BossSpelling } from './components/stages/Mission3BossSpelling';
import { Mission4DoesTrap } from './components/stages/Mission4DoesTrap';
import { Mission5GrandBattle } from './components/stages/Mission5GrandBattle';
import { ResultsScreen } from './components/stages/ResultsScreen';
import { playSoundEffect } from './utils/sound';

export default function App() {
  const [currentStage, setCurrentStage] = useState<StageId>('welcome');
  const [xp, setXp] = useState<number>(0);
  const [combo, setCombo] = useState<number>(1);
  const [completedMissions, setCompletedMissions] = useState<StageId[]>([]);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [history, setHistory] = useState<UserAnswerRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState<boolean>(false);
  const [lastBattleScore, setLastBattleScore] = useState<number>(0);
  const [lastBattleTotal, setLastBattleTotal] = useState<number>(10);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    try {
      const savedXp = localStorage.getItem('s_quest_xp');
      if (savedXp) setXp(parseInt(savedXp, 10));

      const savedMissions = localStorage.getItem('s_quest_missions');
      if (savedMissions) setCompletedMissions(JSON.parse(savedMissions));

      const savedBadges = localStorage.getItem('s_quest_badges');
      if (savedBadges) setBadges(JSON.parse(savedBadges));

      const savedSound = localStorage.getItem('s_quest_sound');
      if (savedSound !== null) setSoundEnabled(savedSound === 'true');
    } catch {
      // ignore
    }
  }, []);

  // Save progress changes
  const saveProgress = (newXp: number, newMissions: StageId[], newBadges: Badge[]) => {
    try {
      localStorage.setItem('s_quest_xp', newXp.toString());
      localStorage.setItem('s_quest_missions', JSON.stringify(newMissions));
      localStorage.setItem('s_quest_badges', JSON.stringify(newBadges));
    } catch {
      // ignore
    }
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    try {
      localStorage.setItem('s_quest_sound', nextVal.toString());
    } catch {
      // ignore
    }
  };

  const unlockBadge = (badgeId: string, currentBadgesList = badges) => {
    return currentBadgesList.map((b) =>
      b.id === badgeId ? { ...b, unlocked: true } : b
    );
  };

  const handleStageComplete = (
    stageId: StageId,
    xpGained: number,
    badgeIdToUnlock?: string
  ) => {
    const newXp = xp + xpGained;
    setXp(newXp);

    const newMissions = completedMissions.includes(stageId)
      ? completedMissions
      : [...completedMissions, stageId];
    setCompletedMissions(newMissions);

    let updatedBadges = badges;
    if (badgeIdToUnlock) {
      updatedBadges = unlockBadge(badgeIdToUnlock, badges);
      setBadges(updatedBadges);
    }

    saveProgress(newXp, newMissions, updatedBadges);
  };

  const handleStartMission = (stage: StageId) => {
    playSoundEffect('click', soundEnabled);
    setCurrentStage(stage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteBattle = (
    finalScore: number,
    totalQuestions: number,
    battleHistory: UserAnswerRecord[],
    earnedXp: number
  ) => {
    setLastBattleScore(finalScore);
    setLastBattleTotal(totalQuestions);
    setHistory(battleHistory);

    const newXp = xp + earnedXp;
    setXp(newXp);

    const newMissions = completedMissions.includes('mission5_grand_battle')
      ? completedMissions
      : [...completedMissions, 'mission5_grand_battle'];
    setCompletedMissions(newMissions);

    let updatedBadges = badges;
    if (finalScore >= totalQuestions * 0.7) {
      updatedBadges = unlockBadge('s_master', badges);
      setBadges(updatedBadges);
    }

    saveProgress(newXp, newMissions, updatedBadges);
    setCurrentStage('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayAgain = () => {
    playSoundEffect('click', soundEnabled);
    setCurrentStage('mission5_grand_battle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    playSoundEffect('click', soundEnabled);
    setCurrentStage('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-amber-50/60 text-slate-800">
      {/* Global Top Navbar */}
      <Navbar
        currentStage={currentStage}
        xp={xp}
        combo={combo}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
        onGoHome={handleGoHome}
      />

      {/* Main Content Area according to current stage */}
      <main className="flex-1 flex flex-col justify-start">
        {currentStage === 'welcome' && (
          <WelcomeScreen
            completedMissions={completedMissions}
            badges={badges}
            xp={xp}
            onStart={handleStartMission}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
          />
        )}

        {currentStage === 'mission1_subjects' && (
          <Mission1Subjects
            onComplete={(xpEarned, badgeId) =>
              handleStageComplete('mission1_subjects', xpEarned, badgeId)
            }
            onNextStage={handleStartMission}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStage === 'mission2_spelling' && (
          <Mission2Spelling
            onComplete={(xpEarned, badgeId) =>
              handleStageComplete('mission2_spelling', xpEarned, badgeId)
            }
            onNextStage={handleStartMission}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStage === 'mission3_boss_spelling' && (
          <Mission3BossSpelling
            onComplete={(xpEarned, badgeId) =>
              handleStageComplete('mission3_boss_spelling', xpEarned, badgeId)
            }
            onNextStage={handleStartMission}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStage === 'mission4_does_trap' && (
          <Mission4DoesTrap
            onComplete={(xpEarned, badgeId) =>
              handleStageComplete('mission4_does_trap', xpEarned, badgeId)
            }
            onNextStage={handleStartMission}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStage === 'mission5_grand_battle' && (
          <Mission5GrandBattle
            onCompleteBattle={handleCompleteBattle}
            soundEnabled={soundEnabled}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
          />
        )}

        {currentStage === 'results' && (
          <ResultsScreen
            score={lastBattleScore}
            totalQuestions={lastBattleTotal}
            xp={xp}
            badges={badges}
            history={history}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
            onOpenCheatSheet={() => setIsCheatSheetOpen(true)}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Global 5-Second Cheat Sheet Modal */}
      <CheatSheetModal
        isOpen={isCheatSheetOpen}
        onClose={() => setIsCheatSheetOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full border-t border-amber-200/80 bg-white/70 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-semibold text-slate-700">
            <span>🎮 S QUEST – Bí Kíp He, She & It</span>
            <span>•</span>
            <span className="text-amber-700">Tiếng Anh Lớp 6 THCS</span>
          </div>
          <div className="text-slate-400">
            "Thêm đúng một chữ S – nói tiếng Anh tự tin hơn!"
          </div>
        </div>
      </footer>
    </div>
  );
}
