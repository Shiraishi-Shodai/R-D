import React from "react";
<<<<<<< HEAD

const Header = () => {
  return <header>Header</header>;
=======
import style from "@/app/components/layouts/Header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.items}>
        <Image
          src="https://via.placeholder.com/150/92c952"
          alt="logo"
          width={50}
          height={50}
        />

        <button>お気に入り</button>
        <button>カート</button>

        <div>
          アカウント
          <Image
            src="https://via.placeholder.com/150/92c952"
            alt="logo"
            width={50}
            height={50}
          />
        </div>
      </div>
    </header>
  );
>>>>>>> develop
};

export default Header;
