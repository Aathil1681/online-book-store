import { useCount } from "@/context/useCountContext";

const Navbar = () => {
  const { count } = useCount();
  return <div className="justify-center items-center">Navbar:{count}</div>;
};

export default Navbar;
