import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState("");
  const [currentSlide, SetcurrentSlide] = useState(0);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://picsum.photos/v2/list?page=1&limit=10",
      );

      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  const handleNext = () => {
    if (currentSlide === images.length - 1) {
      SetcurrentSlide(0);
    } else {
      SetcurrentSlide(currentSlide + 1);
    }
  };
  const handlePrevious = () => {
    if (currentSlide === 0) {
      SetcurrentSlide(images.length - 1);
    } else {
      SetcurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  if (images.length === 0) {
    return <h2>No images found</h2>;
  }
  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-900">
      <div className="relative">
        <img
          src={images[currentSlide].download_url}
          alt={images[currentSlide].author}
          className="w-150 h-100 object-cover rounded-xl shadow-xl"
        />
        <p className="text-gray-400 mt-1">
          Image {currentSlide + 1} of {images.length}
        </p>

        <p className=" font-medium mt-3 text-gray-300 text-lg">
          Photo by: {images[currentSlide].author}
        </p>
        <div className="flex justify-center gap-3 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => SetcurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-gray-500 hover:bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-4 rounded-full transition duration-300 hover:scale-110 cursor-pointer"
        >
          <FaArrowLeft size={25} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-4 rounded-full transition duration-300 hover:scale-110 cursor-pointer"
        >
          <FaArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};
export default ImageSlider;
