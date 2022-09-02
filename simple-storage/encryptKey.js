const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
    const encryptedPrivateKey = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD, process.env.PRIVATE_KEY);
    console.log('encryptedPrivateKey: ', encryptedPrivateKey);
    fs.writeFileSync("./.encryptedPrivateKey.json", encryptedPrivateKey)
}

main().then(console.log).catch(console.log)