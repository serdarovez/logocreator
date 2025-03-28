import { LogoCategory } from "../types";
import Car from "./categoryLogos/Car";
import fashion from './categoryLogos/Fashion'
import foodLogos from "./categoryLogos/Food";
// Sample SVG components for each category


const logosByCategory: Record<
  LogoCategory,
  ((color: string) => any)[]
> = {
  fashion: fashion,
  car: Car,
  food: foodLogos,
};

export const getRandomLogo = (category: LogoCategory, color: string) => {
  const logos = logosByCategory[category];
  const randomIndex = Math.floor(Math.random() * logos?.length);
  return logos[randomIndex](color);
};
