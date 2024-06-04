import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import Card from '../Components/Card';
import Houses from './Houses';
import Sidebar from '../sidebar/Sidebar';
import NewsLetter from '../Components/NewsLetter';
import { SpinningCircles } from 'react-loading-icons';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    location: '',
    maxPrice: '',
    priceType: '',
    area: '',
    houseType: '',
    postingDate: ''
  });
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [currentButton, setCurrentButton] = useState("");
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchHouses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://mern-rent-here.onrender.com/all-houses');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Fetch error: ', error);
        // Optionally, set some error state here
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  // Filter houses by houseName
  const filteredItems = houses.filter(house =>
    house.houseName.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedCategory(prevFilters => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
    window.scrollTo(0, 400);
  };

  const handleClick = (event) => {
    const { name, value } = event.target;
    setSelectedCategory(prevFilters => ({ ...prevFilters, [name]: value }));
    setCurrentPage(1);
    setCurrentButton(value);
    window.scrollTo(0, 400);
  };

  // Calculate the index range
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  // Function for the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 400);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 400);
    }
  };

  const backToAll = () => {
    location.reload();
  };

  // Main function to filter data
  const filteredData = (houses, selected, query) => {
    let filteredHouses = houses;

    if (query) {
      filteredHouses = filteredItems;
    }

    if (selected.location) {
      filteredHouses = filteredHouses.filter(house => house.location.toLowerCase() === selected.location.toLowerCase());
    }

    if (selected.priceType) {
      filteredHouses = filteredHouses.filter(house => house.priceType.toLowerCase() === selected.priceType.toLowerCase());
    }

    if (selected.maxPrice) {
      filteredHouses = filteredHouses.filter(house => parseInt(house.maxPrice) <= parseInt(selected.maxPrice));
    }

    if (selected.postingDate) {
      filteredHouses = filteredHouses.filter(house => house.postingDate >= selected.postingDate);
    }

    if (selected.houseType) {
      filteredHouses = filteredHouses.filter(house => house.houseType.toLowerCase() === selected.houseType.toLowerCase());
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredHouses = filteredHouses.slice(startIndex, endIndex);

    return filteredHouses.map((data, i) => <Card key={i} data={data} />);
  };

  const result = filteredData(houses, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        {/* left side */}
        <div className='bg-white p-4 rounded'>
          <Sidebar currentButton={currentButton} handleChange={handleChange} handleClick={handleClick} />
        </div>
        {/* center */}
        <div className='col-span-2 bg-white p-4 rounded'>
          {isLoading ? (
            <SpinningCircles />
          ) : result.length > 0 ? (
            <Houses length={houses.length} result={result} />
          ) : (
            <>
              <h3 className='text-lg font-bold mb-2'>{result.length} Houses</h3>
              <p>No data found!</p>
            </>
          )}

          {/* page */}
          {result.length > 0 ? (
            <div className='flex justify-center mt-4 space-x-8'>
              <button onClick={previousPage} disabled={currentPage === 1} className='hover:underline'>
                Previous
              </button>
              <span className='mx-2'>
                Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
              </span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage) || result.length < itemsPerPage} className='hover:underline'>
                Next
              </button>
            </div>
          ) : (
            <div className='flex justify-center mt-5 hover:underline'>
              <button onClick={backToAll}>Back</button>
            </div>
          )}
        </div>
        {/* right side */}
        <div className='bg-white p-4 rounded'>
          <NewsLetter />
        </div>
      </div>
    </div>
  );
};

export default Home;
