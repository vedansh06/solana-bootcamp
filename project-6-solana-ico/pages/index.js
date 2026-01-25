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
    }
  }, [wallet.connected]);

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
      if (!program) return;

      const accounts = await program.account.data.all();
      if (accounts.length > 0) {
        setIcoData(accounts[0].account);
      }
    } catch (error) {
      console.log("Error fetching ICO data:", error);
    }
  };

  const createIcoAta = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) return alert("Invalid amount");
      if (!wallet.publicKey) return;

      setLoading(true);
      const program = getProgram();
      if (!program) return;

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

      await program.methods
        .createIcoAta(new BN(amount))
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

      alert("ICO Initialized");
      await fetchIcoData();
    } catch (error) {
      alert(`Error: ${error.toString()}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const depositIco = async () => {
    try {
      if (!amount || parseInt(amount) <= 0) return alert("Invalid amount");
      if (!wallet.publicKey) return;

      setLoading(true);
      const program = getProgram();
      if (!program) return;

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

      await program.methods
        .depositIcoInAta(new BN(amount))
        .accounts({
          icoAtaForIcoProgram: icoAtaPda,
          data: dataPda,
          icoMint: ICO_MINT,
          icoAtaForAdmin: adminIcoAta,
          admin: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();

      alert("Deposited");
      await fetchIcoData();
    } catch (error) {
      alert(`Error: ${error.toString()}`);
      console.log(error);
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
    <div>
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
      </main>
    </div>
  );
}
