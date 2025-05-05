import styles from '../../Styles/Home/Home.module.css'

const Hero = () => {
  return (
    <>
      <p className={styles.welcome}>
        <strong>Welcome To TABERNA</strong>
      </p>
      <p className={styles.hero}>
        A mock shopping cart powered by the &nbsp;<a href='https://fakestoreapi.com/'>Fake Store API</a>
      </p>
    </>
  )
}

export { Hero }
