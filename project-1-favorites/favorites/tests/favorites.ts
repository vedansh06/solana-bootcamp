import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Favorites } from "../target/types/favorites";
import BN from "bn.js";

describe("favorites", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Favorites as Program<Favorites>;

  it("sets favorites", async () => {
    await program.methods
      .setFavorites(
        new BN(7),
        "red",
        ["coding", "web3"]
      )
      .rpc();
  });
});
