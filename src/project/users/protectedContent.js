import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedContent({ children }) {
  const { currentUser } = useSelector((state) => state.usersReducer);
  if (currentUser) {
    return children;
  }
  return <Navigate to="/project/signin"/>;
}

export default ProtectedContent;
