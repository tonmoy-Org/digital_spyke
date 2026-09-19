import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Book a call | Digital Spyke',
    description: "Schedule a meeting with Digital Spyke to discuss your project.",
}

const layout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div>{children}</div>
    )
}

export default layout;
