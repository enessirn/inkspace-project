import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Space, Button, Skeleton } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  PlusOutlined,
  MoonFilled,
  SunOutlined
} from "@ant-design/icons";
import logout from "../utils/logout";
import axios from "axios";
axios.defaults.withCredentials = true;

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { setTheme, theme } = useContext(ThemeContext);
  const [me, setMe] = useState(null);
  const storedLogin = localStorage.getItem("isLogin");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!storedLogin) {
      window.location.href = "/login";
    }
    const getMe = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/auth/me`);
        if (response.status === 200) {
          setMe(response.data.user);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
        localStorage.removeItem("isLogin");
      }
    }
    getMe();

  }, [])
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
      key: "2",
      label: `${theme ? "Light" : "Dark"} Theme`,
      icon: theme ? <SunOutlined style={{color: "#FFB300"}} /> : <MoonFilled style={{color: "#FFB300"}} />,
      onClick: () => {
        setTheme((prev) => !prev)
      }
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Logout",
      icon: <LogoutOutlined />,
      onClick: async () => {
        await logout();
      },
    },
  ];
  return (
    <div className="bg-background dark:bg-d-bg dark:border-d-border dark:shadow-d-primary/10 w-full border-b border-border p-5 shadow-md shadow-primary/10 flex justify-between items-center">

      <Link className="logo hover:!no-underline" to="/">
        <h1 className="dark:text-d-primary !text-2xl text-primary  md:!text-4xl !font-display select-none">
          InkSpace
        </h1>
      </Link>
      {
        storedLogin == "true" ? (
          <div className="flex gap-4 w-full justify-end items-center">
            <Link to="/create-post" className="flex gap-4 items-center hover:!no-underline">
              <span className="flex flex-row items-center gap-1 bg-background hover:bg-primary/15 dark:hover:bg-white/65 text-primary dark:bg-d-primary p-2 rounded-2xl dark:text-d-bg">
                <PlusOutlined className="text-lg" />
                <span className="font-black text-md">Add story</span>

              </span>
            </Link>

            <Dropdown menu={{ items }}>
              <div>
                <Space>
                  <div className="profile-pic flex items-center justify-center cursor-pointer">
                    {loading ? <Skeleton avatar paragraph={false} title={false} active={true} /> : <img
                      className="w-11 h-11 border-secondary dark:border-border border shadow-2xl hover:shadow-border rounded-full hover:shadow-sm"
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
