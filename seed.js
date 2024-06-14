const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
    
    {
        name:"boAt Airdopes 170 TWS Earbuds",
        img:"https://th.bing.com/th/id/OIP.Ei6ezP8BSnlK6iz_AHmdrAAAAA?w=169&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        price:1299,
        desc:"boAt Airdopes 170 TWS Earbuds with 50H Playtime, Quad Mics ENx™ Tech, Low Latency Mode, 13mm Drivers, ASAP™ Charge, IPX4, IWP™, Touch Controls & BT v5.3(Classic Black)"
    },
    {
        name:"Galaxy Z Flip4",
        img:"https://th.bing.com/th/id/OIP.Ye7UeZhJbbrbVAOWX07jTQHaHa?w=196&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        price:79999,
        desc:"It's a pocket-sized statement piece. Small but mighty when folded, this phone is compact enough to fit in your palm, but leaves a big impression with sleek, hazy colors that match your vibe."
    },
    {
        name:"Noise Two Wireless On-Ear Headphones",
        img:"https://th.bing.com/th/id/OIP.auGQVmnRsaFUAe82AsuIQAHaHa?w=181&h=181&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        price:1999,
        desc:"Noise Two Wireless On-Ear Headphones with 50 Hours Playtime, Low Latency(up to 40ms), 4 Play Modes, Dual Pairing, BT v5.3"
    },
    {
        name:"Realme Narzo N53" ,
        img:"https://th.bing.com/th/id/OIP.12plqteJlncjKxwU_VP1OAAAAA?w=151&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
        price:7999,
        desc:"realme narzo N53 (Feather Gold, 4GB+64GB) 33W Segment Fastest Charging | Slimmest Phone in Segment | 90 Hz Smooth Display"
    }
];

async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded");
}

module.exports = seedDB;