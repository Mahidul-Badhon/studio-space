import AboutUs from "@/components/homepage/AboutUs"
import { Banner } from "@/components/homepage/Banner"
import CategoriesSection from "@/components/homepage/CategoriesSection"
import GurrantySupport from "@/components/homepage/GurrantySupport"
import HowItWorks from "@/components/homepage/How-it-works"


export default function Home() {
  return (
    <>
      <Banner />
      <CategoriesSection></CategoriesSection>
      <HowItWorks></HowItWorks>
      <GurrantySupport></GurrantySupport>
      <AboutUs></AboutUs>
    </>
  )
}
