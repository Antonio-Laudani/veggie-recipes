import React from "react";
//import "flowbite";
//import "../index.css"; // assicurati che tailwind sia importato
import {teamMembers} from "../data/team" //data team

export default function About() {
  return (
    <main className="pt-16 px-4 md:px-16 bg-light-background dark:bg-dark-background min-h-screen">
      {/* Sezione Mission & Vision */}
      <section className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-light-gray dark:text-white">
          About Us
        </h1>
        <p className="text-lg text-light-gray dark:text-dark-gray">
          Veggie Recipes was born out of a passion for plant-based cooking, with the aim of
providing healthy, tasty recipes that are accessible to everyone. Our mission is to
inspire people to eat better and live more sustainably.
        </p>
      </section>

      {/* Sezione Team */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-light-gray dark:text-white text-center">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-light-background dark:bg-dark-background rounded-lg shadow-md dark:shadow-dark-green-md p-6 flex flex-col items-center text-center transform transition-all duration-500 ease-out hover:shadow-lg dark:hover:shadow-dark-green-lg opacity-0 animate-fadeIn"
             style={{ animationDelay: `${idx * 200}ms`, animationFillMode: "forwards" }}
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-light-gray dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-light-gray dark:text-dark-gray italic mb-2">
                {member.role}
              </p>
              <p className="text-light-gray dark:text-dark-gray text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Sezione Valori */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-light-gray dark:text-white text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-light-background dark:bg-dark-background rounded-lg shadow-md dark:shadow-dark-green-md p-6 text-center">
            <h3 className="text-xl font-semibold text-light-gray dark:text-white mb-2">
              Sustainability
            </h3>
            <p className="text-light-gray dark:text-dark-gray text-sm">
              We promote recipes and lifestyles that respect the earth by reducing waste.
            </p>
          </div>
          <div className="bg-light-background dark:bg-dark-background rounded-lg shadow-md dark:shadow-dark-green-md p-6 text-center">
            <h3 className="text-xl font-semibold text-light-gray dark:text-white mb-2">
              Quality
            </h3>
            <p className="text-light-gray dark:text-dark-gray text-sm">
              We select fresh, authentic ingredients for our recipes.
            </p>
          </div>
          <div className="bg-light-background dark:bg-dark-background rounded-lg shadow-md dark:shadow-dark-green-md p-6 text-center">
            <h3 className="text-xl font-semibold text-light-gray dark:text-white mb-2">
              Innovation
            </h3>
            <p className="text-light-gray dark:text-dark-gray text-sm">
              We love experimenting with new flavors and creative combinations.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
