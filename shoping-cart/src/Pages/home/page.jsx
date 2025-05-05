import { Hero } from '../../Components/Home/Hero'
import { Sample } from '../../Components/Home/Sample'
import styles from '../../Styles/Home/Home.module.css'

export default function Home() {
  return (
    <main className={styles.homepage}>
      <Hero />
      <Sample />
    </main>
  )
}
