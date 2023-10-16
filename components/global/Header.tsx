import Link from "next/link";
import Logo from "../Logo";


const Header = () => {
    return (
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
            <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
                <Logo />
                {/* {user ? ( */}
                <div className="flex items-center gap-4">
                    {/* Hey, {user.email}! */}
                </div>
                {/* ) : ( */}
                <Link
                    href="/login"
                    className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
                >
                    Login
                </Link>
                {/* )} */}
            </div>
        </nav>
    )
}

export default Header