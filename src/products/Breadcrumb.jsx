import React from "react";
import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ productData = null }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const formatName = (value) =>
    value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isId = (value) =>
    /^[0-9]+$/.test(value) ||
    /^[a-f0-9]{24}$/i.test(value) ||
    /^[0-9a-f-]{36}$/i.test(value);

  // ✅ include "details" so breadcrumb works for your product detail page
  const isProductPage =
    pathnames.includes("product") ||
    pathnames.includes("products") ||
    pathnames.includes("details");

  // ✅ Product breadcrumb (Home > Category > Subcategory > Product Name)
  if (isProductPage && productData) {
    return (
      <nav className="flex items-center space-x-2 text-sm text-[#8B96A5] inter">
        <Link
          to="/"
          className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
        >
          Home
        </Link>

        {/* Parent Category */}
        {productData.parentCategoryName && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/${productData.parentCategorySlug
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
            >
              {productData.parentCategoryName}
            </Link>
          </>
        )}

        {/* Sub Category */}
        {productData.subCategoryName && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                to={`/products/${productData.categorySlug
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
              >
                {productData.subCategoryName}
              </Link>
            </>
          )}

        {productData.categoryName &&
          productData.categoryName !== productData.subCategoryName &&
          productData.categoryName !== productData.parentCategoryName && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                to={`/category/${productData.categoryName
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
              >
                {productData.categoryName}
              </Link>
            </>
          )}

        {/* Product Name */}
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-sm lg:text-lg text-black">
          {productData.name}
        </span>
      </nav>
    );
  }

  // ✅ Default breadcrumb (for About, Contact, etc.)
  return (
    <nav className="flex items-center space-x-2 text-sm text-[#8B96A5] inter">
      <Link
        to="/"
        className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
      >
        Home
      </Link>

      {pathnames.map((value, index) => {
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
