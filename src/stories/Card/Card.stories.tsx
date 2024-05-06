import type { Meta } from '@storybook/react';
import { JSX } from 'react/jsx-runtime';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Card/Card"
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components';
import css from '@/theme-generator/magic';


const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

const meta = {
    title: '@components/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;

export const Default = {
    argTypes: {

    },
    render: (args: JSX.IntrinsicAttributes & CardProps) => (
        <Card className={css(`w-[380px]`)} {...args}>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center space-x-4 rounded-md border p-4">
                    <Bell />
                    <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Push Notifications
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Send notifications to device.
                        </p>
                    </div>
                    {/* <Switch /> */}
                </div>
                <div>
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-blue-500" />
                            <div className="space-y-1">
                                <p className="font-8 font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="font-6.5 text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-100" theme={'primary'} size={'xs'} block={false} outline={false} rounded={false} shadow={false} loading={false} text={''} testingName={''}>
                    <Check className="mr-2 h-4 w-4" /> Mark all as read
                </Button>
            </CardFooter>
        </Card>

    )
};

