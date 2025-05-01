"use client";
import { useCount } from "@/context/useCountContext";
import Title from "./Title";

const Card = () => {
  const { count, setCount } = useCount();
  return (
    <section>
      <div className=" border-lg p-5 rounded-2xl bg-pink-100 shadow-xl/30">
        <div className="flex items-center justify-between">
          <Title title="Card Title" />
        </div>

        <p className="mt-5 text-xs text-shadow-2xs">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae sunt
          doloremque autem odio. Voluptates, dicta ex! Accusamus est maxime
          reiciendis perspiciatis rerum sed impedit hic, cupiditate laborum cum
          quisquam harum.
        </p>
        <div className="mt-10 flex flex-row items-center justify-center gap-5">
          <button
            onClick={() => setCount((pv) => pv - 1)}
            className="border rounded-3xl border-rose-400 p-2 hover:bg-pink-700"
          >
            -
          </button>
          <p>Count:{count}</p>
          <button
            onClick={() => setCount((pv) => pv + 1)}
            className="border rounded-3xl border-rose-400 p-2 hover:bg-pink-700"
          >
            +
          </button>
        </div>
      </div>
    </section>
  );
};

export default Card;
