import { ActivityIcon, HeartIcon, HomeIcon, InfoIcon, SettingsIcon, UserIcon, Stethoscope, Contact, Earth  } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

export const Navbar = ({ isOpen, toggleNav }) => {
    const location = useLocation()

    return (
        <nav
            className={`fixed left-0 top-0 h-full bg-indigo-900 text-white shadow-xl transition-all duration-300 ${isOpen ? "w-64" : "w-20"
                } z-50`}
        >
            <div className="flex justify-between items-center p-4 border-b border-indigo-800">
                <div className={`flex items-center ${isOpen ? "justify-start" : "justify-center w-full"}`}>
                    {isOpen && <span className="text-xl font-bold ml-2">MediScan AI</span>}
                    {!isOpen && <span className="text-xl font-bold">MS</span>}
                </div>
                <button onClick={toggleNav} className="text-white p-2 rounded-full hover:bg-indigo-800">
                    {isOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Navigation Links */}
            <ul className="py-4">
                <Link to="/">
                    <NavItem
                        icon={<HomeIcon />}
                        text="Home"
                        isOpen={isOpen}
                        active={location.pathname === "/"}
                    />
                </Link>

                <Link to="/aiscan">
                    <NavItem
                        icon={<ActivityIcon />}
                        text="Diagnosis"
                        isOpen={isOpen}
                        active={location.pathname === "/aiscan"}
                    />
                </Link>

                <Link to="/doctors">
                    <NavItem
                        icon={<Stethoscope />}
                        text="Health Tracker"
                        isOpen={isOpen}
                        active={location.pathname === "/health"}
                    />
                </Link>

                <Link to="/profile">
                    <NavItem
                        icon={<UserIcon />}
                        text="Profile"
                        isOpen={isOpen}
                        active={location.pathname === "/profile"}
                    />
                </Link>

                <Link to="/about">
                    <NavItem
                        icon={<Earth />}
                        text="Blog"
                        isOpen={isOpen}
                        active={location.pathname === "/blog"}
                    />
                </Link>

                <Link to="/contact">
                    <NavItem
                        icon={<Contact />}
                        text="Settings"
                        isOpen={isOpen}
                        active={location.pathname === "/settings"}
                    />
                </Link>
            </ul>
        </nav>
    )
}

const NavItem = ({ icon, text, isOpen, active = false }) => {
    return (
        <li className={`mb-2`}>
            <div
                className={`flex items-center px-4 py-3 text-white transition-colors rounded-lg ${active ? "bg-indigo-800" : "hover:bg-indigo-700"
                    } ${isOpen ? "justify-start" : "justify-center"}`}
            >
                <span className="text-lg">{icon}</span>
                {isOpen && <span className="ml-4">{text}</span>}
            </div>
        </li>
    )
}
