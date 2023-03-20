require("dotenv").config();
const fs = require("fs");
const ethers = require("ethers");
const readlineSync = require('readline-sync');

function node_url(networkName) {
    if (networkName) {
        return process.env['NET_WORK_RPC_' + networkName.toUpperCase()];
    }
}

function accounts(networkName) {
    let obj = fs.readFileSync(process.env['MNEMONIC_DEPLOYER_' + networkName.toUpperCase()]);
    let password = process.env['NNEMONIC_PASSWORD_' + networkName.toUpperCase()];
    let wallet = ethers.Wallet.fromEncryptedJsonSync(obj, password);
    return [wallet.privateKey];
}

async function generateMnemonic() {
    let password = readlineSync.question("please input the password: ", {hideEchoBack: true});
    let wallet = await ethers.Wallet.createRandom().encrypt(password);
    fs.writeFileSync("deployer.json", wallet);
}

function properties(name) {
    return process.env[name];
}

// async function main() {
//     await generateMnemonic();
// }

// main().catch(exception => console.log(exception))

module.exports = {
    node_url,
    accounts,
    properties
}
