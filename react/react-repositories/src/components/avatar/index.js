import React from "react";
import classnames from "classnames";
import "./index.css";

const prefixCls = "cr-avatar";

const Avatar = ({ className, type = 0, gender = 0, url = "", name, style = {} }) => {
  const wrapCls = classnames(prefixCls, className);
  const genderCls = classnames({
    [`${prefixCls}-man`]: gender * 1 === 0,
    [`${prefixCls}-woman`]: gender * 1 === 1,
  });
  let renderContent;
  if (url !== "") {
    renderContent = <img className={`${prefixCls}-img`} src={url} alt="" />;
  } else {
    if (type * 1 === 1) {
      renderContent = <span>{name.substring(0, 1).toUpperCase()}</span>;
    } else {
      renderContent = <img className={genderCls} src={gender === 0 ? require("./imgs/man.jpg") : require("./imgs/woman.jpg")} alt="" />;
    }
  }

  return (
    <div className={wrapCls} style={style}>
      {renderContent}
    </div>
  );
};

Avatar.displayName = "Avatar";

export default Avatar;
