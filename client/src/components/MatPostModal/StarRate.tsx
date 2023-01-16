import SvgIcon from "@mui/material/SvgIcon";

interface IProps {
  key: number;
  size: string;
  onClick?: () => void;
  className: string;
}

const StarRate = (props: IProps) => {
  return (
    <SvgIcon {...props}>
      <path d="M14.43 10 12 2l-2.43 8H2l6.18 4.41L5.83 22 12 17.31 18.18 22l-2.35-7.59L22 10z" />
    </SvgIcon>
  );
};

export default StarRate;
