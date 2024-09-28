type RateBarType = {
  rating: number;
  handleRating?: (value: number) => void;
};

function RateBar({ rating, handleRating }: RateBarType) {
  const arrayRating = [1, 2, 3, 4, 5];

  return (
    <div className="ps-4 d-flex">
      {arrayRating.map((rat) => (
        <div
          key={rat}
          data-rating={rat} // Usar data-attribute para o valor do rating
          className="rating-area ms-2"
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
