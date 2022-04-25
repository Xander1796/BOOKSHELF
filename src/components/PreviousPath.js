import { Link, useNavigate } from "react-router-dom";

import { BiLeftArrowAlt } from "react-icons/bi";

const PreviousPath = () => {
  let navigate = useNavigate();

  return (
    <button title="Go back" onClick={() => navigate(-1)} className="previous-path-btn">
      <BiLeftArrowAlt />
    </button>
  );
};

export default PreviousPath;
