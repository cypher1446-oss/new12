import FluenceNav from "@/components/FluenceNav"
import FluenceHero from "@/components/FluenceHero"
import FluenceBento from "@/components/FluenceBento"
import FluenceFooter from "@/components/FluenceFooter"

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-main">
      <FluenceNav />
      <FluenceHero />
      <FluenceBento />
      <FluenceFooter />
    </main>
  )
}
