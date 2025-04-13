import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space, Button, Skeleton } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import logout from "../utils/logout";
import GetMeContext from "../context/GetMeContext"
function Navbar() {

  const { me, loading } = useContext(GetMeContext);
  console.log("getMe", me);
  const storedLogin = localStorage.getItem("isLogin");
  const navigate = useNavigate(); 
  const items = [
    {
      key: "0",
      label: "Welcome back, " + me?.fullname,
      disabled: true,
    },
    {
      key: "1",
      label: "Profile",
      icon: <UserOutlined />,
      onClick: () => {
        navigate("/profile");
      },
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: async () => {
        await logout();
      },
    },
  ];
  return (
    <div className="w-full bg-background  p-5 shadow-md shadow-primary/10 flex justify-between items-center">

      <Link className="logo hover:!no-underline" to="/">
        <h1 className="!text-2xl !text-primary  md:!text-4xl font-black !font-display select-none">
          InkSpace
        </h1>
      </Link>
      {
        storedLogin == "true" ? (
          <div className="flex gap-4 w-full justify-end items-center">
            <Link to="/create-post" className="flex gap-4 items-center hover:!no-underline">
              <span className="write-story text-secondary hover:text-primary">
                <i className="fa-solid fa-pen-to-square text-secondary"></i> Write
              </span>
            </Link>

            <Dropdown menu={{ items }}>
              <div>
                <Space>
                  <div className="profile-pic flex items-center justify-center cursor-pointer">
                    {loading ? <Skeleton avatar paragraph={false} title={false} active={true} /> : <img
                      className="w-8 h-8 rounded-full hover:shadow-sm"
                      src={me?.profilePicture}
                      alt="Profile Picture"
                    />}

                  </div>
                </Space>
              </div>
            </Dropdown>
          </div>


        ) : (
          <Link className="hover:!no-underline" to="/login">
            <div className="login">
              <Button
                className="!bg-primary hover:!bg-primary/80 !font-bold !p-4"
                type="primary"
                icon={<UserOutlined />}
              >
                Login
              </Button>
            </div>
          </Link>
        )
      }


    </div>
  );
}

export default Navbar;
