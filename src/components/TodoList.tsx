import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Todo } from '@/hooks/useTodos';

interface TodoListProps {
  todos: Todo[];
  onAdd: (text: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearCompleted: () => void;
  completedCount: number;
}

export function TodoList({
  todos,
  onAdd,
  onToggle,
  onDelete,
  onClearCompleted,
  completedCount,
}: TodoListProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input);
      setInput('');
    }
  };

  return (
    <div className="glass-card p-6 w-full max-w-md slide-up">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tasks</h2>
        {completedCount > 0 && (
          <button
            onClick={onClearCompleted}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear completed ({completedCount})
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a task..."
          className="flex-1 bg-secondary/50 border-0 rounded-xl px-4 py-2.5 text-sm 
                     placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                     focus:ring-primary/50 transition-all"
        />
        <Button type="submit" size="icon" variant="default" className="rounded-xl shrink-0">
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {todos.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-8">
            No tasks yet. Add one to get started!
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                todo.completed ? "bg-success/10" : "bg-secondary/30 hover:bg-secondary/50"
              )}
            >
              <button
                onClick={() => onToggle(todo.id)}
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                  todo.completed
                    ? "bg-success border-success text-primary-foreground"
                    : "border-muted-foreground hover:border-primary"
                )}
              >
                {todo.completed && <Check className="w-3 h-3" />}
              </button>
              
              <span
                className={cn(
                  "flex-1 text-sm transition-all",
                  todo.completed && "line-through text-muted-foreground"
                )}
              >
                {todo.text}
              </span>
              
              <button
                onClick={() => onDelete(todo.id)}
                className="text-muted-foreground hover:text-destructive transition-colors p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
