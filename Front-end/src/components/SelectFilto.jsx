import React from 'react';

const Select = ({ categories, selectedCategory, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="category" className="block text-gray-700 mb-2">Filtrar por Categoria:</label>
      <select
        id="category"
        className="border px-4 py-2 rounded-lg w-full"
        value={selectedCategory}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Todas">Todas</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
