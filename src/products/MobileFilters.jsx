import React, { useEffect, useState } from 'react';
import { SlidersHorizontal, Filter, X, ChevronUp,ChevronDown } from 'lucide-react';


export function MobileFilterButtons() {
  const [isSort, setIsSort] = useState(false)
  const [isFilter, setIsFilter] = useState(false)

  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brand: true,
    features: true,
    category: true,
    priceRange: true,
    condition: false
  });

  const [selectedBrands, setSelectedBrands] = useState(['Samsung', 'Apple', 'Pocco']);
  const [selectedFeatures, setSelectedFeatures] = useState(['Samsung', 'Apple', 'Pocco']);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedMetallic, setSelectedMetallic] = useState(true);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  useEffect(() => {
    if (isFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = ""; // cleanup
    };
  }, [isFilter]);

  const toggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const FilterSection = ({ title, isExpanded, onToggle, children }) => (
    <div className="border-b border-gray-200">
      <button 
        onClick={onToggle}
        className="w-full px-4 py-4 flex justify-between items-center text-left"
      >
        <span className="text-lg font-medium text-gray-900">{title}</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isExpanded && (
        <div className="px-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );

  const CheckboxItem = ({ label, checked, onChange }) => (
    <label className="flex items-center py-2 cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
          checked ? 'bg-red-500 border-red-500' : 'border-gray-300'
        }`}>
          {checked && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      <span className="ml-3 text-gray-700">{label}</span>
    </label>
  );
  return (
    <>
       <div className={`fixed inset-0 bg-white z-50 flex flex-col  ${isFilter ? 'block' : 'hidden' }`}>
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-xl font-medium text-gray-900">Filters</h1>
        <button onClick={() => {setIsFilter(false)}} className="p-1">
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Price Range Slider */}
        <FilterSection
          title="Price"
          isExpanded={expandedSections.price}
          onToggle={() => toggleSection('price')}
        >
          <div className="py-4">
            <div className="relative mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-red-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>45₼</span>
                <span>870₼</span>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Brand */}
        <FilterSection
          title="Brand"
          isExpanded={expandedSections.brand}
          onToggle={() => toggleSection('brand')}
        >
          <div className="space-y-1">
            <CheckboxItem 
              label="Samsung" 
              checked={selectedBrands.includes('Samsung')} 
              onChange={() => toggleBrand('Samsung')}
            />
            <CheckboxItem 
              label="Apple" 
              checked={selectedBrands.includes('Apple')} 
              onChange={() => toggleBrand('Apple')}
            />
            <CheckboxItem 
              label="Huawei" 
              checked={selectedBrands.includes('Huawei')} 
              onChange={() => toggleBrand('Huawei')}
            />
            <CheckboxItem 
              label="Pocco" 
              checked={selectedBrands.includes('Pocco')} 
              onChange={() => toggleBrand('Pocco')}
            />
            <CheckboxItem 
              label="Lenovo" 
              checked={selectedBrands.includes('Lenovo')} 
              onChange={() => toggleBrand('Lenovo')}
            />
            <button className="text-red-500 text-sm mt-2">See all</button>
          </div>
        </FilterSection>

        {/* Features */}
        <FilterSection
          title="Features"
          isExpanded={expandedSections.features}
          onToggle={() => toggleSection('features')}
        >
          <div className="space-y-1">
            <CheckboxItem 
              label="Samsung" 
              checked={selectedFeatures.includes('Samsung')} 
              onChange={() => toggleFeature('Samsung')}
            />
            <CheckboxItem 
              label="Apple" 
              checked={selectedFeatures.includes('Apple')} 
              onChange={() => toggleFeature('Apple')}
            />
            <CheckboxItem 
              label="Huawei" 
              checked={selectedFeatures.includes('Huawei')} 
              onChange={() => toggleFeature('Huawei')}
            />
            <CheckboxItem 
              label="Pocco" 
              checked={selectedFeatures.includes('Pocco')} 
              onChange={() => toggleFeature('Pocco')}
            />
            <CheckboxItem 
              label="Lenovo" 
              checked={selectedFeatures.includes('Lenovo')} 
              onChange={() => toggleFeature('Lenovo')}
            />
          </div>
        </FilterSection>

        {/* Category */}
        <FilterSection
          title="Category"
          isExpanded={expandedSections.category}
          onToggle={() => toggleSection('category')}
        >
          <div className="space-y-1">
            <CheckboxItem 
              label="Mobile accessory" 
              checked={selectedCategories.includes('Mobile accessory')} 
              onChange={() => toggleCategory('Mobile accessory')}
            />
            <CheckboxItem 
              label="Electronics" 
              checked={selectedCategories.includes('Electronics')} 
              onChange={() => toggleCategory('Electronics')}
            />
            <CheckboxItem 
              label="Smartphones" 
              checked={selectedCategories.includes('Smartphones')} 
              onChange={() => toggleCategory('Smartphones')}
            />
            <CheckboxItem 
              label="Modern tech" 
              checked={selectedCategories.includes('Modern tech')} 
              onChange={() => toggleCategory('Modern tech')}
            />
            <button className="text-red-500 text-sm mt-2">See all</button>
          </div>
        </FilterSection>

        {/* Additional Features */}
        <FilterSection
          title="Features"
          isExpanded={expandedSections.features}
          onToggle={() => toggleSection('features')}
        >
          <div className="space-y-1">
            <CheckboxItem 
              label="Metallic" 
              checked={selectedMetallic} 
              onChange={() => setSelectedMetallic(!selectedMetallic)}
            />
            <CheckboxItem 
              label="Plastic cover" 
              checked={false} 
              onChange={() => {}}
            />
            <CheckboxItem 
              label="8GB Ram" 
              checked={false} 
              onChange={() => {}}
            />
            <CheckboxItem 
              label="Super power" 
              checked={false} 
              onChange={() => {}}
            />
            <CheckboxItem 
              label="Large Memory" 
              checked={false} 
              onChange={() => {}}
            />
            <button className="text-red-500 text-sm mt-2">See all</button>
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection
          title="Price range"
          isExpanded={expandedSections.priceRange}
          onToggle={() => toggleSection('priceRange')}
        >
          <div className="py-4">
            <div className="relative mb-6">
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-red-500 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>45₼</span>
                <span>870₼</span>
              </div>
            </div>
          </div>
        </FilterSection>

        {/* Condition */}
        <FilterSection
          title="Condition"
          isExpanded={expandedSections.condition}
          onToggle={() => toggleSection('condition')}
        >
          <div className="space-y-1">
            <CheckboxItem 
              label="New" 
              checked={selectedConditions.includes('New')} 
              onChange={() => toggleCategory('New')}
            />
            <CheckboxItem 
              label="Used" 
              checked={selectedConditions.includes('Used')} 
              onChange={() => toggleCategory('Used')}
            />
            <CheckboxItem 
              label="Refurbished" 
              checked={selectedConditions.includes('Refurbished')} 
              onChange={() => toggleCategory('Refurbished')}
            />
          </div>
        </FilterSection>
      </div>

      {/* Footer Buttons */}
      <div className="p-4 border-t border-gray-200 flex gap-3">
        <button className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium">
          Clear
        </button>
        <button className="flex-1 py-3 px-4 bg-red-500 text-white rounded-lg font-medium">
          Show
        </button>
      </div>
    </div>
      <div className="flex gap-2 mb-4 lg:hidden relative">
        {/* Container with fixed dimensions to prevent layout shift */}
        <div className="flex gap-2 w-full">
          {/* Sorting button/panel */}
          <div className="flex-1 min-w-0">
      <button
        onClick={() => setIsSort(!isSort)}
        className={` ${isSort && 'rounded-b-none border-b-0 ' }
          flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white
          hover:bg-gray-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) w-full
        `}
      >
        <SlidersHorizontal className="w-4 h-4 flex-shrink-0" />
        <span className='whitepsace-nowrap'>Sorting</span>
      </button>
      
      {/* Sorting dropdown panel */}
      <div 
        className={`
          overflow-hidden transition-all duration-500 rounded-b-lg cubic-bezier(0.4, 0, 0.2, 1)
          ${isSort ? "max-h-80 opacity-100 " : "max-h-0 opacity-0"}
        `}
      >
        <div className="border border-gray-300 border-t-0 rounded-b-lg bg-white shadow-lg">

          
          <div className="py-2 rounded-b-lg">
            {[
              'Popular',
              'Newest', 
              'Oldest',
              'Price (from highest)',
              'Price (from lowest)'
            ].map((option, index) => (
              <button
                key={option}
                className="w-full text-start px-4 py-2 hover:bg-gray-50  transition-colors duration-200"
                onClick={() => {
                  // Handle sorting option selection
                  console.log('Selected:', option);
                  setIsSort(false); // Close dropdown after selection
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
          </div>

          {/* Filtering button */}
          <button
            onClick={() => setIsFilter(true)}
            className={`
              flex items-center justify-center gap-2  rounded-md bg-gray-900 text-white hover:bg-gray-800
              transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) overflow-hidden min-w-0
              ${(isSort)
                ? "flex-shrink-[999] w-0 p-0 opacity-0" 
                : "flex-1 opacity-100"
              }
            `}
          >
            <Filter className={`w-4 h-4 flex-shrink-0 transition-opacity duration-300 ${(isSort) ? "opacity-0" : "opacity-100"}`} />
            <span className={`whitespace-nowrap transition-opacity duration-300 ${(isSort) ? "opacity-0" : "opacity-100"}`}>
              Filtering
            </span>
          </button>
        </div>
      </div>
    </>

  );
}