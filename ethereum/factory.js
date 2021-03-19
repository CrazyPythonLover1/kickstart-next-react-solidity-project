import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x4d2805EF18c891B54B3220CaeD6f4112da218023'
);

export default instance;