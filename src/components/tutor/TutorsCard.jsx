import PropTypes from "prop-types";

import TutorCard from "./TutorCard";

export default function TutorsCard({ tutorList, cardsNum }) {
  return (
    <ul
      className={`${
        cardsNum === 3
          ? "row row-cols-lg-3 row-cols-md-2 row-cols-1 g-4"
          : "row row-cols-lg-2 g-lg-4 d-none d-lg-flex"
      }`}
    >
      {tutorList.map((tutor) => (
        <li className="tutor-card col" key={tutor.id}>
          <TutorCard tutor={tutor} />
        </li>
      ))}
    </ul>
  );
}
TutorsCard.propTypes = {
  tutorList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slogan: PropTypes.string,
      expertise: PropTypes.string,
      rating: PropTypes.string.isRequired,
      hourly_rate: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        avatar_url: PropTypes.string,
      }),
    })
  ).isRequired,
  cardsNum: PropTypes.oneOf([2, 3]),
};
