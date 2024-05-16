import React from "react";

import IconFacebookCircled from "../../common/iconsAndSVGComponents/facebook";
import IconGithub from "../../common/iconsAndSVGComponents/github";
import IconInstagram from "../../common/iconsAndSVGComponents/instagram.svg";
import IconLinkedinCircled from "../../common/iconsAndSVGComponents/linkedin";
import IconTelegram from "../../common/iconsAndSVGComponents/telegram";
import s from "./iconsSocial.module.css";

export const IconsSocial = () => {
  return (
    <div className={s.icons}>
      <IconInstagram className={s.icon} />

      <IconGithub className={s.icon} />

      <IconLinkedinCircled className={s.icon} />

      <IconFacebookCircled className={s.icon} />

      <IconTelegram className={s.icon} />
    </div>
  );
};
