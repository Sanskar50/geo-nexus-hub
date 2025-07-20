import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Terminal, Cpu, Activity, Send } from 'lucide-react';

interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'error' | 'command';
  message: string;
  timestamp: string;
}

const AgentRunner = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: '1',
      type: 'info',
      message: 'Agent system initialized and ready for commands',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const addLog = (type: LogEntry['type'], message: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setLogs(prev => [...prev, newLog]);
  };

  const handleStart = async () => {
    setIsRunning(true);
    addLog('command', 'Starting AI agent...');
    
    // Simulate agent startup sequence
    const startupMessages = [
      { type: 'info' as const, message: 'Loading neural network models...', delay: 500 },
      { type: 'info' as const, message: 'Connecting to data sources...', delay: 1000 },
      { type: 'success' as const, message: 'Agent successfully initialized', delay: 1500 },
      { type: 'info' as const, message: 'Monitoring system status...', delay: 2000 }
    ];

    for (const msg of startupMessages) {
      setTimeout(() => addLog(msg.type, msg.message), msg.delay);
    }

    // Simulate periodic updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const messages = [
          'Processing incoming data stream...',
          'Analyzing system metrics...',
          'Executing background task #' + Math.floor(Math.random() * 1000),
          'Updating predictive models...',
          'Optimizing performance parameters...'
        ];
        addLog('info', messages[Math.floor(Math.random() * messages.length)]);
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  const handleStop = () => {
    setIsRunning(false);
    addLog('command', 'Stopping AI agent...');
    setTimeout(() => addLog('info', 'Agent stopped successfully'), 500);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    addLog('command', `> ${command}`);
    
    // Simulate command processing
    setTimeout(() => {
      const responses = [
        'Command executed successfully',
        'Processing request...',
        'Operation completed',
        'Task added to queue',
        'System parameters updated'
      ];
      addLog('success', responses[Math.floor(Math.random() * responses.length)]);
    }, 1000);

    setCommand('');
  };

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [logs]);

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'command': return <Terminal className="h-3 w-3" />;
      case 'success': return <Activity className="h-3 w-3" />;
      case 'error': return <Activity className="h-3 w-3" />;
      default: return <Cpu className="h-3 w-3" />;
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-primary';
      case 'success': return 'text-green-600';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium mb-1">AI Agent Console</h3>
          <p className="text-sm text-muted-foreground">
            Control and monitor agent operations
          </p>
        </div>
        <Badge 
          variant={isRunning ? "default" : "secondary"} 
          className={isRunning ? "bg-green-500/10 text-green-600 border-green-500/20" : ""}
        >
          {isRunning ? 'Running' : 'Stopped'}
        </Badge>
      </div>

      <div className="flex gap-2 mb-4">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleStart}
            disabled={isRunning}
            className="bg-gradient-primary hover:opacity-90 transition-opacity"
            size="sm"
          >
            <Play className="h-4 w-4 mr-2" />
            Start Agent
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleStop}
            disabled={!isRunning}
            variant="outline"
            size="sm"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        </motion.div>
      </div>

      <div className="flex-1 flex flex-col bg-secondary/30 rounded-lg border border-border/50 overflow-hidden">
        <div className="p-3 border-b border-border/50 bg-background/50">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Agent Logs</span>
            <Badge variant="outline" className="text-xs">
              {logs.length}
            </Badge>
          </div>
        </div>

        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-2 font-mono text-sm">
            <AnimatePresence>
              {logs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 group"
                >
                  <span className="text-xs text-muted-foreground mt-0.5 shrink-0">
                    {log.timestamp}
                  </span>
                  <div className={`flex items-center gap-1 ${getLogColor(log.type)}`}>
                    {getLogIcon(log.type)}
                    <span className="text-xs leading-relaxed">{log.message}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>

        <div className="p-3 border-t border-border/50 bg-background/50">
          <form onSubmit={handleCommand} className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter command..."
              className="flex-1 font-mono text-sm bg-background"
              disabled={!isRunning}
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!isRunning || !command.trim()}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentRunner;