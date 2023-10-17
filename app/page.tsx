
import EventLists from '@/components/EventLists'
import Footer from '@/components/global/Footer'


export const dynamic = 'force-dynamic'



export default async function Index() {

  return (
    <div className="w-full flex flex-col items-center">
      <div className="animate-in flex flex-col gap-10  max-w-6xl px-3 py-16 lg:py-24 text-foreground">
        <div className="flex flex-col items-center  ">
          <p className="text-3xl lg:text-4xl text-[#151615] !leading-tight mx-auto max-w-xl text-center my-8">
            <strong>YEN SAMBRAMA 2023</strong>
          </p>
        </div>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Select the event you want to register          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            <EventLists />
          </div>
        </div>
        <div className="flex flex-col gap-8 text-foreground">
          <div className="grid gap-2 justify-center mx-auto text-center">
            <h2 className="text-lg font-bold text-center">Examples</h2>
            <p className="text-sm">
              Look in the <code>_examples</code> folder to see how to create a
              Supabase client in all the different contexts.
            </p>
          </div>
          </div>
        <Footer />
      </div>
    </div>
    // <div className="w-full flex flex-col items-center">
    //   <div className=" flex flex-col gap-14  max-w-4xl px-3 py-16 lg:py-24">
    //     <h1>Hi</h1>
    //   </div>
    // </div>
  )
}
