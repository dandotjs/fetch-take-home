import { FormOptionsDto } from '@/interfaces/formOptionsDto.interface'
import { Inter } from '@next/font/google'
import Head from 'next/head'
import { useState } from 'react'
import Form from '../components/Form'
const inter = Inter({ subsets: ['latin'] })


export default function Home(data: FormOptionsDto) {
  const [userCreated, setUserCreated] = useState(false)
  return (
    <>
      <Head>
        <title>Fetch Take Home 😸</title>
        <meta name="description" content="Fetch Take Home Test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='my-10 mx-auto min-w-fit w-1/3 max-w-max h-full gradient-form md:h-screen'>
      <section className="container py-12 px-6 h-full">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg shadow-black rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6 sm:p-4 sm:mx-4">
                    {userCreated ? (
                      <div className="text-center text-lg font-semibold">
                        <div>
                          User Created!
                        </div>
                        <div className="mt-5 text-center text-sm hover:cursor-pointer font-light"
                          onClick={() => {
                          setUserCreated(false)
                          }}>
                          Create Another User
                        </div>
                      </div>) : (
                      <Form formOptions={data} setUserCreated={setUserCreated}/>
                    )}
                  </div>
                </div>
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-r from-orange-400 via-red-400 to-pink-400"
                >
                  <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <h2 className="text-2xl font-semibold mb-6">Fetch Rewards</h2>
                    <p className="text-sm">
                    Exciting ways to save. Unexpected surprises. Fetch brings the fun every time you tap the app.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`https://frontend-take-home.fetchrewards.com/form`, {
    headers: {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59'
    }
  })
  const data: FormOptionsDto = await res.json()
  return { props: data }
}