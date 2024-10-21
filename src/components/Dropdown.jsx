import { HiOutlineStar, HiStar } from "react-icons/hi";

const Dropdown = ({ currencies, selectedCurrency, setCurrency, favorites, toggleFavorite, label }) => {
  return (
    <div className="w-full">
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}:</label>
      <div className="relative">
        <select
          value={selectedCurrency}
          onChange={(e) => setCurrency(e.target.value)}
          className="block w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-500 bg-blue-50 text-blue-800"
        >
          {favorites.map((fav) => (
            <option key={fav} value={fav} className="bg-gray-200">
              {fav}
            </option>
          ))}
          <option disabled>──────────</option>
          {currencies
            .filter((curr) => !favorites.includes(curr))
            .map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
        </select>
        <button
          onClick={() => toggleFavorite(selectedCurrency)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {favorites.includes(selectedCurrency) ? <HiStar className="text-yellow-500" /> : <HiOutlineStar className="text-gray-500" />}
        </button>
      </div>
    </div>
  );
};

export default Dropdown;