
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme} 
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          className="rounded-full relative overflow-hidden button-3d bg-card border border-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/10 to-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative z-10 transition-all duration-500 ease-out">
            {theme === 'light' ? (
              <Moon className="h-[1.2rem] w-[1.2rem] text-brand-gold animate-fade-in" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] text-brand-yellow animate-fade-in" />
            )}
          </div>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="bottom" className="w-auto bg-card text-foreground border border-border shadow-md">
        <span className="text-sm">
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </span>
      </HoverCardContent>
    </HoverCard>
  );
};
