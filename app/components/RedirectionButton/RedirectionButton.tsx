import styles from './RedirectionButton.module.scss'
import Link from "next/link"

interface RedirectionButtonProps {
    backgroundColor: string,
    href: string,
    text: string,
    fontSize?: any
}

export default function ({ backgroundColor, href, text, fontSize }: RedirectionButtonProps) {

    const buttonStyle = {
        backgroundColor: backgroundColor,
        fontSize: fontSize
    }

    return (
        <div className={styles.buttonWrapper} style={buttonStyle}>
            <Link className={styles.nextLink} prefetch={true} href={href}>{text}</Link>
        </div>
    )

}