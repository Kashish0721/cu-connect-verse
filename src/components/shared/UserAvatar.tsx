
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface User {
  name: string;
  avatarUrl?: string;
}

interface UserAvatarProps {
  user: User;
  className?: string;
}

const UserAvatar = ({ user, className }: UserAvatarProps) => {
  // Get the initials from the user's name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <Avatar className={cn("", className)}>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback className="bg-gradient-to-br from-cuPurple-400 to-cuPurple-600 text-white">
        {getInitials(user.name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
