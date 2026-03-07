const Card = ({
  srcImg,
  band,
  desc,
}: {
  srcImg: string;
  band: string;
  desc: string;
}) => {
  return (
    <>
      <section className="w-62 h-72 m-10 border-amber-50 border-4 border-solid rounded-lg">
        <section className="w-full h-48  rounded-t-lg">
          <img src={srcImg} alt="Image" />
        </section>
        <section className="w-full h-22 bg-black">
          <h1 className="text-2xl">{band}asd</h1>
          <h2 className="">{desc}asd</h2>
        </section>
      </section>
    </>
  );
};

export default Card;
