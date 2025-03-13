import SingleLoading from "@/_components/loadings/SingleLoading";

export default function BlogContent({
  isLoading,
  title,
  body,
}: {
  isLoading: boolean;
  title: string;
  body: string;
}) {
  return (
    <div className="w-full lg:w-auto mt-5 lg:mt-0">
      {isLoading ? (
        <>
          <SingleLoading className="lg:w-[70vw] h-10" />
          <SingleLoading className="lg:w-[70vw] h-4 md:h-5 mt-5 lg:mt-10" />
          <SingleLoading className="lg:w-[70vw] h-4 md:h-5 mt-1 md:mt-3" />
          <SingleLoading className="lg:w-[70vw] h-4 md:h-5 mt-1 md:mt-3 " />
        </>
      ) : (
        <>
          <h2 className="font-bold text-xl lg:text-4xl">{title}</h2>
          <p className="mt-5 lg:mt-10 text-sm lg:text-base text-justify">
            {body}
          </p>
        </>
      )}
    </div>
  );
}
