import { ModeToggle } from "./mode-toggle";

export function ModeToggleIndicator() {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-1 right-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 p-3 font-mono text-xs text-white">
      <ModeToggle />
    </div>
  );
}
