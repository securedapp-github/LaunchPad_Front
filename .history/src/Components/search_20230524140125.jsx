import React, { useState } from 'react';
import "../Style/search.css" // Import the CSS file for styling

const New = ({onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');

  const cardsData = [
    {
      id: 1,
      title: 'Card 1',
      description: 'This is the description of Card 1.',
      image: 'https://www.xrtoday.com/wp-content/uploads/2022/10/What_Web3_Going_2023.jpg',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description of Card 2.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
    {
      id: 3,
      title: 'Card 3',
      description: 'This is the description of Card 3.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
    {
      id: 4,
      title: 'Card 4',
      description: 'This is the description of Card 4.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
    {
      id: 5,
  title: 'Card 5',
      description: 'This is the description of Card 5.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
    {
      id: 6,
      title: 'Card 6',
      description: 'This is the description of Card 6.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },

    {
      id: 7,
      title: 'Card 7',
      description: 'This is the description of Card 7.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
    {
      id: 8,
      title: 'Card 8',
      description: 'This is the description of Card 8.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
    {
      id: 9,
      title: 'Card 9',
      description: 'This is the description of Card 9.',
      image: 'https://img.freepik.com/free-photo/man-wearing-smart-glasses-touching-virtual-screen-futuristic-technology-digital-remix_53876-104247.jpg?w=1060&t=st=1684480900~exp=1684481500~hmac=05c88ea1045f51f201781dacfc383e36c3a314f3f37358e39e619cd2e59d91ca',
    },
  ];


  // Filter the cards based on the filterBy value

  const handleFilterChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const filteredCards = cardsData.filter((card) =>
    card.title.toLowerCase().includes(filterBy.toLowerCase())
  );

  const searchedCards = filteredCards.filter((card) =>
    card.title.toLowerCase().includes(search.toLowerCase()) ||
    card.description.toLowerCase().includes(search.toLowerCase())
  );


  return (
    
      <div className="search">
        <input
          type="text" placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
      <div className="filter">
        <select
          value={filterBy}
          onChange={(e) => setFilterBy(e.target.value)}
        >
          <option value="">Filter By</option>
          <option value="Card 1">Card 1</option>
          <option value="Card 2">Card 2</option>
          <option value="Card 3">Card 3</option>
          <option value="Card 4">Card 4</option>
          <option value="Card 5">Card 5</option>
          <option value="Card 6">Card 6</option>
          <option value="Card 7">Card 7</option>
          <option value="Card 8">Card 8</option>
          <option value="Card 9">Card 9</option>
        </select>
        </div>

        <div className="card-container">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}

        {searchedCards.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
    
  );
};

const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="progress-bar-container">
        <span className="progress-text">Progress:</span>
          <progress className="progress-bar" value="50" max="100"></progress>
        <span className="value-text">5.073ETH</span>
        </div>
        <div className="box-container">
          <div className="box box-1">
            <span className="box-text">Softcap</span>
          </div>
          <div className="box box-2">
            <span className="box-text">Hardcap</span>
          </div>
          <div className="box box-3">
            <span className="box-text">Liquidity</span>
          </div>
        </div>
      </div>
    </div>
  );
};    
export default New;
