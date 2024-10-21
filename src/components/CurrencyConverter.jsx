import React, { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import { HiSwitchHorizontal } from "react-icons/hi";

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("CAD");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["CAD", "EUR"]
  );

  const fetchCurrencies = async () => {
    try {
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Failed to load currencies:", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const handleConversion = async () => {
    if (!amount) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
      );
      const data = await response.json();
      setResult(`${data.rates[to]} ${to}`);
    } catch (error) {
      console.error("Conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (currency) => {
    const updatedFavorites = favorites.includes(currency)
      ? favorites.filter((fav) => fav !== currency)
      : [...favorites, currency];

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const switchCurrencies = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">Currency Converter</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Dropdown
          currencies={currencies}
          selectedCurrency={from}
          setCurrency={setFrom}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          label="From"
        />
        <div className="flex items-center justify-center">
          <button onClick={switchCurrencies} className="p-2 rounded-full bg-blue-300 hover:bg-blue-400 transition">
            <HiSwitchHorizontal className="text-lg text-blue-800" />
          </button>
        </div>
        <Dropdown
          currencies={currencies}
          selectedCurrency={to}
          setCurrency={setTo}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          label="To"
        />
      </div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-800"
        placeholder="Amount"
      />
      <button
        onClick={handleConversion}
        className={`w-full mt-3 py-2 bg-blue-600 text-white rounded-md ${loading ? "animate-pulse" : ""}`}
      >
        Convert
      </button>
      {result && <p className="mt-4 text-xl text-green-600 text-center">Result: <span className="font-bold">{result}</span></p>}
    </div>
  );
};

export default CurrencyConverter;