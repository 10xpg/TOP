import { Hero, Content } from '../../Components/Shop'
import styes from '../../Styles/Shop/Shop.module.css'

export default function Shop() {
  return (
    <main className={styes.shoppage}>
      <Hero />
      <Content />
    </main>
  )
}
