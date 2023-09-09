import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Heading() {
  return (
    <div className="w-full flex justify-center items-center  ">
      <h1 className="text-4xl font-bold">İlanlar</h1>
    </div>
  );
}

function TagsHeading({ show, setShow }) {
  const handleClick = () => {
    setShow(false);
  };

  return (
    <div className="text-gray-500 flex w-full justify-between pb-2 pr-2">
      <p>Etiketler</p>
      {show && (
        <button onClick={handleClick} className="font-bold text-accent ">
          Gizle
        </button>
      )}
    </div>
  );
}

function ShowMoreButton({ show, setShow }) {
  const handleClick = () => {
    setShow(true);
  };

  return (
    !show && (
      <button
        className="bottom-2 right-0 left-0 m-auto w-6 h-6 
  flex items-center justify-center bg-white
   absolute rounded-full"
        onClick={handleClick}
      >
        <img
          className="w-4 aspect-square"
          src="./images/down-arrow.png"
          alt="down arrow"
        />
      </button>
    )
  );
}

function Tag({ text }) {
  // Bu tagları seçtiğimizde servere istek atıcaz
  // ve ona göre ilanları listelicez ama
  // hızlı bi şekilde basıp kaldırma durumlarında
  // UI sıkıntıları çıkacak gibi o yüzden
  // bu videonun bi yerinde bunu nasıl engelleyeceğimiz
  // vardı oraya gelince bakarız
  // https://www.youtube.com/watch?v=-yIsQPp31L0
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <button
      className={`${
        selected ? "bg-accent" : "bg-black"
      } first:bg-accent py-1 px-3 rounded-sm font-semibold transition-all ease-in-out  text-neutral`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

function Tags() {
  const tags = [
    {
      text: "Tüm İlanlar",
    },
    {
      text: "Akbil",
    },
    {
      text: "Maltepe",
    },
    {
      text: "Para",
    },
    {
      text: "Elektronik",
    },
    {
      text: "Kadıköy",
    },
    {
      text: "Cüzdan",
    },
    {
      text: "Kitap",
    },
    {
      text: "Otomobil",
    },
    {
      text: "Ev Eşyaları",
    },
    {
      text: "Bilgisayar",
    },
    {
      text: "Spor",
    },
    {
      text: "Kıyafet",
    },
    {
      text: "Müzik",
    },
    {
      text: "Mobilya",
    },
    {
      text: "Ofis Malzemeleri",
    },
    {
      text: "Bahçe",
    },
    {
      text: "Yemek",
    },
    {
      text: "Eğitim",
    },
    {
      text: "Sağlık",
    },
    {
      text: "Seyahat",
    },
    {
      text: "Hobi",
    },
    {
      text: "Sanat",
    },
    {
      text: "Telefon",
    },
    {
      text: "Film",
    },
    {
      text: "Mücevher",
    },
    {
      text: "Kamera",
    },
    {
      text: "Saat",
    },
  ];

  return (
    <div className="flex flex-wrap gap-3 ">
      {tags.map((tag) => {
        return <Tag key={uuidv4()} text={tag.text} />;
      })}
    </div>
  );
}

function ShowMoreGradient({ show }) {
  return (
    !show && (
      <div className="bg-gradient-to-t opacity-20 rounded-sm from-black absolute w-full h-full bottom-0"></div>
    )
  );
}

function TagsContainer({ show, children }) {
  return (
    <div
      className={`${
        show ? "h-auto" : "h-24"
      } overflow-y-hidden relative transition-all duration-[2000ms]`}
    >
      {children}
    </div>
  );
}

function HamburgerMenu({ showMenu, setShowMenu }) {
  const handleClick = () => {
    setShowMenu((prevValue) => {
      return !prevValue;
    });
  };

  return (
    <button
      className={`z-50 absolute top-5 right-5 
      before:my-1 before:block before:w-8 before:h-1 before:rounded-md before:bg-black
      after:my-1 after:block after:w-8 after:h-1 after:rounded-md after:bg-black
      before:transition-all after:transition-all
      ${
        showMenu && " before:rotate-45 after:-rotate-45 before:translate-y-2 "
      }`}
      onClick={handleClick}
    >
      {!showMenu && <div className="w-8 h-1 rounded-md bg-black"></div>}
    </button>
  );
}

function HamburgerMenuContent({ showMenu }) {
  return (
    <div
      className={`${showMenu ? "translate-x-0" : "translate-x-full"} 
           z-40 top-0 right-0 fixed w-screen shadow-md shadow-black 
           transition-all duration-300
       h-screen bg-neutral `}
    >
      <p>Hello world</p>
    </div>
  );
}

function Feed() {
  // Bu show olayına biraz transition eklenecek
  const [show, setShow] = useState(false);
  // Tags kısmını hamburger menü ye eklesek
  // daha mantıklı olabilir gibi çok item olursa hoş durmayacak

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full pt-8 ">
      <HamburgerMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      <HamburgerMenuContent showMenu={showMenu} />
      <Heading />
      <div className="px-3 pt-3">
        <TagsHeading show={show} setShow={setShow} />
        <TagsContainer show={show}>
          <ShowMoreGradient show={show} />
          <ShowMoreButton show={show} setShow={setShow} />
          <Tags />
        </TagsContainer>
      </div>
    </div>
  );
}

export default Feed;
