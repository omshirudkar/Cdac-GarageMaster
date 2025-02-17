// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function Register() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [role, setRole] = useState("user");
//   const [message, setMessage] = useState("");

//   const navigate = useNavigate();
//   const roleMapping = {
//     Farmer: 2,
//     Customer: 3,
//   };

//   const nameRegex = /^[A-Za-z]+$/; // Only letters allowed
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   // const mobileRegex = /^(?:\+?\d{1,3})?[0-9]{10}$/;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Form validation checks...
//     if (!firstName || !lastName || !email || !password || !mobile || !role) {
//       setMessage("Please fill in all fields.");
//       return;
//     }
  
//     try {
//       const response = await fetch("http://localhost:8080/api/auth/register", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           firstName: firstName.trim(),
//           lastName: lastName.trim(),
//           email: email.trim(),
//           password: password,
//           mobile: mobile.trim(),
//           roles:[{id:role_id, name:role}]
//       });
  
//       const data = await response.json();
      
//       if (response.ok) {
//         setMessage("Sign up successful! Redirecting...");
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setMessage(`Registration failed: ${data.message || "Please check your inputs."}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setMessage("Error connecting to the server. Please try again later.");
//     }
//   };
  
  

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Create an Account</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={styles.input}
//           />
//           <input
//             type="tel"
//             placeholder="Mobile Number"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//             required
//             pattern="[0-9]{10}"
//             style={styles.input}
//           />
//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//             style={styles.select}
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//             <option value="mechanic">Mechanic</option>
//           </select>
//           <button type="submit" style={styles.button}>
//             Sign Up
//           </button>
//         </form>
//         {message && <p style={styles.message}>{message}</p>}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const roleMapping = {
  
    user: 2,
    admin: 1,
    mechanic: 3,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !mobile || !role) {
      setMessage("Please fill in all fields.");
      return;
    }

    const role_id = roleMapping[role];

    if (!role_id) {
      setMessage("Invalid role selected.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password,
          mobile: mobile.trim(),
          roles: [{ id: role_id, name: role }],
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Sign up successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        if (data && data.message) {
          setMessage(`Registration failed: ${data.message}`);
        } else if (data && data.errors) {
          const errorMessages = data.errors.map(error => error.msg).join("\n");
          setMessage(`Registration failed:\n${errorMessages}`);
        } else {
          setMessage("Registration failed. Please check your inputs or try again later.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error connecting to the server. Please try again later.");
    }
  };

  const styles = { // Styles moved inside the component
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #2C3E50, #4CA1AF)",
    },
    card: {
      background: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      width: "360px",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      outline: "none",
      transition: "0.3s ease",
    },
    select: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      fontSize: "16px",
      background: "#fff",
      outline: "none",
      cursor: "pointer",
    },
    button: {
      background: "#27AE60",
      border: "none",
      padding: "12px",
      borderRadius: "8px",
      fontSize: "18px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "bold",
      transition: "0.3s ease",
    },
    message: {
      marginTop: "15px",
      fontWeight: "bold",
      fontSize: "16px",
      color: "#e74c3c", // Or a success color if needed
    },
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create an Account</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
            style={styles.input}
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            style={styles.select}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="mechanic">Mechanic</option>
            
          </select>
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to right, #2C3E50, #4CA1AF)",
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    width: "360px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "0.3s ease",
  },
  select: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "16px",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
  },
  button: {
    background: "#27AE60",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    color: "#fff",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    color: "#e74c3c",
  },
};
