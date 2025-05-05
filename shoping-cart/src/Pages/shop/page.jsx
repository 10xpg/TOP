import { useOutletContext } from 'react-router-dom'
import { Hero, Content } from '../../Components/Shop'
import styes from '../../Styles/Shop/Shop.module.css'

export default function Shop() {
  const context = useOutletContext()

  return (
    <main className={styes.shoppage}>
      <Hero />
      <Content cart={context} />
    </main>
  )
}
