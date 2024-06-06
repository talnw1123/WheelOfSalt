// import React from 'react';
// import './App.css';

// const CaseItem = ({ caseType, caseItem }) => {
//     return (
//       <div className="case-item">
//         <h2>{caseType}</h2>
//         <div className="price">
//           <span>Robux</span>
//           {caseItem.price}
//         </div>
//         <button>Open Case</button>
//       </div>
//     );
// };

// const HomePage = () => {
//   const cases = {
//     Daily_skin: {
//       Daily_Case: {
//         Free: { price: 0 },
//         Ultra_Case: { price: 1 },
//         Rust_Case: { price: 1.1 },
//         Chocolate_Case: { price: 1.4 },
//         Ember_Case: { price: 1.5 },
//       },
//     },
//     Face_Skin: {
//       price: 10,
//     },
//     ITEM: {
//       price: 15,
//     },
//     WEAPON: {
//       price: 20,
//     },
//   };

//   return (
//     <div className="homepage">
//       <h1>Roblox Cases</h1>
//       <div className="case-list">
//         {Object.entries(cases).map(([caseType, caseItem]) => (
//           <CaseItem key={caseType} caseType={caseType} caseItem={caseItem} />
//         ))}
//       </div>
//     </div>
//   );
  
// };

// export default HomePage;

// import React from 'react';

// const MediumCase = () => {
//   return (
//     <article className="ContainerBox AppPage_container ContainerBox--hoverable">
//       <div className="ContainerBox_inner">
//         <a href="/case/medium-case" className="ContainerBox_container">
//           <h3 className="ContainerBox_name">
//             Medium Case
//           </h3>
//           <div className="ContainerBox_thumbnail">
//             <div className="ContainerImage thumbnail_image">
//               <img
//                 src="https://media.csgo-skins.com/container/3.png"
//                 alt=""
//                 aria-hidden="true"
//                 loading="lazy"
//                 width="235"
//                 height="148"
//                 className="ContainerImage_image"
//               />
//             </div>
//             <div className="thumbnail_shadow" style={{ color: 'rgb(132,146,167, 1)' }}></div>
//           </div>
//           <div className="ContainerBox_price">
            
//             <div className="price_value">
//               <div className="ContainerPrice">
//                 <span className="Currency">
//                   $0.75
//                 </span>
//               </div>
//             </div>
//             <svg
//               width="165"
//               height="42"
//               viewBox="0 0 165 42"
//               version="1.1"
              
//               className="price_box"
//               style={{ fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}
//             >
//               <g transform="matrix(1.02439,0,0,1.02439,0,0)">
//                 <path
//                   d="M0,41L161,41L140.875,4.164C139.472,1.597 136.78,0 133.855,0L27.145,0C24.22,0 21.528,1.597 20.125,4.164L0,41Z"
//                   style={{ fill: 'currentColor', fillRule: 'nonzero' }}
//                 />
//               </g>
//             </svg>
//           </div>
//         </a>
//       </div>
//     </article>
//   );
// };

// export default MediumCase;


// import React from 'react';
// import './App.css';

// const CaseItem = ({ caseType, price }) => {
//   return (
//     <div className="ContainerBox_container">
//       <h3 className="ContainerBox_name">{caseType}</h3>
//       <div className="ContainerBox_thumbnail">
//         <div className="ContainerImage thumbnail_image">
//           <img
//             src="https://media.csgo-skins.com/container/3.png"
//             alt=""
//             aria-hidden="true"
//             loading="lazy"
//             width="235"
//             height="148"
//             className="ContainerImage_image"
//           />
//         </div>
//         <div className="thumbnail_shadow" style={{ color: 'rgb(132,146,167, 1)' }}></div>
//       </div>
//       <div className="ContainerBox_price">
//         <div className="price_value">
//           <div className="ContainerPrice">
//             <span className="Currency">
//               ${price}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const HomePage = () => {
//   const cases = {
//     Daily_box: {
//       Free: { price: 0 },
//       UltraCase: { price: 1 },
//       Rust_Case: { price: 1.1 },
//       Chocolate_Case: { price: 1.4 },
//     },
//     Paid_box: {
//       Ember_Case: { price: 1.5 },
//       Face_Skin: { price: 10 },
//       ITEM: { price: 15 },
//       WEAPON: { price: 20 },
//     },
//   };

//   const freeCases = Object.entries(cases.Daily_box);
//   const paidCases = Object.entries(cases.Paid_box);


//   return (
//     <div className="homepage">
//       <h1>Roblox Cases</h1>
//       <div className="case-list">
//         {freeCases.map(([caseType, { price }]) => (
//           <CaseItem key={caseType} caseType={caseType} price={price} />
//         ))}
//       </div>
//       <div className="case-list">
//         {paidCases.map(([caseType, { price }]) => (
//           <CaseItem key={caseType} caseType={caseType} price={price} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default HomePage;


import Chest from './components/Chest/Chest';
import Dashboard from './components/AdminSide/dashBoard/Dashboard';
import UserTable from './components/AdminSide/findUsers/UserTable';
import ManageItem from './components/AdminSide/addItem/ManageItem';
import ManageTransaction from './components/AdminSide/transactions/ManageTransaction';
import './index.css'

const mockData = [
  { username: 'user1', email: 'user1@example.com', amount: '100', createAt: '2023-01-01' },
  { username: 'user2', email: 'user2@example.com', amount: '200', createAt: '2023-01-02' },
  { username: 'user3', email: 'user3@example.com', amount: '300', createAt: '2023-01-03' },
  { username: 'user4', email: 'user4@example.com', amount: '400', createAt: '2023-01-04' },
  { username: 'user5', email: 'user5@example.com', amount: '500', createAt: '2023-01-05' },
  { username: 'user6', email: 'user6@example.com', amount: '600', createAt: '2023-01-06' },
  { username: 'user7', email: 'user7@example.com', amount: '700', createAt: '2023-01-07' },
  { username: 'user8', email: 'user8@example.com', amount: '800', createAt: '2023-01-08' },
  { username: 'user9', email: 'user9@example.com', amount: '900', createAt: '2023-01-09' },
  { username: 'user10', email: 'user10@example.com', amount: '1000', createAt: '2023-01-10' },
  { username: 'user11', email: 'user11@example.com', amount: '1100', createAt: '2023-01-11' },
  { username: 'user12', email: 'user12@example.com', amount: '1200', createAt: '2023-01-12' },
  { username: 'user13', email: 'user13@example.com', amount: '1300', createAt: '2023-01-13' },
  { username: 'user14', email: 'user14@example.com', amount: '1400', createAt: '2023-01-14' },
  { username: 'user15', email: 'user15@example.com', amount: '1500', createAt: '2023-01-15' },
  { username: 'user16', email: 'user16@example.com', amount: '1600', createAt: '2023-01-16' },
  { username: 'user17', email: 'user17@example.com', amount: '1700', createAt: '2023-01-17' },
  { username: 'user18', email: 'user18@example.com', amount: '1800', createAt: '2023-01-18' },
  { username: 'user19', email: 'user19@example.com', amount: '1900', createAt: '2023-01-19' },
  { username: 'user20', email: 'user20@example.com', amount: '2000', createAt: '2023-01-20' },
];
function App() {

  return (
    <div className=" ">
      <Dashboard/>
      <UserTable data={mockData}/>
      <ManageItem/>
      <ManageTransaction/>
    </div>
  )
}

export default App