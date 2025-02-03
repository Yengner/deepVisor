import React from "react";
import Image from "next/image";

const servicesData = [
  {
    title: "Website Development",
    description:
      "Transform your ideas into fully responsive and high-performance websites tailored to your business needs.",
    image: "/images/services/web-development.jpg", // Replace with your actual image path
    link: "/services/website-development",
  },
  {
    title: "Graphic Design",
    description:
      "Create stunning visuals that captivate audiences and establish a strong brand identity.",
    image: "/images/services/graphic-design.jpg", // Replace with your actual image path
    link: "/services/graphic-design",
  },
  {
    title: "App Development",
    description:
      "Design and develop scalable and engaging mobile applications to reach your audience anywhere.",
    image: "/images/services/app-development.jpg", // Replace with your actual image path
    link: "/services/app-development",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-white pt-28 px-10 lg:px-20 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-sm uppercase font-semibold tracking-wider text-blue-400">
          What We Do
        </h2>
        <a
          href="/services"
          className="text-sm uppercase font-medium text-blue-400 hover:underline"
        >
          Explore Services
        </a>
      </div>
      <h1 className="text-3xl lg:text-4xl font-bold mt-2">
        We help to build clients their dream projects
      </h1>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="bg-white text-black rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
          >
            <div className="relative h-52">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{service.description}</p>
              <a
                href={service.link}
                className="inline-flex items-center mt-4 text-blue-500 hover:text-blue-600"
              >
                View Details{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
