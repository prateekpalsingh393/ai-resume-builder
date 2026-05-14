type ResumeProps = {
  data: any
}

export default function ResumeTemplate({
  data
}: ResumeProps) {

  return (

  <div
  id="resume-template"
  className="bg-white text-black mx-auto shadow-xl p-12"
  style={{
    width: "210mm",
    minHeight: "297mm"
  }}
>

      {/* Header */}
      <div className="border-b pb-5 mb-6">

        <h1 className="text-4xl font-bold uppercase tracking-wide">
          {data.name}
        </h1>

        <p className="text-gray-600 mt-2 text-lg">
  {data.title}
</p>

<div className="mt-4 text-gray-700 space-y-1 text-sm">

  {
    data.email && (
      <p>
        📧 {data.email}
      </p>
    )
  }

  {
    data.phone && (
      <p>
        📱 {data.phone}
      </p>
    )
  }

  {
    data.location && (
      <p>
        📍 {data.location}
      </p>
    )
  }

  {
    data.linkedin && (
      <p>
        🔗 {data.linkedin}
      </p>
    )
  }

</div>

      </div>

      {/* ATS Score */}
      <section className="mb-8">

        <div className="bg-green-100 text-green-800 px-5 py-3 rounded-xl inline-block font-semibold">
          ATS Score: {data.atsScore}/100
        </div>

      </section>

      {/* Summary */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Professional Summary
        </h2>

        <p className="text-gray-700 leading-7">
          {data.summary}
        </p>

      </section>

      {/* Experience */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Work Experience
        </h2>

        {
          data.experience?.map((job: any, index: number) => (

            <div
              key={index}
              className="mb-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-semibold">
                    {job.role}
                  </h3>

                  <p className="text-gray-600">
                    {job.company}
                  </p>

                </div>

                <p className="text-sm text-gray-500">
                  {job.duration}
                </p>

              </div>

              <ul className="list-disc ml-6 mt-3 space-y-2">

                {
                  job.points?.map(
                    (point: string, i: number) => (

                      <li
                        key={i}
                        className="text-gray-700"
                      >
                        {point}
                      </li>

                    )
                  )
                }

              </ul>

            </div>

          ))
        }

      </section>

      {/* Education */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Education
        </h2>

        {
          data.education?.map((edu: any, index: number) => (

            <div
              key={index}
              className="mb-4"
            >

              <h3 className="font-semibold text-lg">
                {edu.degree}
              </h3>

              <p className="text-gray-600">
                {edu.college}
              </p>

              <p className="text-sm text-gray-500">
                {edu.year}
              </p>

            </div>

          ))
        }

      </section>

      {/* Skills */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Skills
        </h2>

        <div className="flex flex-wrap gap-3">

          {
            data.skills?.map(
              (skill: string, index: number) => (

                <span
                  key={index}
                  className="bg-gray-200 px-4 py-2 rounded-full text-sm"
                >
                  {skill}
                </span>

              )
            )
          }

        </div>

      </section>

      {/* Certifications */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Certifications
        </h2>

        <ul className="list-disc ml-6 space-y-2">

          {
            data.certifications?.map(
              (cert: string, index: number) => (

                <li key={index}>
                  {cert}
                </li>

              )
            )
          }

        </ul>

      </section>

      {/* Strengths */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Strengths
        </h2>

        <ul className="list-disc ml-6 space-y-2">

          {
            data.strengths?.map(
              (item: string, index: number) => (

                <li key={index}>
                  {item}
                </li>

              )
            )
          }

        </ul>

      </section>

      {/* Weaknesses */}
      <section className="mb-8">

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Areas to Improve
        </h2>

        <ul className="list-disc ml-6 space-y-2">

          {
            data.weaknesses?.map(
              (item: string, index: number) => (

                <li key={index}>
                  {item}
                </li>

              )
            )
          }

        </ul>

      </section>

      {/* Missing Keywords */}
      <section>

        <h2 className="text-2xl font-bold border-b pb-2 mb-4">
          Missing Keywords
        </h2>

        <div className="flex flex-wrap gap-3">

          {
            data.missingKeywords?.map(
              (keyword: string, index: number) => (

                <span
                  key={index}
                  className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm"
                >
                  {keyword}
                </span>

              )
            )
          }

        </div>

      </section>

    </div>
  )
}