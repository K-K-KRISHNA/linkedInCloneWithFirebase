import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

interface IProps {
  text: string;
  Icon: React.ReactElement;
}

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "1px 3px 16px -6px rgba(6, 6, 6, 1)",
    fontSize: "14px",
    transition: "2s",
    padding: "10px",
    borderRadius: "10px",
  },
}));

const ModalToolTip = ({ text, Icon }: IProps) => {
  return (
    <LightTooltip title={text} placement="top">
      {Icon}
    </LightTooltip>
  );
};

export default ModalToolTip;
