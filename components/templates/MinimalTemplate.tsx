type ResumeProps = {
  data: any
}

export default function MinimalTemplate({
  data
}: ResumeProps) {

  return (

    <div
      id="resume-template"
      className="bg-white text-black mx-auto p-12"
      style={{
        width: "210mm",
        minHeight: "297mm"
      }}
    >

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-5xl font-light">
          {data.name}
        </h1>

        <p className="text-xl text-gray-500 mt-2">
          {data.title}
        </p>

        <div className="mt-4 text-sm text-gray-600 space-y-1">

          <p>{data.email}</p>

          <p>{data.phone}</p>

          <p>{data.location}</p>

          <p>{data.linkedin}</p>

        </div>

      </div>

      {/* Summary */}
      <section className="mb-8">

        <h2 className="text-xl font-semibold border-b pb-2 mb-3">
          Summary
        </h2>

        <p className="leading-7 text-gray-700">
          {data.summary}
        </p>

      </section>

      {/* Experience */}
      <section className="mb-8">

        <h2 className="text-xl font-semibold border-b pb-2 mb-5">
          Experience
        </h2>

        {
          data.experience?.map((job: any, index: number) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between">

                <div>

                  <h3 className="font-semibold text-lg">
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

              <ul className="list-disc ml-5 mt-3 space-y-2">

                {
                  job.points?.map(
                    (point: string, i: number) => (

                      <li key={i}>
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

      {/* Skills */}
      <section>

        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
          Skills
        </h2>

        <p className="leading-8">
          {data.skills?.join(" • ")}
        </p>

      </section>

    </div>

  )
}