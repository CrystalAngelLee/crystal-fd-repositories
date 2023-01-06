import { FC } from "react";
import classnames from "classnames";
import "./index.scss";

type nameProps = "time" |'useravatar';

interface IconProps {
  name?: nameProps;
  className?: string;
}

const Icon: FC<IconProps> = ({ name, className }) => {
  return <i className={classnames(`icon icon-${name}`, className)} />;
};

export default Icon;
