import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../actions/UserAction";

const PrivateRoute = ({isAdmin=false, Component }) => {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useSelector(state => state.userReducer);

    useEffect(() => {
        if (!user || isAuthenticated === false) {
            navigate('/login');
            return
        }
        if (isAdmin === true && user?.role !== "Admin") {
            navigate('/login');
            return
        }
    }, [navigate, isAdmin, isAuthenticated, user]);


    return <Component />
}

export default PrivateRoute;