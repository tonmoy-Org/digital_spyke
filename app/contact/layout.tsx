import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us | Digital Spyke',
    description: "Get in touch with Digital Spyke.",
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
