import headerStyles from '../styles/Header.module.css'

const Header = () => {
  return (
    <div className={headerStyles.container}>
      <h1 className={headerStyles.heading}> Wubba lubba dub dub! </h1>
      <h3>Rick and Morty Wiki</h3>
    </div>
  )
}
export default Header
