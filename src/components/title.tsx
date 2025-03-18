export function Title({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-light to-white">
        {title}
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto">{description}</p>
    </>
  );
}
