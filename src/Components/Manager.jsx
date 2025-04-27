import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordsArray, setPasswordsArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");

    if (passwords) {
      setPasswordsArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to  clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  };

  const savePassword = () => {
    setPasswordsArray([...passwordsArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordsArray, { ...form, id: uuidv4() }])
    );
    console.log(passwordsArray);
    setForm({ site: "", username: "", password: "" });

    toast("Password saved successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };
  const deletePassword = (id) => {
    let c = confirm("Are you sure you want to delete this password?");
    if (c) {
      setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordsArray));
      toast("Password deleted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  const editPassword = (id) => {
    setForm(passwordsArray.filter((i) => i.id === id)[0]);
    setPasswordsArray(passwordsArray.filter((item) => item.id !== id));
    toast("Password edited", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: [e.target.value] });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />

      <div className=" p-2 md:p-0 md:mycontainer min-h-[89vh]">
        <h1 className="text-4xl text font-bold text-center ">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="text-white flex flex-col items-center p-4 gap-8">
          <input
            onChange={handleChange}
            name="site"
            value={form.site}
            placeholder="Enter website URL"
            type="text"
            className="rounded-full border-2 border-green-600 w-full text-black p-4 py-1 gap-3"
            id="site"
          />
          <div className="flex w-full  justify-between md:flex-row flex-col gap-8">
            <input
              onChange={handleChange}
              value={form.username}
              name="username"
              placeholder="Enter Username"
              type="text"
              className="rounded-full border-2 border-green-600 w-full text-black p-4 py-1"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border-2 border-green-600 w-full text-black p-4 py-1"
                id="password"
              />
              <span className="absolute right-0 top-0 cursor-pointer">
                <img src="" alt="" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="text-black flex justify-center  items-center bg-green-500 rounded-full hover:bg-green-300 px-4 py-2 gap-2 w-fit border-green-900 border-2"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
            ></lord-icon>
            Save password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-center m-1 text-xl py-4 font-bold">
            Your Passwords
          </h2>
          {passwordsArray.length === 0 && <div>No passwords saved</div>}
          {passwordsArray.length != 0 && (
            <table className="table-auto w-full mb-10">
              <thead className=" bg-green-500 text-white">
                <tr>
                  <th className="p-1">Site</th>
                  <th className="p-1">Username</th>
                  <th className="p-1">Password</th>
                  <th className="p-1">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-500 text-black">
                {passwordsArray.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-2 text-center">
                      No passwords saved
                    </td>
                  </tr>
                ) : (
                  passwordsArray.map((item, index) => (
                    <tr key={index}>
                      {/* Site */}
                      <td className="py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.site}</span>
                          <button onClick={() => copyText(item.site)}>
                            📋
                          </button>
                        </div>
                      </td>

                      {/* Username */}
                      <td className="py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <button onClick={() => copyText(item.username)}>
                            📋
                          </button>
                        </div>
                      </td>

                      {/* Password */}
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <button onClick={() => copyText(item.password)}>
                            📋
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-2 border border-white">
                        <div className="flex items-center justify-center gap-4">
                          {/* Edit */}
                          <button onClick={() => editPassword(item.id)}>
                            ✏️
                          </button>
                          {/* Delete */}
                          <button onClick={() => deletePassword(item.id)}>
                            ❌
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
