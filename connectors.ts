import { InjectedConnector } from "@web3-react/injected-connector";

const ropsten = process.env.ROPSTEN_URL || "";
export const injected = new InjectedConnector({
  supportedChainIds: [5, 1337]
});
