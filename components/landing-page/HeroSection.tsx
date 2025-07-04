import SearchBar from "../shared/SearchBar";

const HeroSection = () => {
  return (
    <section className="relative h-[530px] flex items-center justify-center ">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1194405278/photo/traditional-round-houses-in-an-african-village.jpg?s=612x612&w=0&k=20&c=0-Y9W3jmgCQe9CMYTm-4IKWCr1kSLRCXklfUnyK90c4=')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Find Your Dream Home in Ethiopia
        </h1>

        <SearchBar
          className="w-[500px] bg-white"
          inputClassName="h-14 text-black"
        />
      </div>
    </section>
  );
};

export default HeroSection;
