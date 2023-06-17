import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isCustomer, setIsCustomer] = useState(false);
  const [isJobs, setIsJobs] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState === "Inbox") {
      history("/inbox");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Opportunities") {
      history("/opportunities");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "CRMSettings") {
      history("/crmsettings");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Backloading") {
      history("/backloading");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Vehicle") {
      history("/vehicleunavail");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "RemovalSettings") {
      history("/removalsettings");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "StorageSettings") {
      history("/storagesettings");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "UnitsList") {
      history("/storageList");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Invoices") {
      history("/invoices");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "FinanceSettings") {
      history("/financesettings");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Employees") {
      history("/employees");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "PeopleSettings") {
      history("/peoplesettings");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "DashBoard") {
      history("/dashboard");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Settings") {
      history("/settings");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Documentation") {
      history("/documentation");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "Support") {
      history("/support");
      document.body.classList.add("twocolumn-panel");
    }
    if (iscurrentState === "ManageSubscription") {
      history("/subscription");
      document.body.classList.add("twocolumn-panel");
    }
    //
    if (iscurrentState !== "Jobs") {
      setIsJobs(false);
    }
    if (iscurrentState !== "Reporting") {
      setIsReporting(false);
    }



  }, [
    history,
    iscurrentState,
    isCustomer,
    isJobs,
    isReporting,
    isAuth,
  ]);

  const menuItems = [
    //CRM
    {
      label: "CRM",
      isHeader: true,
    },
    //inbox
    {
      id: "inbox",
      label: "Inbox",
      icon: "bx bx-mail-send",
      link: "/inbox",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Inbox");
      },
    },

    //opportunities
    {
      id: "opportunities",
      label: "Opportunities",
      icon: "bx bx-bulb",
      link: "/opportunities",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Opportunities");
      },
    },
    //crm settings
    {
      id: "crmsettings",
      label: "CRM Settings",
      icon: "bx bx-wrench",
      link: "/crmsettings",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("CRMSettings");
      },
    },
    //customer
    {
      id: "customer",
      label: "Customer",
      icon: "bx bxs-user-detail",
      link: "/#",
      stateVariables: isCustomer,
      click: function (e) {
        e.preventDefault();
        setIsCustomer(!isCustomer);
        setIscurrentState("Customer");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "residential",
          label: "Residential",
          link: "/customer-residential",
          parentId: "customer",
        },
        {
          id: "commercial",
          label: "Commercial",
          link: "/customer-commercial",
          parentId: "customer",
        },],
    },
    //removals

    {
      label: "Removals",
      isHeader: true,
    },
    {
      id: "jobs",
      label: "Jobs",
      icon: "bx bx-briefcase",
      link: "/#",
      stateVariables: isJobs,
      click: function (e) {
        e.preventDefault();
        setIsJobs(!isJobs);
        setIscurrentState("Jobs");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "listjobs",
          label: "List Jobs",
          link: "/listjobs",
          parentId: "jobs",
        },
        {
          id: "jobschedule",
          label: "Job Schedule",
          link: "/jobschedule",
          parentId: "jobs",
        },
        {
          id: "backloadingschedule",
          label: "Backloading Schedule",
          link: "/backloadingschedule",
          parentId: "jobs",
        },],
    },
    //Backloading
    {
      id: "backloading",
      label: "Backloading",
      icon: "bx bxs-truck",
      link: "/backloading",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Backloading");
      },
    },
    //Vehicle
    {
      id: "vehicleunavail",
      label: "Vehicle Unavailability",
      icon: "bx bxs-truck",
      link: "/vehicleunavail",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("VehicleUnavailability");
      },
    },

    //Removalsettings
    {
      id: "removalsettings",
      label: "Removal Settings",
      icon: "bx bx-wrench",
      link: "/removalsettings",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("RemovalSettings");
      },
    },

    //Storage
    {
      label: "Storage",
      isHeader: true,
    },
    //Unitslist
    {
      id: "unitslist",
      label: "Storage List",
      icon: "bx bxs-inbox",
      link: "/storageList",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("UnitsList");
      },
    },


    //Storage Settings
    {
      id: "storagesettings",
      label: "Storage Settings",
      icon: "bx bx-wrench",
      link: "/storagesettings",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("StorageSettings");
      },
    },
    //Finance
    {
      label: "Finance",
      isHeader: true,
    },
    //invoices
    {
      id: "invoices",
      label: "Invoices",
      icon: "bx bx-receipt",
      link: "/invoices",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Invoices");
      },
    },
    {
      id: "financesettings",
      label: "Finance Settings",
      icon: "bx bx-wrench",
      link: "/financesettings",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("FinanceSetitings");
      },
    },
    //People Operations
    {
      label: "People Operations",
      isHeader: true,
    },
    {
      id: "employees",
      label: "Employees",
      icon: "bx bxs-user-detail",
      link: "/employees",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Employees");
      },
    },
    {
      id: "peoplesettings",
      label: "People Settings",
      icon: "bx bx-wrench",
      link: "/peoplesettings",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("PeopleSettings");
      },
    },
    //Dashboard
    {
      label: "Dashboard",
      isHeader: true,
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "bx bx-home",
      link: "/dashboard",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Dashboard");
      },
    },
    //reporting
    {
      id: "reporting",
      label: "Reporting",
      icon: "bx bx-briefcase",
      link: "/#",
      stateVariables: isReporting,
      click: function (e) {
        e.preventDefault();
        setIsReporting(!isReporting);
        setIscurrentState("Reporting");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "salespipeline",
          label: "Sales Pipeline",
          link: "/salespipeline",
          parentId: "reporting",
        },
        {
          id: "operationsreport",
          label: "Operations Report ",
          link: "/operationsreport",
          parentId: "reporting",
        },
        {
          id: "leadreport",
          label: "Lead Report",
          link: "/leadreport",
          parentId: "reporting",
        },
        {
          id: "dailyvehiclecheck",
          label: "Daily Vehicle Check",
          link: "/dailyvehiclecheck",
          parentId: "reporting",
        },],
    },

    //settings
    {
      label: "Settings",
      isHeader: true,
    },

    //Settings
    {
      id: "settings",
      label: "Settings",
      icon: "bx bx-wrench",
      link: "/settings",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Settings");
      },
    },
    //Documentation
    {
      id: "documentation",
      label: "Documentation",
      icon: "bx bx-file",
      link: "https://docs.onexfort.com/docs",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Documentation");
      },
    },
    //Support
    {
      id: "support",
      label: "Support",
      icon: "bx bx-support",
      link: "https://onexfort.freshdesk.com/support/login",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Support");
      },
    },
    //Subscription
    {
      id: "subscription",
      label: "Manage Subscription",
      icon: "bx bx-credit-card",
      link: "/subscription",
      click: function (e) {
        e.preventDefault();
        setIscurrentState("Subscription");
      },
    },


  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
