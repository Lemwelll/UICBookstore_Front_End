import axios from "axios";
import { any } from "cypress/types/bluebird";

export default function useLocalAuth() {
  const config = useRuntimeConfig().public;
  const cookieOptions = { domain: config.DOMAIN, secure: true };
  async function login(email: string, password: string) {
    const { data } = await useLocalFetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const res = data.value as any;

    useCookie("accessToken", cookieOptions).value = res.accessToken;
    useCookie("refreshToken", cookieOptions).value = res.refreshToken;
    useCookie("user", cookieOptions).value = email;
  }

  function signup({ id = "", email = "", password = "", firstName = "", lastName = "", } = {}) {

    console.log(email, password);

    const formData = new FormData();

    const data: any = {
      id: id,
      uicEmail: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }

    // convert data into formData
    Object.keys(data).forEach(key => formData.append(key, data[key]));

    axios.post('http://localhost:8000/api/student/login', formData).then( (res: any) => {
      if (res.data.studentID) {
        localStorage.setItem('studentLogin', res.data);
        alert(`Signup success. Welcome ${res.data.firstName}`)
        location.href = '/store'
      } else {
        alert('Login Error. Please try again!')
      }
    }).catch( (err: any) => {
      alert('Oops, something went wrong');
      console.error(err);
    } )

    
  }

  async function logout() {
    await useLocalFetch("/api/users/logout", {
      method: "POST",
      body: JSON.stringify({ token: useCookie("refreshToken").value }),
    });

    useCookie("accessToken", cookieOptions).value = null;
    useCookie("refreshToken", cookieOptions).value = null;
    useCookie("user", cookieOptions).value = null;
  }

  async function getCurrentUser() {
    const user = useCookie("user", cookieOptions).value;
    const { data } = await useLocalFetch(`/api/users/${user}`, {});
    return data.value;
  }

  const currentUser = useState("currentUser", () => ({
    _id: "",
    id: "",
    given_name: "",
    surname: "",
    email: "",
    password: "",
    type: "",
    createdAt: "",
    organization: "",
    role: "",
  }));

  const email = useCookie("user", cookieOptions).value;
  const accessToken = useCookie("accessToken", cookieOptions).value;
  const refreshToken = useCookie("refreshToken", cookieOptions).value;

  const loggedIn = computed(() => !!(email && accessToken && refreshToken));

  const isAdmin = useState("isAdmin", () => false);

  return {
    login,
    logout,
    getCurrentUser,
    currentUser,
    loggedIn,
    signup,
    isAdmin,
  };
}
