import { UserButton } from "@/components/UserButton";

export function Navbar() {
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <UserButton />
        </div>
      </div>
    </nav>
  );
} 