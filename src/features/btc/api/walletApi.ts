import { request, AddressPurpose } from "sats-connect";
import type { BtcWalletConnection } from "../model/types";

export class BtcWalletApi {
  static async connectWallet(): Promise<BtcWalletConnection> {
    try {
      const getAddressOptions = {
        message: "Asigna",
      };

      const response = await request("wallet_connect", getAddressOptions);

      if (response.status === "error") {
        throw new Error("Failed to get wallet address");
      }

      const ordinalsAddressItem = response.result.addresses.find(
        (address) => address.purpose === AddressPurpose.Ordinals
      );

      if (!ordinalsAddressItem) {
        throw new Error("Ordinals address not found");
      }

      return {
        address: ordinalsAddressItem.address,
        publicKey: ordinalsAddressItem.publicKey || "",
      };
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error;
    }
  }

  static async signMessage(message: string, address: string): Promise<string> {
    try {
      const response = await request("signMessage", {
        address,
        message,
      });

      if (response.status === "error") {
        throw new Error("Failed to sign message");
      }

      return response.result.signature;
    } catch (error) {
      console.error("Error signing message:", error);
      throw error;
    }
  }
}
