import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { fetchDoctors } from '../redux/slices/doctors';
import DoctorCard from '../components/DoctorCard';
import Loading from '../components/Loading';

const HomePage = () => {
  const { doctors, ready } = useSelector((state) => state.doctors);
  const dispatch = useDispatch();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [displayedDoctors, setDisplayedDoctors] = useState(3);

  useEffect(() => {
    if (!doctors.length) dispatch(fetchDoctors());
  }, [dispatch, doctors.length]);

  useEffect(() => {
    const handleResize = () => {
      // Adjust the number of displayed doctors based on the window width (e.g., 600px breakpoint)
      const isMobileView = window.innerWidth <= 768;
      setDisplayedDoctors(isMobileView ? 1 : 3);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Call the handleResize function initially to set the initial number of displayed doctors
    handleResize();

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!ready) return <Loading />;

  const displayDoctors = doctors?.slice(carouselIndex, carouselIndex + displayedDoctors);

  const showNext = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1 < doctors.length ? prevIndex + 1 : prevIndex));
  };

  const showPrev = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : 0));
  };

  const isLastItem = carouselIndex === doctors.length - 3;
  const isFirstItem = carouselIndex === 0;

  return (
    <div className="relative w-full">
      <div className="h-screen flex flex-col">
        <h3 className="text-center mb-24 font-bold text-xl bg-[#97af0e] p-4 text-[26px]">ALL DOCTORS</h3>
        <div className="flex flex-auto overflow-hidden w-full items-center justify-center gap-">
          {displayDoctors.map(({
            id, name,
            image,
            description,
            twitter,
            facebook,
            instagram,
          }) => (
            <DoctorCard
              key={id}
              id={id}
              name={name}
              image={image}
              description={description}
              twitter={twitter}
              facebook={facebook}
              instagram={instagram}
            />

          ))}
        </div>
      </div>
      <div className="w-full">
        <div className="absolute top-1/2">
          <button type="button" className={`w-auto  bg-[#96bf01] hover:bg-green-500 ${isFirstItem ? 'hover:bg-[#eee]' : ''} text-white rounded-r-full mt-10 py-3 pr-3 pl-10 font-bold ${isFirstItem ? 'bg-[#eee]' : ''}`} onClick={showPrev} disabled={isFirstItem}>
            <BiLeftArrow fill="white" />
          </button>
        </div>
        <div className="absolute top-1/2 right-0">
          <button type="button" className={`w-auto  bg-[#96bf01] hover:bg-green-500 ${isLastItem ? 'hover:bg-[#eee]' : ''} text-white rounded-l-full mt-10 py-3 pr-10 pl-3 font-bold ${isLastItem ? 'bg-[#eee]' : ''}`} onClick={showNext} disabled={isLastItem}>
            <BiRightArrow fill="white" />

          </button>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
