import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { userLogOutAction } from "../../redux/action/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogOut = () => {
    dispatch(userLogOutAction());
    navigate("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search/${keyword}`);
  };

  return (
    <header>
      <div className="container">
        <div className="flex justify-between items-center py-5">
          <h1 className="text-4xl font-title font-bold text-emerald-500">
            <Link to="/">NewsMan</Link>
          </h1>
          <ul className="">
            <li className="md:w-2/4 lg:w-2/4 w-full order-2 "></li>
            {!userInfo && (
              <li className="uppercase order-1">
                <Link
                  to="/login"
                  className="p-3 border flex items-center gap-2 px-5 hover:bg-emerald-500 text-emerald-500 hover:text-gray-100 transition"
                >
                  <FaUserAlt />
                  {userInfo ? userInfo.name : "LogIn"}
                </Link>
              </li>
            )}
            {userInfo && (
              <li className="uppercase order-1">
                <button
                  onClick={handleLogOut}
                  className="p-3 border flex items-center gap-2 px-5 hover:bg-emerald-500 text-emerald-500 hover:text-gray-100 transition"
                >
                  <FaSignInAlt />
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>

        <form className="relative" onSubmit={handleSubmit}>
          <input
            type="text"
            className="border rounded-none p-3 px-5 w-full focus:shadow focus:outline-none"
            placeholder="Search"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            type="submit"
            className="absolute top-0 right-0 bottom-0 pl-5 cursor-pointer flex items-center justify-center bg-emerald-500 p-4"
          >
            <BsSearch className=" text-gray-100 z-20 hover:text-gray-200" />
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
