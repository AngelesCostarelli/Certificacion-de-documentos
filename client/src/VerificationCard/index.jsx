import React from "react";
import { useContextProvider } from "../Context/UserContext";
import "../VerificationCard/VerificationCard.css";
export default function VerificationCard() {
  const { data, transactionHash } = useContextProvider();
  return (
    <div>
      <div className="vCard">
        Tu documento esta certificado en blockchain!
        <h5>Numero de Bloque</h5>
        <p>{data.block_num}</p>
        <h5>Hash de la transaccion</h5>
        <p>{transactionHash}</p>
        <a
          href={"https://rinkeby.etherscan.io/tx/" + transactionHash}
          target="_blank"
        >
          https://rinkeby.etherscan.io/
        </a>
      </div>
    </div>
  );
}
