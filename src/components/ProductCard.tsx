import { ProcutsCardType } from "../types";

function ProductCard({ title, img, price }: ProcutsCardType) {
    return (
        <div className="border p-3 rounded">
            <p>{title}</p>
            <img src={img} alt={`foto do produto ${title}`} />
            <p>{price}</p>
        </div>
    );
 }

export default ProductCard;
