import type { Meta, StoryObj } from "@storybook/react";
import { TopicCard } from "@repo/blocks/topic-card";

// Simple icon for demo
const CodeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
);

const meta: Meta<typeof TopicCard> = {
    title: "Blocks/TopicCard",
    component: TopicCard,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TopicCard>;

export const DataStructures: Story = {
    args: {
        title: "Data Structures",
        totalLessons: 20,
        completedLessons: 12,
        icon: <CodeIcon />,
        colorVariant: "primary"
    },
};

export const Algorithms: Story = {
    args: {
        title: "Algorithms",
        totalLessons: 15,
        completedLessons: 15,
        icon: <CodeIcon />,
        colorVariant: "success"
    },
};
export const WithResume: Story = {
    args: {
        title: "Dynamic Programming",
        totalLessons: 50,
        completedLessons: 12,
        icon: <CodeIcon />,
        colorVariant: "primary",
        nextLesson: "Memoization Basics",
        onResume: () => alert("Resume Clicked!"),
        stats: { easy: 10, medium: 25, hard: 15 } // Showing both features
    }
};
