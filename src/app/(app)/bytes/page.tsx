import Image from "next/image";

const BytesPage = () => {
  return (
    <div>
      <Image
        src={"/assets/images/Openzo coming soon poster.png"}
        alt="Openzo coming soon poster"
        layout="fill"
        className="mx-auto max-w-lg"
      />
    </div>
  );
};

export default BytesPage;
