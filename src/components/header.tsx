import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignOut } from "./sign-out-button"

export function Header({ user } : { user?: {
    name: string | undefined | null,
    email: string | undefined | null,
    image: string | undefined | null
}}) {
  return (
    <div className="flex justify-between items-center mb-5 mt-5">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{user?.name}</span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </div>

      <SignOut />
    </div>
  )
}
