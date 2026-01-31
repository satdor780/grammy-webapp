import styles from './DebugPanel.module.css'

interface Props {
  title: string
  children: string
}

export const DebugPanel = ({ title, children }: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{title}</div>
      <pre className={styles.content}>{children}</pre>
    </div>
  )
}
