import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { translateDynamicField } from "../i18n";

export function Breadcrumb({ productData = null }) {
  const { i18n } = useTranslation();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  
  // Dynamic translation states
  const [translatedProductData, setTranslatedProductData] = useState(null);

  const formatName = (value) =>
    value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const isId = (value) =>
    /^[0-9]+$/.test(value) ||
    /^[a-f0-9]{24}$/i.test(value) ||
    /^[0-9a-f-]{36}$/i.test(value);

  // Dynamic translation effect
  useEffect(() => {
    async function translateProductData() {
      if (!productData) return;
      
      const targetLang = i18n.language;
      if (targetLang === 'en') {
        const translated = { ...productData };
        
        if (productData.name) {
          translated.name = await translateDynamicField(productData.name, targetLang);
        }
        if (productData.parentCategoryName) {
          translated.parentCategoryName = await translateDynamicField(productData.parentCategoryName, targetLang);
        }
        if (productData.subCategoryName) {
          translated.subCategoryName = await translateDynamicField(productData.subCategoryName, targetLang);
        }
        if (productData.categoryName) {
          translated.categoryName = await translateDynamicField(productData.categoryName, targetLang);
        }
        
        setTranslatedProductData(translated);
      } else {
        setTranslatedProductData(productData);
      }
    }
    translateProductData();
  }, [i18n.language, productData]);

  // ✅ include "details" so breadcrumb works for your product detail page
  const isProductPage =
    pathnames.includes("product") ||
    pathnames.includes("products") ||
    pathnames.includes("details");

  // ✅ Product breadcrumb (Home > Category > Subcategory > Product Name)
  if (isProductPage && productData) {
    const currentProductData = translatedProductData || productData;
    return (
      <nav className="flex items-center space-x-2 text-sm text-[#8B96A5] inter">
        <Link
          to="/"
          className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
        >
          Home
        </Link>

        {/* Parent Category */}
        {currentProductData.parentCategoryName && (
          <>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link
              to={`/categories/${currentProductData.parentCategorySlug
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
            >
              {currentProductData.parentCategoryName}
            </Link>
          </>
        )}

        {/* Sub Category */}
        {currentProductData.subCategoryName && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                to={`/products/${currentProductData.categorySlug
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
              >
                {currentProductData.subCategoryName}
              </Link>
            </>
          )}

        {currentProductData.categoryName &&
          currentProductData.categoryName !== currentProductData.subCategoryName &&
          currentProductData.categoryName !== currentProductData.parentCategoryName && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link
                to={`/category/${currentProductData.categoryName
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="hover:text-gray-900 transition-colors text-sm lg:text-lg"
              >
                {currentProductData.categoryName}
              </Link>
            </>
          )}

        {/* Product Name */}
        <ChevronRight className="w-4 h-4 text-gray-400" />
        <span className="font-medium text-sm lg:text-lg text-black">
          {currentProductData.name}
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
        if (isId(value) || value == "categories") return null;

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
