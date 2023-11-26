import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { offerInformation } from "../../../data/offer";
import {
  MdDiscount,
  MdLiving,
  MdKitchen,
  MdKingBed,
  MdBathroom,
  MdOutlineWifi,
  MdAirportShuttle,
  MdOutlineStar,
  MdOutlineStarHalf,
} from "react-icons/md";
import "./detail-offer.scss";

export const DetailOffers = () => {
  const { location } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState({ image: null });
  const [previewImage, setPreviewImage] = useState();

  const offerByParams = () => {
    const filterOffer = offerInformation.find(
      (item) => item.location === location,
    );
    if (filterOffer) {
      setOffer(filterOffer);
    }
  };

  useEffect(() => {
    offerByParams();
  }, []);

  useEffect(() => {
    if (offer && Array.isArray(offer.imgSrc) && offer.imgSrc.length > 0) {
      setPreviewImage({ image: offer.imgSrc[0] });
    } else {
      setPreviewImage({ image: null });
    }
  }, [offer]);

  const isRatingStars = (num) => {
    const stars = [];
    const fullStars = Math.floor(num);
    const hasHalfStar = num % 1 !== 0;

    for (let i = 1; i <= fullStars; i++) {
      stars.push("full");
    }

    if (hasHalfStar) {
      stars.push("half");
    }

    const remaining = 5 - stars.length; // Assuming 5 stars in total
    for (let i = 1; i <= remaining; i++) {
      stars.push("empty");
    }

    return stars;
  };

  return (
    <>
      <div className="detail-offer-container">
        <div className="offer-headline">
          <span>Dwidaya Tour</span>
          <div className="button-action">
            <button
              type="button"
              className="button"
              onClick={() => {
                navigate("/dwidaya");
              }}
            >
              Home
            </button>
          </div>
        </div>
        <div className="offer-location">
          <h1>{location} Building</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".25rem",
            }}
          >
            <MdDiscount />
            <span>for rent</span>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="offer-content">
        {/* 1 */}
        <div className="content">
          <img src={previewImage?.image} alt="offer-pic" />
        </div>

        {/* 2 */}
        <div className="content">
          <span
            style={{
              textDecoration: "line-through",
              color: "gray",
              opacity: "50%",
            }}
          >
            Rp. {offer.beforeDiscount}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5rem",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "28px", fontWeight: "400" }}>
              Rp. {offer.price}
            </span>
            <span style={{ color: "#FF7A00", fontSize: "16px" }}>
              {offer.discount}% off
            </span>
          </div>
          <div className="offer-detail">
            <div>
              <MdLiving fontSize={24} />
              <span>{offer?.facilities?.livingroom}</span>
            </div>
            <div>
              <MdKitchen fontSize={24} />
              <span>{offer?.facilities?.kitchen}</span>
            </div>
            <div>
              <MdKingBed fontSize={24} />
              <span>{offer?.facilities?.bed}</span>
            </div>
            <div>
              <MdBathroom fontSize={20} />
              <span>{offer?.facilities?.bath}</span>
            </div>
            <div>
              <MdOutlineWifi fontSize={20} />
              <span>{offer?.facilities?.bath}</span>
            </div>
            <div>
              <MdAirportShuttle fontSize={20} />
              <span>{offer?.facilities?.shuttel}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="image-preview">
        {offer?.imgSrc?.map((item) => (
          <img
            key={item}
            src={item}
            alt="pic-preview"
            onClick={() => {
              setPreviewImage({ image: item });
            }}
          />
        ))}
      </div>
      <div className="offer-rate-container">
        <div className="offer-rate">
          <span>Rate for this place</span>
          <div className="offer-star">
            {isRatingStars(4.5).map((item, index) => {
              if (item === "full") {
                return (
                  <div key={index}>
                    <MdOutlineStar fontSize={24} color={"#FF7A00"} />
                  </div>
                );
              } else if (item === "half") {
                return (
                  <div key={index}>
                    <MdOutlineStarHalf fontSize={24} color={"#FF7A00"} />
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <button
          type="button"
          className="button"
          onClick={() => {
            navigate(`/dwidaya/order/${location}`);
          }}
        >
          Order
        </button>
      </div>
    </>
  );
};
