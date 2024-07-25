import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <section className="flex flex-col items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Master Your Money Flow.
            <strong className="font-extrabold text-secondary sm:block">
              {" "}
              Use FinTechFlow.{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Take control of your finances and achieve financial freedom with our
            intuitive expense tracker.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-secondary px-12 py-3 text-sm font-medium text-light shadow hover:bg-primary focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-light shadow hover:text-secondary focus:outline-none focus:ring active:text-primary sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <Image
        src={"/dashboard.png"}
        alt="dashboard-img"
        width={1000}
        height={1000}
        className="-mt-9 rounded-xl border-2"
      />
    </section>
  );
};

export default Hero;
