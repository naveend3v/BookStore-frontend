import { Link } from "react-router-dom";

export default function Header() {

    return (
        <div className="Header bg-dark">
            <nav className="navbar navbar-dark fixed-top w-100 navbar-expand-md bg-dark px-5">
                <div className="container-xxl">

                    <a className="navbar-brand  fs-2 fw-bold text-light" href="books">
                        <span>
                            GoodReads
                        </span>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div id="main-nav" className="collapse navbar-collapse align-center">
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                                <Link className="nav-link text-light" to="/admin/add-book">
                                    Add New Book
                                </Link>
                            </li>
                            <li className="nav-item fs-5">
                                <Link className="nav-link text-light" to="/admin/login">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}