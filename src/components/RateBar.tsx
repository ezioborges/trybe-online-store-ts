import { RateBarType } from "../types";
import "../styles/rate-bar.css";

function RateBar({ rating, handleRating }: RateBarType) {
  const arrayRating = [1, 2, 3, 4, 5];

  return (
    <div className="d-flex ms-3">
      {arrayRating.map((rat) => (
        <div
          key={rat}
          data-rating={rat} // Usar data-attribute para o valor do rating
          className="rating-area"
          style={{
            backgroundColor: rat <= rating ? "gold" : "gray",
          }}
          onClick={() => handleRating && handleRating(rat)}
        />
      ))}
    </div>
  );
}

export default RateBar;
