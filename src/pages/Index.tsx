import { Header } from '@/components/Header';
import { TimerDisplay } from '@/components/TimerDisplay';
import { TimerControls } from '@/components/TimerControls';
import { ModeSelector } from '@/components/ModeSelector';
import { CustomTimerInput } from '@/components/CustomTimerInput';
import { TodoList } from '@/components/TodoList';
import { AmbientSounds } from '@/components/AmbientSounds';
import { SessionCounter } from '@/components/SessionCounter';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { useTimer } from '@/hooks/useTimer';
import { useTheme } from '@/hooks/useTheme';
import { useAmbientSound } from '@/hooks/useAmbientSound';
import { useTodos } from '@/hooks/useTodos';

const Index = () => {
  const timer = useTimer();
  const { theme, toggleTheme } = useTheme();
  const ambient = useAmbientSound();
  const todos = useTodos();

  const isBreak = timer.mode === 'shortBreak' || timer.mode === 'longBreak';

  return (
    <div className="min-h-screen flex flex-col">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="flex-1 flex flex-col items-center px-4 pb-8">
        {/* Timer Section */}
        <section className="flex flex-col items-center gap-6 mb-8">
          <ModeSelector
            currentMode={timer.mode}
            onModeChange={timer.switchMode}
          />

          {timer.mode === 'custom' && (
            <CustomTimerInput
              currentMinutes={timer.settings.custom}
              onSetTime={timer.updateCustomTime}
            />
          )}

          <TimerDisplay
            time={timer.formattedTime}
            progress={timer.progress}
            isRunning={timer.isRunning}
            isBreak={isBreak}
          />

          <TimerControls
            isRunning={timer.isRunning}
            onStart={timer.start}
            onPause={timer.pause}
            onReset={timer.reset}
          />

          <SessionCounter count={timer.sessionCount} />

          <MotivationalQuote isBreak={isBreak} />
        </section>

        {/* Tools Section */}
        <section className="w-full max-w-4xl grid md:grid-cols-2 gap-6 px-4">
          <TodoList
            todos={todos.todos}
            onAdd={todos.addTodo}
            onToggle={todos.toggleTodo}
            onDelete={todos.deleteTodo}
            onClearCompleted={todos.clearCompleted}
            completedCount={todos.completedCount}
          />

          <AmbientSounds
            sounds={ambient.sounds}
            currentSound={ambient.currentSound}
            isPlaying={ambient.isPlaying}
            volume={ambient.volume}
            onToggle={ambient.toggle}
            onVolumeChange={ambient.updateVolume}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground">
        Made with focus & flow
      </footer>
    </div>
  );
};

export default Index;
