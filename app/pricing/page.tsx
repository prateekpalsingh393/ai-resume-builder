export default function PricingPage() {

  return (

    <main
      className="
        min-h-screen
        bg-gradient-to-br
        from-slate-100
        via-white
        to-gray-200
        py-20
        px-6
      "
    >

      <div className="max-w-6xl mx-auto">

        <h1
          className="
            text-5xl
            font-extrabold
            text-center
            mb-6
          "
        >
          Pricing Plans
        </h1>

        <p
          className="
            text-center
            text-gray-600
            text-xl
            mb-16
          "
        >
          Choose the perfect plan
          for your AI career growth
        </p>

        <div
          className="
            grid
            md:grid-cols-2
            gap-10
          "
        >

          {/* FREE PLAN */}
          <div
            className="
              bg-white/40
              backdrop-blur-xl
              border
              border-white/30
              rounded-3xl
              shadow-2xl
              p-10
            "
          >

            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >
              Free
            </h2>

            <div
              className="
                text-5xl
                font-extrabold
                mb-8
              "
            >
              ₹0
            </div>

            <ul
              className="
                space-y-4
                text-lg
                text-gray-700
                mb-10
              "
            >

              <li>✅ 3 Resume Generations</li>
              <li>✅ ATS Optimization</li>
              <li>✅ Basic Templates</li>

            </ul>

            <button
              className="
                w-full
                bg-black
                text-white
                py-4
                rounded-2xl
                font-semibold
                text-lg
              "
            >
              Current Plan
            </button>

          </div>

          {/* PRO PLAN */}
          <div
            className="
              bg-gradient-to-br
              from-indigo-600
              to-purple-700
              text-white
              rounded-3xl
              shadow-2xl
              p-10
              relative
              overflow-hidden
            "
          >

            <div
              className="
                absolute
                top-4
                right-4
                bg-white
                text-indigo-700
                px-4
                py-1
                rounded-full
                text-sm
                font-bold
              "
            >
              MOST POPULAR
            </div>

            <h2
              className="
                text-3xl
                font-bold
                mb-4
              "
            >
              Pro
            </h2>

            <div
              className="
                text-5xl
                font-extrabold
                mb-8
              "
            >
              ₹299
              <span className="text-xl">
                /month
              </span>
            </div>

            <ul
              className="
                space-y-4
                text-lg
                mb-10
              "
            >

              <li>✅ Unlimited Resumes</li>
              <li>✅ AI Cover Letters</li>
              <li>✅ Interview Prep</li>
              <li>✅ Premium Templates</li>
              <li>✅ Resume Sharing</li>

            </ul>

            <button
              className="
                w-full
                bg-white
                text-indigo-700
                py-4
                rounded-2xl
                font-bold
                text-lg
                hover:scale-105
                transition
              "
            >
              Upgrade to Pro
            </button>

          </div>

        </div>

      </div>

    </main>
  )
}