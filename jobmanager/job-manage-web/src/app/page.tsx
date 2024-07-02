"use client"
import Link from "next/link";
import { useSidebarContext } from "../component/SideNavProvider";
import { useRouter } from "next/navigation";




export default function Home() {
  const router = useRouter();
  const { value } = useSidebarContext();
  return (
    <>

      <div className="relative isolate px-6 pt-14 lg:px-8">
   
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Manage your job
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
             Every thing can manage easy
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {value.token?<div
                onClick={() => router.push('/dashboard')}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
                </div>: <a
                href="/login"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>}
             
       
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
         
        </div>
      </div>
      </>
  )
}