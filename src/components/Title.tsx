import { useCount } from "@/context/useCountContext";

const Title = ({ title }: { title: string }) => {
  const { count } = useCount();
  return (
    <div>
      {title}:{count}
    </div>
  );
};

export default Title;
