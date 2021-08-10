import { useEffect, useState } from 'react';
import axios from 'axios'
import './sidebar.css'
import { Link } from 'react-router-dom';

export default function Sidebar() {

    const [cats, setCats] = useState([]);

    useEffect(()  => {
        const getCats = async () => {
            const res = await axios.get('/category');
            setCats(res.data)
        }
        getCats()
    }, [cats])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://i.pinimg.com/originals/ac/4b/25/ac4b258a0b571e0ceae80df0799c5cc6.png"
                    alt=""
                    className="sidebarImg"
                />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quo ipsum est odit iure aperiam nihil nam, repellat vel
                    assumenda quasi recusandae amet molestiae modi earum,
                    repudiandae sit, ut unde architecto.
                </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORY</span>
                <ul className="sidebarList">

                    {
                        cats.map((c, index) => (

                            <Link to={`/?cat=${c.name}`} className="link" key={index}>
                                <li className="sidebarListItem" >
                                    {c.name}
                                </li>
                            </Link>

                        ))
                    }


                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW ME</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fab fa-facebook"></i>
                    <i className="sidebarIcon fab fa-twitter"></i>
                    <i className="sidebarIcon fab fa-instagram"></i>
                    <i className="sidebarIcon fab fa-pinterest"></i>
                </div>

            </div>

        </div>
    )
}
