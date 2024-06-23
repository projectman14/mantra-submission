export * from './codegen';

import { contracts } from './codegen';

import { CosmWasmClient , SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { SigningStargateClient, StargateClient , GasPrice  } from "@cosmjs/stargate";
const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const { assertIsBroadcastTxSuccess } = require("@cosmjs/stargate");

import { PaymasterfactorynewClient , PaymasterfactorynewQueryClient } from './codegen/Paymasterfactorynew.client';



const mnemonic = "fuel grunt humor output offer box bridge hover motor code spoon token have order grief medal sport bulk corn pave market insane access urge"; //your memonic
const contractAddress = "mantra12he2zga68ruefvzpftkxqudnjgq9erfsh9pvaud0ja24xgf3pxsqkc3jtv";

async function connect() {

    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix: "mantra" });
    const [{ address }] = await wallet.getAccounts();

    const rpcEndpoint = "https://rpc.hongbai.mantrachain.io"

    const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

    // console.log("Connected to node", await client.getChainId())
    // console.log("Account address:", address)

    return {client , address}
}


export async function getCosmWasmClient(
    rpcEndpoint: string,
    mnemonic: string | undefined,
    prefix: string
  ): Promise<CosmWasmClient> {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    const [account] = await wallet.getAccounts();
    const client = await CosmWasmClient.connect(rpcEndpoint)
    return client ; 
  }


  async function getSigningCosmWasmClient(
    rpcEndpoint: string,
    mnemonic:string | undefined,
    prefix: string
  ): Promise<SigningCosmWasmClient> {
    // Create a wallet from the mnemonic
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, { prefix });
    const [account] = await wallet.getAccounts();
    
    // Connect to the blockchain with the signer
    const client = await SigningCosmWasmClient.connectWithSigner(
      rpcEndpoint,
      wallet,
      {
        gasPrice: GasPrice.fromString('0.0001uom'),
      }
    );

  
    return client;
  }


  export async function GetPaymasterAccountInfo() {
    const client = await getCosmWasmClient("https://rpc.hongbai.mantrachain.io" , mnemonic , "mantra");
    const dinonum = new PaymasterfactorynewQueryClient(client , contractAddress);

    return dinonum;
  }

  export async function MakePayMasterAccount() {
    const senderAddress = "mantra1eqpxy66m8hr4v8njncg68p5melwlgq93kqt5nm";
    const client = await getSigningCosmWasmClient("https://rpc.hongbai.mantrachain.io" , mnemonic , "mantra");

    const dinonum = new PaymasterfactorynewClient(client , senderAddress , contractAddress);
    
    return dinonum;
  }



