import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import "./styles/global.scss";
import "./styles/form.scss";
type UserProps = {
  username: string;
  password: string;
};
function App() {
  const [user, setUser] = useState<UserProps>({
    username: "",
    password: "",
  });

  const changeInputsValues = (e: any) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const changeSaveInfo = (e: any) => {
    const { checked } = e.target;
    if (checked && user.username && user.password) {
      const token = Buffer.from(`${user.username}:${user.password}`).toString(
        "base64"
      );
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.setItem("token", "");
    }
  };

  useEffect(() => {
    const storageData = localStorage.getItem("token");
    if (storageData) {
      console.log(storageData);
    }
  }, []);
  return (
    <div className="App">
      <div id="title">Welcome</div>
      <div>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={changeInputsValues}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={changeInputsValues}
        />
      </div>
      <div style={{display: 'flex', gap:5}}>
        <input type="checkbox" onChange={changeSaveInfo} id="remember" />
        <label htmlFor="remember">Remember</label>
      </div>

      <button
        disabled={user.username && user.password ? false : true}
        id="signin"
      >
        Sign in
      </button>
    </div>
  );
}

export default App;
