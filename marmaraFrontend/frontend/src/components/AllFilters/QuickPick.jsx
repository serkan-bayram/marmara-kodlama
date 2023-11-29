import SubHeading from "./SubHeading";
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export function Option({ text, searchParams, setSearchParams, name }) {
  const param = searchParams.get("quickSort");

  const handleClick = () => {
    // Zaten seçilmiş, o yüzden style ını silip sort u kaldırıyoruz
    if (param === name) {
      setSearchParams((prevValue) => {
        prevValue.set("quickSort", "");
        prevValue.set("isApply", "");
        return prevValue;
      });
    } else {
      setSearchParams((prevValue) => {
        prevValue.set("quickSort", name);
        prevValue.set("isApply", "");
        return prevValue;
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${
        name === param ? "bg-picked" : "bg-darkPrimary"
      } py-2 px-4 rounded-sm relative text-neutral`}
    >
      {text}
      {name === param && (
        <img
          className="w-5 h-5 absolute -top-2 -right-2"
          src="/images/picked.png"
        />
      )}
    </button>
  );
}

export default function QuickPick() {
  // Default is lastMonth
  const [searchParams, setSearchParams] = useSearchParams({
    quickSort: "",
  });

  const options = [
    { name: "lastMonth", text: "Son 1 Ay" },
    { name: "lastWeek", text: "Son 1 Hafta" },
    { name: "lastDay", text: "Bugün" },
  ];

  return (
    <div>
      <SubHeading text="Hızlı Seçim" />
      <div className="flex justify-between flex-col gap-3">
        {options.map((option) => {
          return (
            <Option
              key={uuidv4()}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              name={option.name}
              text={option.text}
            />
          );
        })}
      </div>
    </div>
  );
}
