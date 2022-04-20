import React, { useEffect, useRef, useState } from "react";
import Web3 from "web3";
import "./Files.css";
import { useContextProvider, UserContext } from "./UserContext";
import { sha256 } from "js-sha256";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const node = "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_sha256",
        type: "string",
      },
    ],
    name: "setDocument",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_sha256",
        type: "string",
      },
    ],
    name: "getDocument",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "exists",
        type: "bool",
      },
      {
        internalType: "bytes32",
        name: "kec",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "block_num",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_sha256",
        type: "string",
      },
    ],
    name: "verifier",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const contractAddress = "0x09de66b4bf9e1101eab3550d27ef3e385141b9b6";

export default function Files() {
  const {
    archivos,
    data,
    sha,
    transactionHash,
    setArchivos,
    setData,
    setSha,
    setTransactionHash,
  } = useContextProvider();

  const [flag, setFlag] = useState(false);
  const [sending, setSending] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [verify, setVerify] = useState("");
  const [connect, setConnect] = useState("");

  const input1 = useRef(null);
  const input2 = useRef(null);
  useEffect(() => {
    isConnect();
  }, [sending]);
  function isConnect() {
    const netWorkId = 4;
    const web3 = new Web3(window.ethereum);
    // console.log("entra");
    // window.ethereum.on("chainChanged", (e) => {
    //   console.log("----");
    //   if (netWorkId === e) {
    //     console.log("correct");
    //   } else {
    //     console.log("incorrect", e);
    //   }
    // });
    // const web3 = new Web3(node);
    web3.eth.net
      .getId()
      .then((id) => {
        if (id !== netWorkId) {
          setConnect("disconnected");
        } else {
          setConnect("connected");
        }
      })
      .catch((error) => console.log("Wow. Something went wrong: " + error));
  }
  function convertToBase64(files) {
    setArchivos(files[0]);
    Array.from(files).forEach((f) => {
      var reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = function () {
        var auxiliar = [];
        var base64 = reader.result;
        auxiliar = base64.split(",");
        setSha(sha256(auxiliar[1]));
      };
    });
  }

  function getDocument(bandera) {
    const web3 = new Web3(node);
    const document = new web3.eth.Contract(abi, contractAddress);
    document.methods
      .getDocument(sha)
      .call()
      .then((e) => {
        const d = {
          ...data,
          timestamp: e.timestamp,
          user: e.user,
          exists: e.exists,
          kec: e.kec,
          block_num: e.block_num,
        };
        if (bandera) {
          getTransaction(d);
        }
        setData(d);
      });
  }

  function setDocument() {
    if (connect === "connected") {
      setSending(true);
      setTransactionHash(null);

      window.ethereum.enable().then((account) => {
        const web3 = new Web3(window.ethereum);
        const document = new web3.eth.Contract(abi, contractAddress);

        document.methods
          .setDocument(sha)
          .send({ from: account[0] })
          .on("transactionHash", (transactionHash) =>
            setTransactionHash(transactionHash)
          )
          .on("receipt", (receipt) => {
            setSending(false);
            setReceipt(receipt);
          });
      });
    } else if (connect === "disconnected") {
      alert("Error! Metamask debe estar conectada a la red Rinkeby");
    }
  }

  function verifier() {
    const web3 = new Web3(node);
    const document = new web3.eth.Contract(abi, contractAddress);
    document.methods
      .verifier(sha)
      .call()
      .then((e) => setVerify(e));
  }

  function getTransaction(data) {
    const web3 = new Web3(node);

    web3.eth.getBlock(Number(data.block_num)).then((e) => {
      console.log(e);
      e.transactions.map((e) => {
        web3.eth.getTransactionReceipt(e).then((f) => {
          if (f.to === contractAddress) {
            setTransactionHash(f.transactionHash);
          }
        });
      });
    });
  }
  return (
    <UserContext.Provider
      value={{
        archivos,
        transactionHash,
        sha,
        data,
      }}
    >
      <div>
        <Navbar />

        <div className="head">
          Necesita tener instalada en su navegador la extensión de Metamask,
          poder para conectarse a la red Ethereum
        </div>

        <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-header ">Certificar Documento</div>
              <div className="card-body">
                <h5 className="card-title">
                  Selecciona un archivo para certificarlo en blockchain
                </h5>
                <p className="card-text">
                  Solo registraremos el hash keccak256 del archivo por lo que no
                  accedemos a su contenido
                </p>

                <div>
                  <div className="mb-3">
                    <label className="form-label"></label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      ref={input1}
                      onChange={(e) => convertToBase64(e.target.files)}
                    />
                  </div>
                </div>
                <br />
                <br />
                {archivos ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setDocument();
                      input1.current.value = "";
                    }}
                    disabled={sending}
                  >
                    CERTIFICAR
                  </button>
                ) : (
                  <button className="btn btn-primary">CERTIFICAR</button>
                )}
                {sending === true ? (
                  <>
                    <br />
                    <div class="alert alert-danger" role="alert">
                      Espera a que la transaccion sea confirmada
                    </div>
                  </>
                ) : null}

                <div>
                  {receipt ? (
                    <div>
                      <br />
                      <Link to={"/certificado"}>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            getDocument();
                            setFlag(true);
                          }}
                        >
                          OBTENER CERTIFICADO
                        </button>
                      </Link>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6">
            <div className="card">
              <div className="card-header">Verificar Documento Certificado</div>
              <div className="card-body">
                <h5 className="card-title">
                  Selecciona un archivo para verificar que está certificado en
                  blockchain
                </h5>

                <p className="card-text">Buscaremos por su hash SHA-256</p>

                <div>
                  <div className="mb-3">
                    <label className="form-label"></label>
                    <input
                      className="form-control"
                      type="file"
                      id="formFile"
                      name="name"
                      ref={input2}
                      onChange={(e) => convertToBase64(e.target.files)}
                    />
                  </div>
                </div>
                <br />
                <br />
                {archivos ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      verifier();
                      getDocument(true);
                      input2.current.value = "";
                    }}
                  >
                    VERIFICAR
                  </button>
                ) : (
                  <div>
                    <button className="btn btn-primary">VERIFICAR</button>
                    <br />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {verify === true ? (
          <div>
            <div className="alert" role="alert">
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
            <br />
          </div>
        ) : null}
        {verify === false ? (
          <div className="alert alert-danger" role="alert">
            El documento no se encuentra certificado en la blockchain.
          </div>
        ) : null}
        <>
          {data.user ? (
            <Link to="/certificado">
              <button>certificado</button>{" "}
            </Link>
          ) : null}
        </>
      </div>
    </UserContext.Provider>
  );
}
