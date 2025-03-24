import React, { useState } from "react";
import Signin from "../components/Login/Signin";
import Register from "../components/Login/Register";
function Login() {
  const [switchBtn, setSwitchBtn] = useState(true);

  return (
    <div
      className={`flex items-center flex-row border h-screen w-screen justify-center overflow-hidden bg-[url(https://images.pexels.com/photos/31232293/pexels-photo-31232293/free-photo-of-incil-deki-ibraniler-metninin-yakin-cekimi.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-center bg-no-repeat bg-cover`}
    >
      <div className="flex flex-col w-[95%] bg-background md:w-3/4 lg:w-1/2 xl:w-1/3 min-h-3/4 rounded-2xl shadow-sm shadow-primary p-4">
        <h1 className="logo font-black !font-display text-4xl lg:text-6xl select-none w-full text-center py-2 h-fit">
          InkSpace
        </h1>
        <p className="text-sm lg:text-md text-center py-2 border-b border-border">
          A place to share knowledge and better understand the world
        </p>

        <div className="w-96 flex h-fit justify-center mx-auto mt-10">
          <button
            className={`w-1/2 border rounded-l-md font-bold cursor-pointer py-2 ${
              switchBtn
                ? "bg-primary text-background  border-none shadow-sm shadow-primary"
                : "hover:bg-primary/5"
            } `}
            onClick={() => setSwitchBtn(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 border rounded-r-md font-bold cursor-pointer py-2  ${
              !switchBtn
                ? "bg-primary text-background border-none shadow-sm shadow-primary"
                : "hover:bg-primary/5"
            }`}
            onClick={() => setSwitchBtn(false)}
          >
            
            Register
          </button>
        </div>

        <div className="form mt-10 w-full ml-10 md:ml-0">
          {switchBtn ? <Signin setSwitchBtn={setSwitchBtn} /> : <Register setSwitchBtn={setSwitchBtn} />}
        </div>
      </div>
    </div>
  );
}

export default Login;
