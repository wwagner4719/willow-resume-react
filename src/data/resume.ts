import mcpCertPdf from '../assets/MCP_Servers_OpenAi_Certificate.pdf'

export const contact = {
  name: 'Willow Ian Wagner',
  title: 'Senior Web Developer',
  phone: '+1 (248) 396-5511',
  email: 'willow.wagner@gmail.com',
  linkedin: 'https://www.linkedin.com/in/willowwagner/',
  github: 'https://github.com/wwagner4719',
  location: 'Auburn Hills, MI',
}

export const summary =
  `Full-stack web developer with 15+ years shipping production applications across React, Angular, and .NET. 
  Built and scaled platforms supporting 10,000+ concurrent users, led front-end teams, and currently expanding 
  into AI tooling with Claude Code, OpenAI, and MCP. Looking for senior or lead roles where I can drive architecture and mentor teams.`

export const achievements = [
  {
    title: 'Enhanced Application Efficiency',
    description:
      'Implemented new functionalities increasing web application efficiency by 50% at Statclash Inc.',
  },
  {
    title: 'Scalable Architecture Design',
    description:
      'Developed scalable architecture supporting 10,000+ concurrent users for Fleet Management System.',
  },
  {
    title: 'Increased User Engagement',
    description:
      'Successfully redesigned UI/UX, boosting user engagement by 20% for Daily Fantasy Sports app.',
  },
]

export const experience = [
  {
    title: 'Senior Web Developer',
    company: 'Lux Interactive',
    location: 'Troy, MI - Remote',
    start: '08/2018',
    end: '02/2026',
    bullets: [
      `Built and shipped a CPA course sales & compliance tracking platform on Sitefinity (.NET MVC, JavaScript), 
      authoring custom widgets that automated 20 hours per week of compliance reporting for CPAs.`,
      `Led the front-end redesign of the Delta Museum site on Sitefinity, delivering responsive widget library 
      that reduced editor publishing time by 80%.`,
      `Led front-end architecture for an HR/Payroll Management System (React, Redux), 
       shipping 100+ modules used by unlimited employees across large client organizations.`,
      `Optimized Navitaire flight API integration in Java/IntelliJ, cutting average response time from minutes to seconds 
      and eliminating hidden errors on peak booking traffic.`,
      `Engineered the customer-management front end for a hotel CMS in React/Redux/Next.js, 
      supporting hunderds of properties and daily active users.`,
      `Architected and shipped a passenger flight management system in Angular/NgRx/.NET, scaling to 10,000+ concurrent users.`,
      `Designed, built, and maintained an environmental auditing platform (Angular, NgRx) 
      used by hundreds of field auditors to process yearly.`,
    ],
  },
  {
    title: 'Senior Web Developer',
    company: 'Spud Software Inc',
    location: 'Grand Blanc, MI',
    start: '08/2016',
    end: '07/2018',
    bullets: [
      `Designed, built, and maintained a Time & Resource Management System in .NET MVC, 
      replacing legacy workflow for unlimited users.`,
      `Delivered an Automotive Inventory Tool (Angular.js + .NET) 
      that consolidated inventory across entire dealerships and reduced lookup time by 80%.`,
    ],
  },
  {
    title: 'Web Developer',
    company: 'Statclash Inc',
    location: 'Troy, MI',
    start: '07/2015',
    end: '08/2016',
    bullets: [
      `Shipped new functionality for a Daily Fantasy Sports platform (MVC4, Razor, HTML5) that drove a 50% increase in application efficiency.`,
      `Implemented MVVM architecture with Knockout.js (client) and C# MVC (server), 
      reducing client-side rendering time and simplifying legacy views.`,
      `Owned UI/UX for a full site rebrand, boosting user engagement 20%.`,
      `Contributed middle-tier and back-end features alongside front-end work, shipping multiple features across the stack.`,
    ],
  },
  {
    title: 'Web Developer',
    company: 'Anthelio Healthcare Solutions',
    location: 'Remote',
    start: '03/2014',
    end: '06/2015',
    bullets: [
      `Built and tested internal healthcare management apps (ASP.NET 4.0/4.5, MS SQL 2014) 
      used for patient intake, claims processing.`,
      `Delivered N-tier features end-to-end (Services, DTO, BLL, DAL, stored procs), shipping multiple features into production.`
    ],
  },
  {
    title: 'Web Developer',
    company: 'QEK Global Solutions',
    location: 'Bloomfield Hills, MI',
    start: '04/2010',
    end: '03/2014',
    bullets: [
      `Co-developed an asset management system for employee lease vehicles, tracking hundreds of vehicles across multiple locations.`,
      `Designed, built, and tested modules for an existing fleet management web app (VB.NET, ASP.NET 4.0, MS SQL 2008) 
      supporting hundreds of fleet managers vehicles.`,
      `Built the data and business layers using table adapters, datasets, and stored procedures, standardizing into reusable components.`,      
    ],
  },
]

export const education = [
  {
    degree: 'Bachelor of IT Programming',
    school: 'American Intercontinental University',
    location: 'Hoffman Estates, IL',
    start: '03/2007',
    end: '02/2008',
  },
  {
    degree: 'Associate of Business Administration',
    school: 'American Intercontinental University',
    location: 'Hoffman Estates, IL',
    start: '02/2005',
    end: '02/2007',
  },
]

export const skills = {
  Programming: [
    'C#', 'VB', 'ASP.Net', 'MVC', 'Razor', 'T-SQL', 'Web API', 'XML',
    'Bootstrap', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'jQuery',
    'React', 'Redux', 'Angular', 'RxJS', 'NgRx', '.NET', 'Entity Framework',
    'Angular UI', 'Ionic', 'Some Java', 'Some Python',
  ],
  Tools: [
    'Visual Studio', 'VS Code', 'DevOps', 'CLI', 'IntelliJ IDEA', 'IIS',
    'Telerik', 'Kendo UI', 'Material UI', 'Sitefinity', 'nopCommerce', 'Shopify',
  ],
  Databases: ['MS SQL Server', 'Relational DB Design'],
  'Reporting Tools': ['Telerik Reports', 'Crystal Reports'],
  'Source Control': ['DevOps', 'Team Explorer', 'GIT'],
}

export const petProjects = [
  {
    name: 'Ecommerce Projects',
    url: 'https://gnarlysidewalks.com',
    description: 'Developed with Shopify',
    start: '01/2023',
    end: 'Present',
  },
]

export const recentCourses = [{
  title:'MCP Servers Made Easy with Python and OpenAI Agents',
  link: mcpCertPdf
},
{
  title:'Vibe Coding Claude Code Workshop'
}
]
