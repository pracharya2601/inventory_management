
const ProductRow = ({ item }) => {
  return (
    <tr>
      <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
          </div>
          <div className="ml-3">
            <p className=" whitespace-no-wrap">
              {item.name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
        <p className=" whitespace-no-wrap">100</p>
      </td>
      <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
        <p className=" whitespace-no-wrap">Red</p>
      </td>
      <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-100 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
          ></span>
          <span className="relative">Small</span>
        </span>
      </td>
      <td className="px-5 py-3 border-b border-gray-700 dark:border-gray-200 text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-green-100 leading-tight">
          <span
            aria-hidden
            className="absolute inset-0 bg-green-500 opacity-50 rounded-full"
          ></span>
          <span className="relative">Small</span>
        </span>
      </td>
    </tr>
  )
}

export default ProductRow;
