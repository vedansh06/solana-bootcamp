import {
  createNft,
  fetchDigitalAsset,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  getExplorerLink,
  getKeypairFromFile,
} from "@solana-developers/helpers";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import {
  generateSigner,
  keypairIdentity,
  percentAmount,
  publicKey,
} from "@metaplex-foundation/umi";

const connection = new Connection(clusterApiUrl("devnet"));
const user = await getKeypairFromFile();

console.log("Loaded user", user.publicKey.toBase58());

const umi = createUmi(connection.rpcEndpoint);
umi.use(mplTokenMetadata());

const umiUser = umi.eddsa.createKeypairFromSecretKey(user.secretKey);
umi.use(keypairIdentity(umiUser));

console.log("Set up Umi instance for user");

const mint = generateSigner(umi);

const collectionAddress = publicKey(
  "AC99xRoVaKuHyPGFKrTz1ysQRstbdLjpm6LAvMS46FLZ"
);

console.log("Creating NFT...");

const transaction = await createNft(umi, {
  mint,
  name: "My NFT",
  symbol: "MNFT",
  uri: "https://raw.githubusercontent.com/solana-developers/professional-education/main/labs/sample-nft-offchain-data.json",
  sellerFeeBasisPoints: percentAmount(0),
  collection: {
    key: collectionAddress,
    verified: false,
  },
});

await transaction.sendAndConfirm(umi, {
  confirm: { commitment: "finalized" },
});

console.log("Transaction confirmed! Waiting for account propagation...");

await new Promise((resolve) => setTimeout(resolve, 2000));

console.log("Fetching digital asset...");

const createdNft = await fetchDigitalAsset(umi, mint.publicKey);

console.log(
  `✅ Created NFT! Address is ${getExplorerLink(
    "address",
    createdNft.mint.publicKey,
    "devnet"
  )}`
);
