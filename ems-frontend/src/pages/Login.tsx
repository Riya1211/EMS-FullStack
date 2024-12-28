import React, { useState } from "react";
import { useLoginMutation } from "../redux/api/logInAPI";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducer/loginReducer";
import toast from "react-hot-toast";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await login({ email, password }).unwrap();
      // Dispatch the user data to Redux store
      if(response){
        dispatch(userExist(response));
        localStorage.setItem("user", JSON.stringify(response));
      }else{
        dispatch(userNotExist());
      }

      // Show success message
      toast.success("Logged in successfully!");
    } catch (error) {
      
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="border-2 border-emerald-600 p-20 rounded-xl">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="bg-transparent outline-none border-2 border-emerald-600 py-2 px-6 text-xl rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="mt-3 bg-transparent outline-none border-2 border-emerald-600 py-2 px-6 text-xl rounded-full placeholder:text-gray-400"
            type="password"
            placeholder="Enter your password"
          />
          <button className="mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full placeholder:text-white">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;