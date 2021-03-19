import Web3 from 'web3';

let web3;

const arrayNumber = [3,3 ,3 ,3]

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // we are in the browser and metamask is running
    web3 = new Web3(window.ethereum);
    // web3 = new Web3(window.web3.currentProvider);
} else {
    // we are on the server *OR* the user is not running metamask
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/89d6185664614a84b0abe34f0ba115b8'
    );

    web3 = new Web3(provider);
}


export default web3