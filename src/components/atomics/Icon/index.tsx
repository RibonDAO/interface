/* eslint-disable react/require-default-props */
import * as S from "./styles";

export type IconProps = {
  id?: string;
  name: string;
  size?: string;
  color?: string;
  backgroundColor?: string;
  hoveredBackgroundColor?: string;
  className?: string;
  withCircle?: boolean;
  onClick?: () => void;
  alt?: string;
};

function Icon({
  id,
  name,
  color,
  backgroundColor,
  hoveredBackgroundColor,
  size,
  className,
  onClick,
  withCircle,
  alt,
  ...props
}: IconProps): JSX.Element {
  return (
    <S.Icon
      id={id}
      color={color}
      backgroundColor={backgroundColor}
      hoveredBackgroundColor={hoveredBackgroundColor}
      size={size}
      {...props}
      onClick={onClick}
      className={`${className} material-symbols-rounded`}
      data-testid={`icon-${name}`}
      withCircle={withCircle}
      aria-label={alt}
    >
      {name}
    </S.Icon>
  );
}

export default Icon;
