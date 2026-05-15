type ResumeProps = {
  data: any
}

export default function CorporateTemplate({
  data
}: ResumeProps) {

  return (

    <div
      id="resume-template"
      className="
        bg-white
        text-black
        mx-auto
        shadow-2xl
        overflow-hidden
      "
      style={{
        width: "210mm",
        minHeight: "297mm",
        maxWidth: "100%"
      }}
    >

      <div className="grid grid-cols-12">

        {/* LEFT SIDEBAR */}
        <div className="col-span-4 bg-blue-950 text-white p-8">

          {/* Name */}
          <h1 className="text-3xl font-bold leading-tight">
            {data.name}
          </h1>

          <p className="text-blue-200 mt-3">
            {data.title}
          </p>

          {/* Contact */}
          <div className="mt-10">

            <h2 className="text-lg font-semibold border-b border-blue-700 pb-2 mb-4">
              Contact
            </h2>

            <div className="space-y-3 text-sm text-blue-100">

              <p>{data.email}</p>

              <p>{data.phone}</p>

              <p>{data.location}</p>

              <p>{data.linkedin}</p>

            </div>

          </div>

          {/* Skills */}
          <div className="mt-10">

            <h2 className="text-lg font-semibold border-b border-blue-700 pb-2 mb-4">
              Skills
            </h2>

            <div className="flex flex-wrap gap-2">

              {
                data.skills?.map(
                  (
                    skill: string,
                    index: number
                  ) => (

                    <span
                      key={index}
                      className="
                        bg-blue-800
                        px-3
                        py-1
                        rounded-full
                        text-xs
                      "
                    >
                      {skill}
                    </span>

                  )
                )
              }

            </div>

          </div>

          {/* Certifications */}
          <div className="mt-10">

            <h2 className="text-lg font-semibold border-b border-blue-700 pb-2 mb-4">
              Certifications
            </h2>

            <ul className="space-y-3 text-sm text-blue-100">

              {
                data.certifications?.map(
                  (
                    cert: string,
                    index: number
                  ) => (

                    <li key={index}>
                      • {cert}
                    </li>

                  )
                )
              }

            </ul>

          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div className="col-span-8 p-10">

          {/* Summary */}
          <section className="mb-10">

            <h2 className="
              text-2xl
              font-bold
              text-blue-950
              border-b
              border-gray-300
              pb-2
              mb-4
            ">
              Professional Summary
            </h2>

            <p className="leading-8 text-gray-700">
              {data.summary}
            </p>

          </section>

          {/* Experience */}
          <section className="mb-10">

            <h2 className="
              text-2xl
              font-bold
              text-blue-950
              border-b
              border-gray-300
              pb-2
              mb-6
            ">
              Work Experience
            </h2>

            {
              data.experience?.map(
                (
                  job: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="mb-8"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="text-xl font-semibold">
                          {job.role}
                        </h3>

                        <p className="text-blue-900 font-medium">
                          {job.company}
                        </p>

                      </div>

                      <p className="text-sm text-gray-500">
                        {job.duration}
                      </p>

                    </div>

                    <ul className="list-disc ml-6 mt-4 space-y-2">

                      {
                        job.points?.map(
                          (
                            point: string,
                            i: number
                          ) => (

                            <li
                              key={i}
                              className="text-gray-700 leading-7"
                            >
                              {point}
                            </li>

                          )
                        )
                      }

                    </ul>

                  </div>

                )
              )
            }

          </section>

          {/* Education */}
          <section>

            <h2 className="
              text-2xl
              font-bold
              text-blue-950
              border-b
              border-gray-300
              pb-2
              mb-5
            ">
              Education
            </h2>

            {
              data.education?.map(
                (
                  edu: any,
                  index: number
                ) => (

                  <div
                    key={index}
                    className="mb-4"
                  >

                    <h3 className="font-semibold text-lg">
                      {edu.degree}
                    </h3>

                    <p className="text-gray-700">
                      {edu.college}
                    </p>

                    <p className="text-sm text-gray-500">
                      {edu.year}
                    </p>

                  </div>

                )
              )
            }

          </section>

        </div>

      </div>

    </div>

  )
}