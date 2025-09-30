import React from "react";
import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatName = (value) =>
    value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Filter out segments that look like IDs
  const isId = (value) => {
    // Check if it's a number or looks like a UUID/ObjectId
    return /^[0-9]+$/.test(value) || /^[a-f0-9]{24}$/i.test(value) || /^[0-9a-f-]{36}$/i.test(value);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-[#8B96A5] inter">
      <Link
        to="/"
        className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
      >
        Home
      </Link>

      {pathnames.map((value, index) => {
        // Skip if it looks like an ID
        if (isId(value)) return null;

        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={to}>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-sm lg:text-lg text-black">
                {formatName(value)}
              </span>
            ) : (
              <Link
                to={to}
                className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
              >
                {formatName(value)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}