import Link from "next/link";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname(); // Get the current pathname
  const pathSegments = pathname.split("/").filter(Boolean); // Split and filter empty parts

  // Helper to construct the URL for each breadcrumb link
  const constructUrl = (segments: string[], index: number) => {
    return "/" + segments.slice(0, index + 1).join("/");
  };

  return (
    <div className="flex items-center space-x-2 text-gray-700 font-medium bg-gray-100 px-4 py-2 rounded-md">
      {/* Breadcrumb Links */}
      {pathSegments.map((segment, index) => {
        // Capitalize the segment
        const capitalizedSegment =
          segment.charAt(0).toUpperCase() + segment.slice(1);

        return (
          <div key={index} className="flex items-center space-x-2">
            <Link href={constructUrl(pathSegments, index)} passHref>
              <span className="cursor-pointer hover:underline capitalize">
                {capitalizedSegment}
              </span>
            </Link>
            {/* Add a separator unless it's the last segment */}
            {index < pathSegments.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </div>
        );
      })}
      {/* Dropdown Icon */}
      <button>
        <ChevronDownIcon className="w-4 h-4 ml-2 text-gray-700" />
      </button>
    </div>
  );
};

export default Breadcrumb;
