import React from "react";
import { MdDesignServices } from "react-icons/md";

export default function Card({
  title = "1. Sample Title",
  icon: Icon = MdDesignServices,
  text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiasrepellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiasrepellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus repellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus repellendus nam, voluptates earum voluptatum quod sequi itaque odioimpedit atque veniam vel autem libero provident vero consequatur qui!Similique, temporibus",
}) {
  return (
    <div className="border-1 shadow-lg min-h-[35rem] max-h-[35rem] w-full rounded-3xl flex flex-col justify-between items-center p-10 bg-white">
      <h1 className="text-2xl">{title}</h1>
      <div className="py-5">
        <Icon className="text-[12rem] text-secondaryColor" />
      </div>
      <p className="text-justify">{text}</p>
    </div>
  );
}
