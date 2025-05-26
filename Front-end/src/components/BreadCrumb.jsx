import { Link } from "react-router";
import { FiChevronRight, FiHome } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext"; 

const Breadcrumb = ({ items, currentPage }) => {
  const { isDarkMode } = useTheme();  

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/dashboard"
            className={`hover:text-gray-700 transition-colors ${
              isDarkMode ? "text-darkText hover:text-darkTitle" : "text-gray-500"
            }`}
          >
            <FiHome size={25} />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item) => (
          <li key={item.path} className="flex items-center">
            <FiChevronRight
              className={`h-5 w-5 ${
                isDarkMode ? "text-darkText" : "text-gray-400"
              }`}
            />
            <Link
              to={item.path}
              className={`ml-2 text-sm font-medium transition-colors ${
                isDarkMode
                  ? "text-darkText hover:text-darkTitle"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}

        <li className="flex items-center">
          <FiChevronRight
            className={`h-5 w-5 ${
              isDarkMode ? "text-darkText" : "text-gray-400"
            }`}
          />
          <span
            className={`ml-2 text-sm font-medium ${
              isDarkMode ? "text-darkText" : "text-gray-700"
            }`}
          >
            {currentPage}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;