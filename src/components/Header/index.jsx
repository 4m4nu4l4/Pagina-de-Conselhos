import "./styles.css"
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <div id="header">
            <div>
                <Link to="/">
                    <p id="title">Conselhos</p>
                </Link>
            </div>
            <div>
                <div id="header-pages">
                    <Link to="/about">
                        <p>páginas</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}