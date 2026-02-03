import * as React from "react";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui-utils";

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name?: string;
    username?: string;
    role?: string;
    avatarUrl?: string;
    onFollow?: () => void;
    isFollowing?: boolean;
}

const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
    ({
        className,
        name = "Jane Duo",
        username = "@janedoe",
        role = "Software Engineer",
        avatarUrl,
        onFollow,
        isFollowing = false,
        ...props
    }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md",
                    className
                )}
                {...props}
            >
                {/* Avatar Circle */}
                <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-gray-50 bg-gray-100">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-200 text-2xl font-bold text-gray-400">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Text Details */}
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                <p className="text-sm font-medium text-gray-500">{username}</p>
                <span className="mt-2 inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {role}
                </span>

                {/* Action Button */}
                <div className="mt-6 w-full">
                    <Button
                        className="w-full"
                        onClick={onFollow}
                        variantColor={isFollowing ? "secondary" : "primary"}
                        variant={isFollowing ? "outline" : "fill"}
                    >
                        {isFollowing ? "Following" : "Follow"}
                    </Button>
                </div>
            </div>
        );
    }
);

ProfileCard.displayName = "ProfileCard";
export { ProfileCard };