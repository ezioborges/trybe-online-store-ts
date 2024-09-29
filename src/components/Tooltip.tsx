import { OverlayTrigger, Tooltip } from "react-bootstrap";

type TooltipType = {
  id: string;
  children: React.ReactNode;
  title: string;
};

function ProductsTitleTooltip({ id, children, title }: TooltipType) {
    return (
        <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip> } placement="right">
            <span>{children}</span>
        </OverlayTrigger>
    ); 
}

export default ProductsTitleTooltip;
