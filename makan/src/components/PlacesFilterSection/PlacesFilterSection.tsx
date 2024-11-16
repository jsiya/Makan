import { useState, useEffect } from 'react';
import { Radio, Select, Slider } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { FaSearch } from 'react-icons/fa';
import './PlacesFilterSection.css';
import axios from 'axios';

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const PlacesFilterSection: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [entertainmentTypes, setEntertainmentTypes] = useState([]);

  const [category, setCategory] = useState<string | null>(null);
  const [entertainmentType, setEntertainmentType] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const categoriesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/place_categories`);
        setCategories(categoriesResponse.data.data);
        
        const entertainmentTypesResponse = await axios.get(`${import.meta.env.VITE_API_URL}/entertainment_types`);
        setEntertainmentTypes(entertainmentTypesResponse.data.data);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchOptions();
  }, []);

  const handleSearch = () => {
    const filters = {
      category,
      entertainmentType,
      priceRange,
      rating,
    };
    onFilterChange(filters);
  };

  return (
    <div className="side-filter-sec">
      <Select
        size="large"
        showSearch
        placeholder="Place Category"
        style={{ width: '100%' }}
        onChange={(value) => setCategory(value)}
        options={categories.map((cat: any) => ({ value: cat.id, label: cat.name }))}
      />
      <Select
        size="large"
        showSearch
        placeholder="Entertainment Type"
        style={{ width: '100%' }}
        onChange={(value) => setEntertainmentType(value)}
        options={entertainmentTypes.map((type: any) => ({ value: type.id, label: type.name }))}
      />
      <Slider
        style={{ width: '80%' }}
        range
        defaultValue={[0, 50000]}
        max={50000}
        onChange={(value) => setPriceRange(value as [number, number])}
      />
      <div>
        <Radio.Group
          className="filter-rate-sec"
          onChange={(e) => setRating(e.target.value)}
        >
          <Radio value={5}>
            {[...Array(5)].map((_, i) => (
              <StarFilled key={i} style={{ color: '#F7931E' }} />
            ))}
          </Radio>
          <Radio value={4}>
            {[...Array(4)].map((_, i) => (
              <StarFilled key={i} style={{ color: '#F7931E' }} />
            ))}
            <StarOutlined style={{ color: '#F7931E' }} />
          </Radio>
          <Radio value={3}>
            {[...Array(3)].map((_, i) => (
              <StarFilled key={i} style={{ color: '#F7931E' }} />
            ))}
            <StarOutlined style={{ color: '#F7931E' }} />
            <StarOutlined style={{ color: '#F7931E' }} />
          </Radio>
          <Radio value={2}>
            {[...Array(2)].map((_, i) => (
              <StarFilled key={i} style={{ color: '#F7931E' }} />
            ))}
            <StarOutlined style={{ color: '#F7931E' }} />
            <StarOutlined style={{ color: '#F7931E' }} />
            <StarOutlined style={{ color: '#F7931E' }} />
          </Radio>
          <Radio value={1}>
            {[...Array(1)].map((_, i) => (
              <StarFilled key={i} style={{ color: '#F7931E' }} />
            ))}
            <StarOutlined style={{ color: '#F7931E' }} />
            <StarOutlined style={{ color: '#F7931E' }} />
            <StarOutlined style={{ color: '#F7931E' }} />
            <StarOutlined style={{ color: '#F7931E' }} />
          </Radio>
        </Radio.Group>
      </div>
      <button type="button" className="submit-button" onClick={handleSearch}>
        <FaSearch /> Search
      </button>
    </div>
  );
};

export default PlacesFilterSection;
