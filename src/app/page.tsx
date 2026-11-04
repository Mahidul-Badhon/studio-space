import AboutUs from "@/components/homepage/AboutUs"
import { Banner } from "@/components/homepage/Banner"
import GurrantySupport from "@/components/homepage/GurrantySupport"
import HowItWorks from "@/components/homepage/How-it-works"


export default function Home() {
  return (
    <>
      <Banner />
      <HowItWorks></HowItWorks>
      <GurrantySupport></GurrantySupport>
      <AboutUs></AboutUs>
    </>
  )
}
