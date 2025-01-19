import PropTypes from "prop-types";

export default function MainTitle({ longTitle, beforeTitle, afterTitle }) {
  return (
    <div className="f-center">
      <picture>
        <source
          srcSet="src/assets/images/icon/icon-infinite-sm.svg"
          media="(max-width: 575.98px)"
        />
        <img
          src="src/assets/images/icon/icon-infinite.svg"
          alt="icon-infinite"
        />
      </picture>
      {!longTitle ? (
        <h2 className="fs-4 fs-lg-1 text-brand-03 text-center ms-3 ms-lg-4">
          {beforeTitle}
        </h2>
      ) : (
        <h2 className="fs-4 fs-lg-1 text-brand-03 text-center ms-3 ms-lg-4">
          <span className="d-block d-xl-inline">{beforeTitle}</span>
          <span className="d-block d-xl-inline mt-1 mt-lg-0">{afterTitle}</span>
        </h2>
      )}

      <picture>
        <source
          srcSet="src/assets/images/icon/icon-infinite-sm.svg"
          media="(max-width: 575.98px)"
        />
        <img
          src="src/assets/images/icon/icon-infinite.svg"
          alt="icon-infinite"
          className="ms-3 ms-lg-4"
        />
      </picture>
    </div>
  );
}

MainTitle.propTypes = {
  longTitle: PropTypes.bool,
  beforeTitle: PropTypes.string.isRequired,
  afterTitle: PropTypes.string,
};
