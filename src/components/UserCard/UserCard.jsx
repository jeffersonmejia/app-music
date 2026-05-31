import "./UserCard.css";
import default_avatar from "../../assets/default_avatar.png";

import PropTypes from "prop-types";
import { useState } from "react";

export const UserCard = ({ name, age, url, isActive = true }) => {
  const [showAge, setShowAge] = useState(false);
  const [showCard, setShowCard] = useState(!isActive);

  return (
    <>
      <figure>
        {!showCard ? (
          <>
            <img src={url === undefined ? default_avatar : url} alt="" />
            <figcaption>
              <h5>I'm {name}.</h5>
              {showAge ? <h6>I am {age} years old.</h6> : <></>}
              {age === undefined ? (
                <></>
              ) : (
                <small>I am {age >= 18 ? "an adult" : "a minor"}</small>
              )}
            </figcaption>
            <small className="active">Active</small>
            <button
              onClick={() => {
                setShowAge(!showAge);
              }}
            >
              {showAge ? "show" : "hidde"} age
            </button>
          </>
        ) : (
          <></>
        )}
        <button
          onClick={() => {
            setShowCard(!showCard);
          }}
        >
          {showCard ? "show" : "hidde"} card
        </button>
      </figure>
    </>
  );
};

UserCard.PropTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.number.isRequired,
  age: PropTypes.number,
  isActive: PropTypes.boolean,
};

//nombre y url como campos obligatorios, y edad y activo como opcionales (este último con valor por defecto true)
