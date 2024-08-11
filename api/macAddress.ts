import {Api} from '.';

export const checkMacAdress = async (body: {mac_address: string}) => {
  return await Api.post('mac-address/check-status', body);
};

export const getChannelByMA = async (mac: string) => {
  return await Api.get('ListChannels/' + mac);
};
