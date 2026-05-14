import ResumeUpload from "@/components/ResumeUpload"

export default function Home() {

  return (

    <main className="min-h-screen bg-linear-to-br from-slate-100 via-white to-gray-200 text-black">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <div className="max-w-5xl">

          <h1 className="text-6xl font-extrabold leading-tight tracking-tight">

            Build
            {" "}

            <span className="text-black">
              ATS-Friendly
            </span>

            {" "}
            Resumes with AI

          </h1>

          <p className="text-xl text-gray-600 mt-8 max-w-3xl mx-auto leading-9">

            Upload your resume, paste a job description,
            and instantly generate a professional,
            ATS-optimized resume powered by AI.

          </p>

        </div>

        {/* Upload Section */}
        <div className="mt-14 w-full max-w-4xl">
          <ResumeUpload />
        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-8 pb-24">

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">

            <div className="text-5xl mb-5">
              📈
            </div>

            <h3 className="text-2xl font-bold mb-4">
              ATS Optimization
            </h3>

            <p className="text-gray-600 leading-8 text-lg">

              Improve resume structure, keyword targeting,
              and ATS compatibility to maximize interview
              opportunities.

            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">

            <div className="text-5xl mb-5">
              ✨
            </div>

            <h3 className="text-2xl font-bold mb-4">
              AI Resume Rewriting
            </h3>

            <p className="text-gray-600 leading-8 text-lg">

              Transform weak bullet points into
              achievement-driven professional content
              using advanced AI optimization.

            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 border border-gray-100">

            <div className="text-5xl mb-5">
              📄
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Instant PDF Export
            </h3>

            <p className="text-gray-600 leading-8 text-lg">

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