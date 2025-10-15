{
    /* Featured Brands Section */ } {
    brands.length > 0 && ( <
        div className = 'mt-16' >
        <
        h2 className = 'text-2xl font-bold mb-6' > Featured Brands < /h2> <
        div className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' > {
            brands.slice(0, 3).map((brand, index) => ( <
                Link key = {
                    index
                }
                to = {
                    `/products?brand=${brand.slug || brand.name.toLowerCase()}`
                }
                className = 'group bg-white rounded-lg border-2 border-[#dee2e6] overflow-hidden hover:border-[#E60C03] hover:shadow-lg transition-all duration-300' >
                <
                div className = 'h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8' >
                <
                img src = {
                    brand.logo
                }
                alt = {
                    brand.name
                }
                className = 'max-w-full max-h-full object-contain'
                onError = {
                    (e) => {
                        e.target.src = './Icons/banner-commercial.svg';
                    }
                }
                /> <
                /div> <
                div className = 'p-6' >
                <
                h3 className = 'text-xl font-semibold mb-2 group-hover:text-[#E60C03] transition-colors capitalize' > {
                    brand.name
                } <
                /h3> <
                p className = 'text-[#505050] mb-4' >
                Explore {
                    brand.products
                }
                quality {
                    brand.products === 1 ? 'product' : 'products'
                }
                from {
                    brand.name
                } <
                /p> <
                div className = 'flex items-center gap-2 text-[#E60C03] font-medium' >
                Shop Now <
                ChevronRight size = {
                    18
                }
                /> <
                /div> <
                /div> <
                /Link>
            ))
        } <
        /div> <
        /div>
    )
}