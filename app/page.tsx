import ResumeUpload from "@/components/ResumeUpload"

export default function Home() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-gray-200 text-black overflow-hidden">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 md:py-24 px-4 md:px-6">

        <div className="max-w-5xl">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">

            Build
            {" "}

            <span className="text-black">
              ATS-Friendly
            </span>

            {" "}
            Resumes with AI

          </h1>

          <p className="text-base md:text-xl text-gray-600 mt-6 md:mt-8 max-w-3xl mx-auto leading-8 md:leading-9">

            Upload your resume, paste a job description,
            and instantly generate a professional,
            ATS-optimized resume powered by AI.

          </p>

        </div>

        {/* Upload Section */}
        <div className="mt-12 md:mt-14 w-full max-w-4xl">
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