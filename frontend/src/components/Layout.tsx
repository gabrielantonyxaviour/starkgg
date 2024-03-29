import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import DisconnectModal from "./Modals/DisconnectModal";
import Link from "next/link";
import WalletButton from "./WalletButton";
import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { address } = useAccount();
  const [openDisconnectModal, setOpenDisconnectModal] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log("address", address);
  }, [address]);
  return address ? (
    <div>
      {openDisconnectModal && (
        <DisconnectModal closeModal={() => setOpenDisconnectModal(false)} />
      )}
      <div className="flex justify-between">
        <Link
          href={"/"}
          className="ml-8 mt-6 font-bold font-logo  text-3xl italic text-[#FAFB63] "
        >
          StarkGG
        </Link>
        <WalletButton
          address={address}
          onClick={() => {
            setOpenDisconnectModal(true);
          }}
        />
      </div>
      <Sidebar />
      {children}
    </div>
  ) : (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
      <Link
        href={"/"}
        className="mt-20 bg-gradient-to-r from-[#6BFFF7] to-[#FAFB63] rounded-md p-3 font-bold italic text-lg text-black"
      >
        CONNECT WALLET
      </Link>
    </div>
  );
}
