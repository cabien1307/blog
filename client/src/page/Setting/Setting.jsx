import './setting.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Setting() {

    const { user, dispatch } = useContext(Context)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState("");

    const [success, setSuccess] = useState(false);

    const PF = "http://localhost:8080/images/"

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_START'})
        const updatedUser = {
            userId: user._id,
            username,
            password,
            email

        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append('name', filename)
            data.append('file', file)
            updatedUser.profilePic = filename

            try {
                await axios.post('/upload', data)
            } catch (error) {

            }
        }

        try {
            const res = await axios.put('/users/' + user._id, updatedUser)
            setSuccess(true)
            dispatch({type: 'UPDATE_SUCCESS', payload: res.data})

        } catch (error) {
            dispatch({type: 'UPDATE_FAILURE'})
        }

    }

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your account</span>
                    <span className="settingsDeleteTitle">Delete account</span>
                </div>

                <form className="settingsForm" onSubmit={handleSubmit}>

                    <div className="settingsPP">
                        <img src={ file ? URL.createObjectURL(file) : PF + user.profilePic}
                            alt=""
                        />
                        <label htmlFor="fileInput">
                            <i className="far fa-user-circle settingsPPIcon"></i>
                        </label>
                    </div>

                    <input type="file" hidden id="fileInput" onChange={e => setFile(e.target.files[0])} />

                    <label>Username</label>
                    <input
                        type="text"
                        defaultValue={user.username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        defaultValue={user.email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                        required
                    />

                    <button className="settingsSubmit" type="submit">Update</button>

                    {success && <span style={{ color: "green", textAlign: "center", marginTop: "20px" }}>Profile has been updated ...!</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
