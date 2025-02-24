import React from "react";
import { MdDesignServices } from "react-icons/md";

export default function Card({
  title = "1. Sample Title",
  icon: Icon = MdDesignServices,
  text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiasrepellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiasrepellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus repellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus repellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus",
}) {
  return (
    <div className="overflow-hidden max-w-lg border-1 shadow-lg min-h-[35rem] max-h-[35rem] w-full rounded-3xl flex flex-col justify-between items-center px-8 py-8 bg-white">
      <h1 className="md:text-2xl text-xl font-medium">{title}</h1>
      <div className="py-5">
        <Icon className="lg:text-[12rem] text-7xl text-secondaryColor" />
      </div>
      <p className="text-justify text-sm lg:text-md font-normal">{text}</p>
    </div>
  );
}
