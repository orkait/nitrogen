import * as React from "react";
import { ProgressBar } from "@repo/ui/progress-bar";
import { IconBox } from "@repo/ui/icon-box";
import { Button } from "@repo/ui/button";
import { cn } from "@repo/ui-utils";

export interface TopicCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    totalLessons: number;
    completedLessons: number;
    icon?: React.ReactNode;
    colorVariant?: "primary" | "success" | "default";
    // New Feature Props
    nextLesson?: string;
    onResume?: () => void;
    stats?: {
        easy?: number;
        medium?: number;
        hard?: number;
    };
}

const TopicCard = React.forwardRef<HTMLDivElement, TopicCardProps>(
    ({
        className,
        title,
        totalLessons,
        completedLessons,
        icon,
        colorVariant = "primary",
        nextLesson,
        onResume,
        stats,
        ...props
    }, ref) => {
        const progress = (completedLessons / totalLessons) * 100;
        const isStarted = completedLessons > 0 && completedLessons < totalLessons;

        return (
            <div
                ref={ref}
                className={cn(
                    "flex flex-col rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md",
                    className
                )}
                {...props}
            >
                {/* Header: Icon + Percent */}
                <div className="flex items-start justify-between">
                    <IconBox variant={colorVariant} size="md">
                        {icon || <span className="text-xl font-bold">{title[0]}</span>}
                    </IconBox>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="mt-4 flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>

                    {/* Feature 2: Stats Pills */}
                    {stats && (
                        <div className="mb-3 mt-1 flex space-x-2 text-[10px] font-medium">
                            {stats.easy && <span className="flex items-center text-green-600 bg-green-50 px-1.5 py-0.5 rounded">🟢 {stats.easy} Easy</span>}
                            {stats.medium && <span className="flex items-center text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">🟡 {stats.medium} Med</span>}
                            {stats.hard && <span className="flex items-center text-red-600 bg-red-50 px-1.5 py-0.5 rounded">🔴 {stats.hard} Hard</span>}
                        </div>
                    )}

                    {!stats && (
                        <p className="text-sm text-gray-500 mb-4">
                            {completedLessons} / {totalLessons} Lessons
                        </p>
                    )}

                    <ProgressBar value={progress} variant={colorVariant as any} className="h-1.5" />
                </div>

                {/* Feature 1: Resume Action */}
                {(nextLesson && isStarted) && (
                    <div className="mt-5 border-t border-dashed border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold text-gray-400">Up Next</span>
                                <span className="text-xs font-medium text-gray-700 truncate max-w-[120px]">{nextLesson}</span>
                            </div>
                            <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 p-0 h-auto font-semibold" onClick={onResume}>
                                Resume →
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
);

TopicCard.displayName = "TopicCard";
export { TopicCard };