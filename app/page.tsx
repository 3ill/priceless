import Image from 'next/image';
import Searchbar from '@/components/Searchbar';
import HeroCarousel from '@/components/HeroCarousel';
import { getAllProducts } from '@/lib/actions';
import ProductCard from '@/components/ProductCard';

const Home = async () => {
  const allProducts = await getAllProducts();
  return (
    <>
      <section className="px-6  md:px-20 py-24">
        <div className="flex max-xl:flex-col  gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text !text-[#FF7518] !font-Azeret">
              Smart Shopping Starts Here:{' '}
              <Image
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />{' '}
            </p>
            <h1 className="head-text !text-white-100  ">
              Unleash the Power of{' '}
              <span className="text-[#FF7518]">PriceLes$</span>
            </h1>
            <p className="mt-6 text-gray-200 font-satoshi">
              Empower yourself with comprehensive product and growth analytics
              through Priceless, enabling you to effortlessly optimize your
              purchases, enhance engagement, and ensure cost savings.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>

      <section className="trending-section bg-white rounded-[20px]">
        <h2 className="section-text">Trending</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16 ">
          {allProducts?.map((product, index) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
