import React from "react";
import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatName = (value) =>
    value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <nav className="flex items-center space-x-2 text-sm text-[#8B96A5] inter">
      {/* Home link always visible */}
      <Link
        to="/"
        className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
      >
        Home
      </Link>

      {pathnames.map((value, index) => {
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
