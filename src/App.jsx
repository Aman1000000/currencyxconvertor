import CurrencyConverter from "./components/CurrencyConverter";

const App = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <CurrencyConverter />
      </div>
    </div>
  );
};

export default App;
