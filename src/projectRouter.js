import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./Components/App";
import About from "./Components/About";
import Login from "./Components/Login";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Register from "./Components/Register";
import Admin from "./Components/Admin";
import Header from "./Components/admin/Header";

//Routing of the admin components
import AdminDash from "./Components/admin/AdminDash";
import StaffList from "./Components/admin/Staffmanagment";
import AdminForm from "./Components/AdminForm";
import AssignTask from "./Components/admin/AssignTask";
import BatteryService from "./Components/BatteryService";
import DentingAndPainting from "./Components/DentingAndPainting";
import TyresAndWheels from "./Components/TyresAndWheels";
import Periodicservices from "./Components/Periodicservices";
import Accidental_Car_Repair from "./Accidental_Car_Repair";
import CustomServices from "./Components/CustomServices";
import WindshieldAndGlass from "./Components/WindshieldAndGlass";
import LightsAndFitments from "./Components/LightsAndFitments";
import EngineDecarbonization from "./Components/EngineDecarbonization";
import CarWash from "./Components/CarWash";
import CustomerList from "./Components/admin/CustomerList";
import AcceptRequestForm from "./Components/admin/AcceptRequest";
import InventoryManagement from "./Components/admin/InventoryManagement";
//Routing of the Customer components

import CustomerUpdateDetails from "./Components/customers/CustomerUpdateDetails";
import CustomerContactSupport from "./Components/customers/CustomerContactSupport";
import CustomerViewService from "./Components/customers/CustomerViewService";


import CustomerDash from "./Components/customers/CustomerDash";
import CustomerForm from "./Components/CustomerForm";
import RegisterSuccess from "./Components/Registersuccess";
import PaymentGateway from "./Components/PaymentGateway";
import Notifications from "./Components/customers/Notifications";
import ServiceBooking from "./Components/customers/ServiceBooking";
import ServiceHistory from "./Components/customers/ServiceHistory";
import VehicleTracking from "./Components/customers/VehicleTracking";
import MechanicDashboard from "./Components/machanic/MachanicDashboard";

const projectRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/", //give url name you want here
        element: <Home />, //Assign that component to that path
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/admin-login",
        element: <AdminForm />,
      },
      {
        path: "/customer-login",
        element: <CustomerForm />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/register",
        element: <Register />,
      },

      {
        path: "/batteriesservices",
        element: <BatteryService />,
      },

      //Admin Routing
      {
        path: "/admin-dashboard", // Relative path under /admin
        element: <AdminDash />,
      },
      {
        path: "/inventory-management", // Relative path under /admin
        element: <InventoryManagement />,
      },
      {
        path: "/staff", // Relative path under /admin
        element: <StaffList />,
      },
      {
        path: "/customer", // Relative path under /admin
        element: <CustomerList />,
      },
      {
        path: "/assign-task", // Admin routing
        element: <AssignTask />,
      },
      {
        path: "/accept-request", // Admin routing
        element: <AcceptRequestForm />,
      },
      {
        path: "/DentingAndPainting", // Admin routing
        element: <DentingAndPainting />,
      },

      {
        path: "/periodicservices", // Admin routing
        element: <Periodicservices />,
      },
      {
        path: "/Accidentalcarrepair", // Admin routing
        element: <Accidental_Car_Repair />,
      },
      {
        path: "/tyresandwheels", // Admin routing
        element: <TyresAndWheels />,
      },
      {
        path: "/customservices",
        element: <CustomServices />, // Admin routing
      },
      {
        path: "/windshieldandglass",
        element: <WindshieldAndGlass />, // Admin routing
      },
      {
        path: "/lightsandfitments",
        element: <LightsAndFitments />, // Admin routing
      },
      {
        path: "/engine-decarbonization",
        element: <EngineDecarbonization />, // Admin routing
      },
      {
        path: "/carwash",
        element: <CarWash />, // New route for Car Wash
      },


      
      //customer Routing
      {
      path: "/customer-dash",
      element: <CustomerDash />, // New route for Car Wash
      },
      {
        path: "/customer-update-details",
        element: <CustomerUpdateDetails />, // New route for Car Wash
      },
      {
        path: "/customer-contact-support",
        element: <CustomerContactSupport/>, // New route for Car Wash
      },
      {
        path: "/service-history",
        element: <ServiceHistory />, // New route for Car Wash
      },
      {
        path: "/customer-view-service",
        element: <CustomerViewService />, // New route for Car Wash
      },
      {
        path: "/registersuccess" ,
        element: <RegisterSuccess />, // New route for Car Wash
      },
      {
        path: "/paymentButton" ,
        element: <PaymentGateway />, // New route for Car Wash
      },
      {
        path: "/notifications" ,
        element: <Notifications />, // New route for Car Wash
      },
      {
        path: "/service-booking" ,
        element: <ServiceBooking />, // New route for Car Wash
      },
      {
        path: "/vehicle-tracking" ,
        element: <VehicleTracking />, // New route for Car Wash
      },


      //machanic 

      {
        path: "/machanicdashboard" ,
        element: <MechanicDashboard />, // New route for Car Wash
      },







    ],
  },
]);

export default projectRouter;
