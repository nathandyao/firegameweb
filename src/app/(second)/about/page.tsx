import Link from 'next/link'
import Image from 'next/image'

export default function About() {
    return(
      <>
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
        <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                <header className="mb-4 lg:mb-6 not-format">

                    <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">About</h1>
                </header>
                <p>In this game, you play as a house owner trying to prevent your house from catching fire. You spawn inside your backyard and want to find every probable fire hazard in the vicinity. This game seeks to inform the public about important activities you can preform on your brown house to significantly reduce the chance of it catching on fire.</p>
              </article>
        </div>

      </main>
      </>
    );
  }
  