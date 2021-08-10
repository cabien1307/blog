import './header.css'

export default function Header() {
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitleSm">React & node</span>
                <span className="headerTitleLg">Blog</span>
            </div>

            <img src="https://i.pinimg.com/originals/ac/4b/25/ac4b258a0b571e0ceae80df0799c5cc6.png"
                alt=""
                className="headerImg"
            />
        </div>
    )
}
