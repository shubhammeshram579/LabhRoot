// import { createContext, useContext, useEffect, useState } from "react";
// import api from "../api/axios";
// import axios from "axios";

// import AuthCreateContext from "./AuthCreateContext.js"

// // const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // console.log("user",user)

//   useEffect(() => {
//     axios.get("http://localhost:8000/api/users/crrentUser",
//       {withCredentials:true}
//     )
//       .then(res => setUser(res.data.user))
//       .catch(() => setUser(null))
//       .finally(() => setLoading(false));
//   }, []);

//   const login = async (data) => {
//     const res = await axios.post("http://localhost:8000/api/users/login", data,
//       // {withCredentials:true}
//     );

//     console.log("user",res.data)
//     setUser(res.data);

//     return res.data.data
//   };

//   const logout = async () => {
//     await axios.post("http://localhost:8000/api/users/logout",
//       {withCredentials:true}
//     );
//     setUser(null);
//   };


//   return (
//     <AuthCreateContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthCreateContext.Provider>
//   );
// };

// export default AuthProvider
