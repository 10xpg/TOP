import styles from '../../Styles/Home/Home.module.css'

const Sample = () => {
  return (
    <>
      <h2 className={styles.hero}>Browse The Range</h2>
      <h3 className={styles.hero}>Categories</h3>
      <div className={styles.category}>
        <div className={styles['category-item']}>
          <img src='https://i.pinimg.com/736x/bd/8d/02/bd8d026cec2d23bd8ce77cb7bc3021c2.jpg' alt="Men's wear" />
          <p>Men's clothing</p>
        </div>
        <div className={styles['category-item']}>
          <img src='https://i.pinimg.com/736x/32/8a/47/328a47e70e55cc8818ee02b255d043c5.jpg' alt="Women's wear" />
          <p>Women's clothing</p>
        </div>
        <div className={styles['category-item']}>
          <img src='https://i.pinimg.com/736x/1f/ac/cf/1faccf08bd5d8bbf491fb5ed0fec2974.jpg' alt='Jewels' />
          <p>Jewelry</p>
        </div>
        <div className={styles['category-item']}>
          <img src='https://i.pinimg.com/736x/a2/c3/ac/a2c3accd12033ce47358429071c4b170.jpg' alt='Electronics' />
          <p>Electronics</p>
        </div>
      </div>
    </>
  )
}

export { Sample }
