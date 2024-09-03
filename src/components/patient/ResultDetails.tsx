import { useLocation } from "react-router-dom";

const ResultDetails = () => {
  const location = useLocation();
  const { resultId, imageId } = location.state || {};

  return (
    <div>
      <h1>Result Details</h1>
      <p>Result ID: {resultId}</p>
      <p>Image ID: {imageId}</p>
    </div>
  );
};

export default ResultDetails;
