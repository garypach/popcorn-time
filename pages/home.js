import Head from 'next/head'
import Image from 'next/image'
import FeaturedVideo from '../components/featured'
import MainLayout from '../components/mainlayout'

export default function Home() {
  return (
    <MainLayout>
       <FeaturedVideo/>
    </MainLayout>
  )
}