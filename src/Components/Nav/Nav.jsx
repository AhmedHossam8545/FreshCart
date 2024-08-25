// import React, { useContext, useState } from "react";
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
//   Avatar,
//   Card,
//   IconButton,
//   Collapse,
// } from "@material-tailwind/react";
// import {
//   CubeTransparentIcon,
//   UserCircleIcon,
//   CodeBracketSquareIcon,
//   Square3Stack3DIcon,
//   ChevronDownIcon,
//   Cog6ToothIcon,
//   InboxArrowDownIcon,
//   LifebuoyIcon,
//   PowerIcon,
//   RocketLaunchIcon,
//   Bars2Icon,
// } from "@heroicons/react/24/solid";
// import { NavLink ,Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../Contexts/AuthContext";

// const navListItems = [
//   {
//     label: "Account",
//     icon: UserCircleIcon,
//   },
//   {
//     label: "Blocks",
//     icon: CubeTransparentIcon,
//   },
//   {
//     label: "Docs",
//     icon: CodeBracketSquareIcon,
//   },
// ];


 
// function NavList() {
//   let {userToken} = useContext(AuthContext);

//   return (<>
//     {userToken && <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-black  ">
//       <li> <NavLink to={"/"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2  " >Home</NavLink> </li>
//       <li> <NavLink to={"/products"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2 " >Products</NavLink> </li>
//       <li> <NavLink to={"/categories"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2" >Categories</NavLink> </li>
//       <li> <NavLink to={"/brands"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2" >Brands</NavLink> </li>
//       <li> <NavLink to={"/wishlist"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2" >Wishlist</NavLink> </li>
//       <li> <NavLink to={"/cart"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2" >Cart</NavLink> </li>
//       <li> <NavLink to={"/allorders"} className="font-medium text-blue-gray-500 border-0  rounded-lg w-1/6  mx-2" >My Orders</NavLink> </li>
//     </ul>
//     }
//     </>
//   );
// }
 
// export function Nav() {
//   const [isNavOpen, setIsNavOpen] = useState(false);
 
//   const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setIsNavOpen(false),
//     );
//   }, []);

  
//   let {userToken ,SetUserToken} = useContext(AuthContext);
//   const navigate = useNavigate()

//   function logOut(){
//     SetUserToken("");
//     localStorage.removeItem("token")
//     navigate("/login")
//   }

 
//   return (
//     <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 mt-2">
//       <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">

//         <Link to={"/"} className="mr-4 ml-2 cursor-pointer py-1.5 text-black font-bold" >FrechCart</Link>
        
//         <div className="hidden lg:block">
//           <NavList />
//         </div>
//         <IconButton
//           size="sm"
//           color="blue-gray"
//           variant="text"
//           onClick={toggleIsNavOpen}
//           className="flex justify-center items-center ms-96 lg:hidden text-black"
//         >
//           <Bars2Icon className="h-6 w-6" />
//         </IconButton>

//         <ul className="flex gap-4 items-center ">
//           { !userToken &&  <>
//             <li><NavLink to={"/login"} className="text-black font-bold"  >Login</NavLink></li>
//             <li><NavLink to={"/register"} className="text-black font-bold"  >Register</NavLink></li>
//             </>}
//             { userToken && <li><button onClick={logOut} className="text-black font-bold"  >LogOut</button></li>}
//           </ul>
//         </div>
//         <div className="">  
//           {/* <Button size="sm" variant="text">
//             <span>Log In</span>
//           </Button>

//           <Button size="sm" variant="text">
//             <span>Register</span>
//           </Button>

//           <Button size="sm" variant="text">
//             <span>Log Out</span>
//           </Button> */}



//       </div>
//      { userToken && <Collapse open={isNavOpen} className="overflow-scroll ">
//         <NavList />
//       </Collapse>}
//     </Navbar>
//   );
// }







import React, { useContext } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
 
function NavList() {
  let {userToken ,SetUserToken} = useContext(AuthContext);
  const navigate = useNavigate()

  function logOut(){
    SetUserToken("");
    localStorage.removeItem("token")
    navigate("/FreshCart/login")
  }

  return (
    <>
  <div className="flex"> 
    { userToken && <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
       <li> <NavLink to={"/FreshCart/"} className="flex items-center hover:text-purple-500 transition-colors   " ><i class="fa-solid fa-home text-purple-600 me-1 mt-1 text-lg"></i>Home</NavLink> </li>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
      <li> <NavLink to={"/FreshCart/products"} className="flex items-center hover:text-purple-500 transition-colors " ><i class="fa-brands fa-product-hunt text-purple-600 me-1 mt-1 text-lg"></i>Products</NavLink> </li>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
       <li> <NavLink to={"/FreshCart/categories"} className="flex items-center hover:text-purple-500 transition-colors" ><i class="fa-solid fa-list text-purple-600 me-1 mt-1 text-lg"></i>Categories</NavLink> </li>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
     <li> <NavLink to={"/FreshCart/brands"} className="flex items-center hover:text-purple-500 transition-colors" ><i class="fa-solid fa-copyright text-purple-600 me-1 mt-1 text-lg"></i>Brands</NavLink> </li>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
   <li> <NavLink to={"/FreshCart/wishlist"} className="flex items-center hover:text-purple-500 transition-colors" ><i class="fa-solid fa-heart text-purple-600 me-1 mt-1 text-lg"></i>Wishlist</NavLink> </li>

      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
    <li> <NavLink to={"/FreshCart/cart"} className="flex items-center hover:text-purple-500 transition-colors" ><i class="fa-solid fa-cart-shopping text-purple-600 me-1 mt-1 text-lg"></i> Cart </NavLink> </li>

      </Typography>
      {/* <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className=" font-medium"
      >
    <li> <NavLink to={"/allorders"} className="flex items-center hover:text-purple-500 transition-colors" >My Orders</NavLink> </li>

      </Typography> */}
    </ul>}

    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      { !userToken && <>
      <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className=" font-medium"
        >
      <li><NavLink to={"/FreshCart/login"} className="text-black font-bold ms-5"  ><i class="fa-solid fa-right-to-bracket text-purple-600 me-1 mt-1 text-lg"></i>Login</NavLink></li>

        </Typography>
      <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className=" font-medium"
        >
      <li><NavLink to={"/FreshCart/register"} className="text-black font-bold ms-5"  ><i class="fa-solid fa-pen text-purple-600 me-1 mt-1 text-lg"></i>Register</NavLink></li>

      </Typography>
      </>}
      {userToken &&
      <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className=" font-medium"
        >
        <li><button onClick={logOut} className="text-red-600 font-bold ms-5"  ><i class="fa-solid fa-right-from-bracket text-red-600 me-1 mt-1 text-lg"></i>LogOut</button></li>
      </Typography> }
    </ul>
    </div>
  </>
  );
}
 
export function Nav() {
  const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 


  return (
    <Navbar className="mx-auto text-black max-w-screen-xl px-6 py-3 fixed top-0 right-0 left-0 z-20">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 text-xl text-purple-600"
        >
         <NavLink to={"/FreshCart/"}><i class="fa-solid fa-cart-shopping text-purple-600 "></i> Fresh Cart</NavLink>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 mb-4 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}
