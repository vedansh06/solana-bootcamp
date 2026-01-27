// pages/index.js - UPDATED
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
} from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import {
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  getAccount,
} from "@solana/spl-token";
import IDL from "../idl/idl.json";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Tokenomics from "../components/Tokenomics";
import Roadmap from "../components/Roadmap";
import Features from "../components/Features";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton,
    ),
  { ssr: false },
);

const ENV_PROGRAM_ID = process.env.NEXT_PUBLIC_PROGRAM_ID;
const ENV_ICO_MINT = process.env.NEXT_PUBLIC_ICO_MINT;

const PROGRAM_ID = new PublicKey(ENV_PROGRAM_ID);
const ICO_MINT = new PublicKey(ENV_ICO_MINT);
const TOKEN_DECIMALS = new BN(1_000_000_000);

export default function Home() {
  const { connection } = useConnection();
  const wallet = useWallet();

  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [icoData, setIcoData] = useState(null);

  const [amount, setAmount] = useState("");
  const [userTokenBalance, setUserTokenBalance] = useState("0");

  useEffect(() => {
    if (wallet.connected) {
      checkIfAdmin();
      fetchIcoData();
      fetchUserTokenBalance();
    } else {
      // Reset state when wallet disconnects
      setIsAdmin(false);
      setIcoData(null);
      setUserTokenBalance("0");
    }
  }, [wallet.connected, wallet.publicKey]);

  const getProgram = () => {
    if (!wallet.connected) return null;

    const provider = new AnchorProvider(connection, wallet, {
      commitment: "confirmed",
    });

    return new Program(IDL, PROGRAM_ID, provider);
  };

  const checkIfAdmin = async () => {
    try {
      const program = getProgram();
      if (!program || !wallet.publicKey) return;

      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId,
      );

      try {
        const data = await program.account.data.fetch(dataPda);
        setIsAdmin(data.admin.equals(wallet.publicKey));
      } catch {
        const accounts = await program.account.data.all();
        if (accounts.length === 0) setIsAdmin(true);
        else setIsAdmin(false);
      }
    } catch (error) {
      console.log("Error checking admin:", error);
      setIsAdmin(false);
    }
  };

  const fetchIcoData = async () => {
    try {
      const program = getProgram();
      if (!program || !wallet.publicKey) return;

      const accounts = await program.account.data.all();
      console.log("Fetched ICO accounts:", accounts);

      if (accounts.length > 0) {
        setIcoData(accounts[0].account);
        console.log("ICO Data set:", accounts[0].account);
      } else {
        setIcoData(null);
        console.log("No ICO data found");
      }
    } catch (error) {
      console.log("Error fetching ICO data:", error);
      setIcoData(null);
    }
  };

  const createIcoAta = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) {
        alert("Please enter a valid token amount (e.g., 1000000)");
        return;
      }
      if (!wallet.publicKey) return;

      setLoading(true);
      const program = getProgram();
      if (!program) {
        setLoading(false);
        return;
      }

      const [icoAtaPda] = PublicKey.findProgramAddressSync(
        [ICO_MINT.toBuffer()],
        program.programId,
      );

      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId,
      );

      const adminIcoAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey,
      );

      // Check if admin's token account exists, if not create it
      let tokenAccountInfo;
      try {
        tokenAccountInfo = await getAccount(connection, adminIcoAta);
        console.log(
          "Admin token account exists. Balance:",
          tokenAccountInfo.amount.toString(),
        );

        // Check if admin has enough tokens
        const tokenBalance = Number(tokenAccountInfo.amount);
        const requiredAmount = parseInt(amount) * 1e9; // Convert to base units (9 decimals)

        console.log(
          `Token balance: ${tokenBalance}, Required: ${requiredAmount}`,
        );

        if (tokenBalance < requiredAmount) {
          alert(
            `❌ Insufficient tokens! You have ${(tokenBalance / 1e9).toFixed(2)} tokens but need ${parseInt(amount)}.\n\nYou need ${((requiredAmount - tokenBalance) / 1e9).toFixed(2)} more tokens.`,
          );
          setLoading(false);
          return;
        }

        console.log("✓ Sufficient token balance confirmed");
      } catch (error) {
        console.log("Creating admin token account...");
        const createAtaIx = createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          adminIcoAta,
          wallet.publicKey,
          ICO_MINT,
        );
        const createAtaTx = new Transaction().add(createAtaIx);
        const signature = await wallet.sendTransaction(createAtaTx, connection);
        await connection.confirmTransaction(signature, "confirmed");
        console.log("Admin token account created");

        alert(
          `✓ Token account created!\n\nYou have ${(Number(tokenAccountInfo.amount) / 1e9).toFixed(2)} tokens available.\n\nYou can now initialize the ICO.`,
        );
      }

      const amountBN = new BN(parseInt(amount) * 1e9); // Convert to base units

      await program.methods
        .createIcoAta(amountBN)
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForAdmin: adminIcoAta,
          admin: wallet.publicKey,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
          rent: SYSVAR_RENT_PUBKEY,
        })
        .rpc();

      alert("✅ ICO Successfully Initialized!");
      setAmount("");
      // Fetch ICO data again to update UI
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await fetchIcoData();
    } catch (error) {
      console.error("Full error:", error);
      let errorMessage = "Failed to initialize ICO";

      if (error.message) {
        if (error.message.includes("already initialized")) {
          errorMessage = "ICO is already initialized";
        } else {
          errorMessage = error.message;
        }
      }

      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const depositIco = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) {
        alert("Please enter a valid deposit amount");
        return;
      }
      if (!wallet.publicKey) return;
      if (!icoData) {
        alert("ICO not initialized. Please initialize first.");
        return;
      }

      setLoading(true);
      const program = getProgram();
      if (!program) {
        setLoading(false);
        return;
      }

      const [icoAtaPda] = PublicKey.findProgramAddressSync(
        [ICO_MINT.toBuffer()],
        program.programId,
      );

      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), wallet.publicKey.toBuffer()],
        program.programId,
      );

      const adminIcoAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey,
      );

      const amountBN = new BN(parseInt(amount));

      await program.methods
        .depositIcoInAta(amountBN)
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForAdmin: adminIcoAta,
          admin: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      alert("✅ Tokens Successfully Deposited!");
      await fetchIcoData();
      setAmount("");
    } catch (error) {
      console.error("Full error:", error);
      let errorMessage = "Failed to deposit tokens";

      if (error.message) {
        if (error.message.includes("AccountNotInitialized")) {
          errorMessage =
            "ICO account not initialized. Please initialize ICO first.";
        } else if (error.message.includes("insufficient")) {
          errorMessage = "Insufficient token balance in your wallet";
        } else {
          errorMessage = error.message;
        }
      }

      alert(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const buyTokens = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) return alert("Invalid amount");
      if (!wallet.publicKey || !icoData) return;

      setLoading(true);
      const program = getProgram();
      if (!program) return;

      const solCost = parseInt(amount) * 0.001;
      const balance = await connection.getBalance(wallet.publicKey);

      if (balance < solCost * 1e9 + 5000)
        return alert(`Need ${solCost} SOL + fee`);

      const [icoAtaPda, bump] = PublicKey.findProgramAddressSync(
        [ICO_MINT.toBuffer()],
        program.programId,
      );

      const [dataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("data"), icoData.admin.toBuffer()],
        program.programId,
      );

      const userAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey,
      );

      try {
        await getAccount(connection, userAta);
      } catch {
        const ix = createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          userAta,
          wallet.publicKey,
          ICO_MINT,
        );
        const tx = new Transaction().add(ix);
        await wallet.sendTransaction(tx, connection);
      }

      await program.methods
        .buyTokens(bump, new BN(amount))
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForUser: userAta,
          user: wallet.publicKey,
          admin: icoData.admin,
          tokenProgram: TOKEN_PROGRAM_ID,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      alert(`Purchased ${amount}`);
      fetchUserTokenBalance();
    } catch (error) {
      alert(`Error: ${error.toString()}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTokenBalance = async () => {
    if (!wallet.publicKey) return;
    try {
      const userAta = await getAssociatedTokenAddress(
        ICO_MINT,
        wallet.publicKey,
      );
      try {
        const tokenAccount = await getAccount(connection, userAta);
        setUserTokenBalance(tokenAccount.amount.toString());
      } catch {
        setUserTokenBalance("0");
      }
    } catch (e) {
      console.log(e);
      setUserTokenBalance("0");
    }
  };

  return (
    <div className="bg-gray-900">
      <Navbar />
      <main>
        <HeroSection
          wallet={wallet}
          isAdmin={isAdmin}
          loading={loading}
          icoData={icoData}
          amount={amount}
          userSolBalance={userTokenBalance}
          userTokenBalance={userTokenBalance}
          setAmount={setAmount}
          createIcoAta={createIcoAta}
          depositIco={depositIco}
          buyTokens={buyTokens}
        />
        <Tokenomics />
        <Roadmap />
        <Features />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
