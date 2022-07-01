const Hero = ({ title }) => {
  return (
    <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10  max-w-7xl mx-auto">
      <img className="hidden md:inline-flex h-32 lg:h-full" src="" alt="" />
      <div className="px-10 space-y-5  text-right">
        <h1 className="text-6xl max-w-xl font-serif">{title}</h1>
        <h2>
          اكتشف التكتيكات والأخبار والتغريدات لأفضل كتاب كرة القدم في العالم
          العربي
        </h2>
      </div>
    </div>
  );
};

export default Hero;
