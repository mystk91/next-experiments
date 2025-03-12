import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
//import Carousel from "@/app/ui/Carousel/Basic-Carousel/carousel";
import Carousel from "@/app/ui/Carousel/Carousel-Interactive-Snap/carousel";
import Card from "@/app/ui/Cards/Basic Card 1/card";

export default function Page() {
  return (
    <Carousel width="80vw" columnGap="1.2rem" scrollValue={500}>
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/boat2.png"
        alt="A large sailboat in cold arctic water."
        headline="Arctic Cruises"
        description="Embark on the adventure of a lifetime! Explore breathtaking Arctic landscapes, majestic glaciers, and diverse wildlife aboard our luxury cruises."
        button={<button>{"Learn More"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/hamburger2.png"
        alt="The Sesame Sizzle Burger"
        headline="The Sesame Sizzle"
        description={`A juicy beef patty, melted cheddar, crisp lettuce, fresh tomato, and our signature Zesty House Sauce on a toasted sesame bun. Bold flavor in every bite! A juicy beef patty, melted cheddar, crisp lettuce, fresh tomato, and our signature Zesty House Sauce on a toasted sesame bun. Bold flavor in every bite! A juicy beef patty, melted cheddar, crisp lettuce, fresh tomato, and our signature Zesty House Sauce on a toasted sesame bun. Bold flavor in every bite!`}
        button={<button>{"Add to Bag"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/laptop2.png"
        alt="An image of the Shimmerline Pro laptop against a white background."
        headline="Shimmerline Pro"
        description="Slim, powerful, and versatile. The Shimmerline Pro features a sharp display, fast performance, and all-day battery life. Perfect for work or play."
        button={<button>{"Learn More"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/candle.jpg"
        alt="A lit lavender candle next to a piece of lavender and wax crystals."
        headline="Lavender Candle"
        description="One of the best know aromatherapy scents for relaxation is lavender. That’s because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
        button={<button>{"Add to Bag"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/coffeeCup.png"
        alt="A stainless steel coffee cup filled with coffee on a stainless steel plate."
        headline="Stainless Steel Coffee Cup"
        description="You will never again have to superglue the broken handle back on your favorite coffee mug because now your favorite coffee mug will be made of indestructible, insulated stainless steel. With our insulated coffee cup, you can ensure that any coffee, cocoa, or cuppa stays hot all morning!"
        button={<button>{"Add to Bag"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/hamburger2.png"
        alt="The Sesame Sizzle Burger"
        headline="The Sesame Sizzle"
        description="A juicy beef patty, melted cheddar, crisp lettuce, fresh tomato, and our signature Zesty House Sauce on a toasted sesame bun. Bold flavor in every bite!"
        button={<button>{"Add to Bag"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/boat2.png"
        alt="A large sailboat in cold arctic water."
        headline="Arctic Cruises"
        description="Embark on the adventure of a lifetime! Explore breathtaking Arctic landscapes, majestic glaciers, and diverse wildlife aboard our luxury cruises."
        button={<button>{"Learn More"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/laptop2.png"
        alt="An image of the Shimmerline Pro laptop against a white background."
        headline="Shimmerline Pro"
        description="Slim, powerful, and versatile. The Shimmerline Pro features a sharp display, fast performance, and all-day battery life. Perfect for work or play."
        button={<button>{"Learn More"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/candle.jpg"
        alt="A lit lavender candle next to a piece of lavender and wax crystals."
        headline="Lavender Candle"
        description="One of the best know aromatherapy scents for relaxation is lavender. That’s because lavender is a scent that naturally promotes calm. So if you had a stressful day, kick off your shoes, turn on some soothing music, and light a lavender candle. The scent will help relax you, could improve your mood, and help reduce anxiety."
        button={<button>{"Add to Bag"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/coffeeCup.png"
        alt="A stainless steel coffee cup filled with coffee on a stainless steel plate."
        headline="Stainless Steel Coffee Cup"
        description="You will never again have to superglue the broken handle back on your favorite coffee mug because now your favorite coffee mug will be made of indestructible, insulated stainless steel. With our insulated coffee cup, you can ensure that any coffee, cocoa, or cuppa stays hot all morning!"
        button={<button>{"Add to Bag"}</button>}
      />
      <Card
        height="40.0rem"
        width="28.0rem"
        src="/images/cards/hamburger2.png"
        alt="The Sesame Sizzle Burger"
        headline="The Sesame Sizzle"
        description="A juicy beef patty, melted cheddar, crisp lettuce, fresh tomato, and our signature Zesty House Sauce on a toasted sesame bun. Bold flavor in every bite!"
        button={<button>{"Add to Bag"}</button>}
      />
    </Carousel>
  );
}
