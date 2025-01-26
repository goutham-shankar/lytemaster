export default function Description({
  description,
  className = "text-center",
}) {
  return (
    <p className={`${className} text-xs lg:text-lg xl:text-2xl text-wrap`}>
      {description}
    </p>
  );
}

