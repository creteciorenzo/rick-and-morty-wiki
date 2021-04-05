import styles from '../styles/Layouts.module.css'
const Layouts = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>{children}</div>
    </div>
  )
}

export default Layouts
