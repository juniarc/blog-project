import Image from "next/image";
import HeroImage from "@/../public/images/hero.png";

export default function HeroSection() {
  return (
    <section className="w-full flex lg:items-center lg:gap-10 mt-8 lg:mt-10">
      <div>
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          Explore & Share.
        </h1>
        <p className="mt-4 text-sm md:text-base text-justify lg:max-w-3/4">
          Your go-to platform for insightful articles, fresh perspectives, and
          engaging discussions. Whether you&apos;re here to read, write, or
          share your thoughts, there&apos;s always something new to discover.
        </p>
      </div>
      <div className="hidden lg:block w-1/3 min-w-1/3">
        <Image
          className="size-full object-top object-cover"
          src={HeroImage}
          alt="Hero Image"
          priority
        />
      </div>
    </section>
  );
}
