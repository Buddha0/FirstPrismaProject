import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>

            <div className="navbar bg-base-100 border-2 border-b-[#cacbd8]  ">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <Link to  = "/register"><li><a>Register</a></li></Link>
                       <Link to = "/login"><li><a>Login</a></li></Link> 
                        <li>
                            <details>
                                <summary>
                                    Parent
                                </summary>
                                <ul className="p-2 bg-base-100">
                                    <li><a>Link 1</a></li>
                                    <li><a>Link 2</a></li>
                                </ul>
                            </details>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}