import ResumeUpload from "@/components/ResumeUpload"

import {
  SignInButton,
  UserButton
} from "@clerk/nextjs"

export default function Home() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-gray-200 text-black overflow-hidden">
<div
  className="
    fixed
    top-6
    left-6
    z-50
  "
>
  <a
    href="/dashboard"
    className="
      bg-black
      text-white
      px-5
      py-3
      rounded-xl
      shadow-xl
      hover:scale-105
      transition-all
    "
  >
    📊 Dashboard
  </a>
</div>
      {/* Top Navbar */}
      <div className="w-full flex justify-end p-6 gap-4">

        <div className="
          bg-black
          text-white
          px-6
          py-3
          rounded-2xl
          hover:scale-105
          transition
          shadow-lg
          cursor-pointer
        ">

          <SignInButton />

        </div>

        <div
          className="
            bg-white/40
            backdrop-blur-xl
            border
            border-white/30
            shadow-lg
            rounded-full
            px-4
            py-2
          "
        >

          <UserButton />

        </div>

      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-10 md:py-16 px-4 md:px-6">

        {/* Hero Content */}
        <div className="max-w-5xl">

          <div className="
  inline-block
  px-5
  py-2
  rounded-full
  bg-black
  text-white
  text-sm
  font-semibold
  mb-6
  shadow-lg
">
  AI Powered Resume Builder
</div>
            

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">

            Build{" "}

            <span className="text-black">
              ATS-Friendly
            </span>

            {" "}Resumes with AI

          </h1>

          <p className="text-base md:text-xl text-gray-600 mt-6 md:mt-8 max-w-3xl mx-auto leading-8 md:leading-9">

            Upload your resume, paste a job description,
            and instantly generate a professional,
            ATS-optimized resume powered by AI.

          </p>
          <div
  className="
    mt-8
    flex
    justify-center
    gap-4
    flex-wrap
  "
>

  <a
    href="#upload"
    className="
      bg-black
      text-white
      px-8
      py-4
      rounded-2xl
      font-semibold
      shadow-lg
      hover:scale-105
      transition
    "
  >
    🚀 Build Resume Now
  </a>

</div>

        </div>

        {/* Upload Section */}
<div
  id="upload"
  className="mt-12 md:mt-14 w-full max-w-6xl"
>
  <ResumeUpload />
        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-20 md:pb-24">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Card 1 */}
          <div
            className="
              backdrop-blur-xl
              bg-white/40
              border border-white/30
              shadow-xl
              p-6 md:p-8
              rounded-3xl
              hover:shadow-2xl
              hover:-translate-y-2
              transition
              duration-300
            "
          >

            <div className="text-4xl md:text-5xl mb-5">
              📈
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-4">
              ATS Optimization
            </h3>

            <p className="text-gray-700 leading-7 md:leading-8 text-base md:text-lg">

              Improve resume structure, keyword targeting,
              and ATS compatibility to maximize interview
              opportunities.

            </p>

          </div>

          {/* Card 2 */}
          <div
            className="
              backdrop-blur-xl
              bg-white/40
              border border-white/30
              shadow-xl
              p-6 md:p-8
              rounded-3xl
              hover:shadow-2xl
              hover:-translate-y-2
              transition
              duration-300
            "
          >

            <div className="text-4xl md:text-5xl mb-5">
              ✨
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-4">
              AI Resume Rewriting
            </h3>

            <p className="text-gray-700 leading-7 md:leading-8 text-base md:text-lg">

              Transform weak bullet points into
              achievement-driven professional content
              using advanced AI optimization.

            </p>

          </div>

          {/* Card 3 */}
          <div
            className="
              backdrop-blur-xl
              bg-white/40
              border border-white/30
              shadow-xl
              p-6 md:p-8
              rounded-3xl
              hover:shadow-2xl
              hover:-translate-y-2
              transition
              duration-300
            "
          >

            <div className="text-4xl md:text-5xl mb-5">
              📄
            </div>

            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Instant PDF Export
            </h3>

            <p className="text-gray-700 leading-7 md:leading-8 text-base md:text-lg">

              Download clean, properly formatted,
              ATS-friendly A4 resumes instantly
              with one click.

            </p>

          </div>

        </div>

      </section>

    </main>
  )
}