import { Link } from 'react-router-dom';
import './topbar.css'
import { useContext } from "react";
import { Context } from "../../context/Context";

const Topbar = () => {

    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:8080/images/"

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' })
    }

    return (
        <div className="top">
            <div className="topLeft">
                <i className="topIcon fab fa-facebook"></i>
                <i className="topIcon fab fa-twitter"></i>
                <i className="topIcon fab fa-instagram"></i>
                <i className="topIcon fab fa-pinterest"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className="link" to="/">Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/">About</Link>
                    </li>
                    <li className="topListItem">
                        <Link className="link" to="/write">Write</Link>
                    </li>
                   
                    <li className="topListItem" onClick={handleLogout}>
                        {user && 'Logout'}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {
                    user
                        ? (
                            <Link to='/setting'>
                                <img src={PF + user.profilePic}
                                    alt=""
                                    className="topImg" />
                            </Link>
                        )

                        : (
                            <ul className="topList">
                                <li className="topListItem">
                                    <Link className="link" to="/login">Login</Link>
                                </li>
                                <li className="topListItem">
                                    <Link className="link" to="/register">Register</Link>
                                </li>

                            </ul>

                        )
                }

                <i className="topSearch fas fa-search"></i>
            </div>
        </div>
    );
}

export default Topbar;
