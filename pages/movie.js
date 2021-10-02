import Head from 'next/head'
import Image from 'next/image'
import CastInfo from '../components/cast'
import FeaturedVideo from '../components/featured'
import MainLayout from '../components/mainlayout'
import MediaRow from '../components/mediarow'

export default function Home() {
  return (
    <MainLayout>
       <FeaturedVideo/>
       <MediaRow/>
       <CastInfo/>
    </MainLayout>
  )
}