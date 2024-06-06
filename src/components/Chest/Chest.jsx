// import React from 'react';
// import './Chest.css';

// const CaseItem = ({ caseType, price }) => {
//     return (
//         <div className="ContainerBox_container">
//             <h3 className="ContainerBox_name">{caseType}</h3>
//                 <div className="ContainerBox_thumbnail">
//                     <div className="ContainerImage thumbnail_image">
//                         <img
//                             src="https://media.csgo-skins.com/container/3.png"
//                             alt=""
//                             aria-hidden="true"
//                             loading="lazy"
//                             width="235"
//                             height="148"
//                             className="ContainerImage_image"
//                         />
//                     </div>
//                     <div className="thumbnail_shadow" style={{ color: 'rgb(132,146,167, 1)' }}></div>
//                 </div>
//             <div className="ContainerBox_price">
//                 <div className="price_value">
//                     <div className="ContainerPrice">
//                         <span className="Currency">
//                             {price}฿
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const HomePage = () => {
//     const cases = {
//         Daily_box: {
//             "DailyFree": { price: " Free " },
//             "UltraCase": { price: " Free " },
//             "Rust_Case": { price: " Free " },
//             "Chocolate_Case": { price: " Free " },
//         },
//         Paid_box: {
//             "Ember_Case": { price: 1.5 },
//             "Face_Skin": { price: 10 },
//             "ITEM": { price: 15 },
//             "WEAPON": { price: 20 },
//         },
//     };

//     const freeCases = Object.entries(cases.Daily_box);
//     const paidCases = Object.entries(cases.Paid_box);


//     return (
//         <div className="homepage">
//             <h1>Roblox Cases</h1>
//             <div className="case-list">
//                 {freeCases.map(([caseType, { price }]) => (
//                     <CaseItem key={caseType} caseType={caseType} price={price} />
//                 ))}
//             </div>
//             <div className="case-list">
//                 {paidCases.map(([caseType, { price }]) => (
//                     <CaseItem key={caseType} caseType={caseType} price={price} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default HomePage;
// App.js
import React from 'react';
import './Chest.css';

const items = [
    { name: 'DailyFree', price: 'Free' },
    { name: 'UltraCase', price: 'Free' },
    { name: 'Rust_Case', price: 'Free' },
    { name: 'Chocolate_Case', price: 'Free' },
    { name: 'Ember_Case', price: '10 บาท' },
    { name: 'Face_Skin', price: '20 บาท' },
    { name: 'ITEM', price: '30 บาท' },
    { name: 'WEAPON', price: '40 บาท' },
];


function App() {
    return (
        <div className="App">
            <header className="App-header">
                Roblox Cases
            </header>
            <div className="item-container">
                {items.map((item, index) => (
                    <div key={index} className="item">
                        <div className="item-name">{item.name}</div>
                        <img
                            src={
                                item.price === 'Free'
                                    ? 'https://tr.rbxcdn.com/96ff30422bf7bc83762e2a13fb1cee29/420/420/Image/Png'
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu38gV1Qvb_AOAmqmYiJbc3zWLXiLifn2dP1IR3D6VYQ&s'
                            }
                            alt={item.name}
                            className="item-image"
                        />
                        <div className="item-price">
                            <div className="price-trapezoid">{item.price}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
