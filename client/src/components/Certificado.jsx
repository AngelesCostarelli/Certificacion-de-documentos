import React, { useContext } from "react";

import { UserContext } from "./UserContext";
import {
  Document,
  Page,
  View,
  Text,
  PDFViewer,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import "./Certificado.css";

export default function Certificado() {
  const { archivos, transactionHash, data, sha } = useContext(UserContext);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  const s = StyleSheet.create({
    page: {
      width: "400px",
      height: "250px",
      backgroundColor: "#e8f8c1",
      margin: "auto",
      color: "#2a3c24",
      textAlign: "center",
      padding: "50px",
    },
    section: { margin: 10, padding: 10 },
    dato: { fontSize: 10, margin: "15px" },
    title: {
      fontWeight: "extrabold",
      margin: "15px",
      fontSize: "25px",
      color: "#87a330",
      marginBottom: "5px",
      borderBottom: "1px",
    },
    subtitle: { margin: "15px", color: "#a1c349" },
    image: { width: "160px", height: "47px" },
  });

  return (
    <PDFViewer style={{ width: "100%", height: "90rem" }}>
      <Document>
        <Page size="A4" style={s.page}>
          <Image
            style={s.image}
            src="https://www.caracteristicas.co/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg"
          />

          <View style={s.section}>
            <Text style={s.title}>CERTIFICADO DE EXISTENCIA</Text>
            <Text style={s.subtitle}>DATOS CRIPTOGRAFICOS</Text>

            <Text>Nombre del archivo</Text>
            <Text style={s.dato}>{archivos.name}</Text>
            <Text>Fecha de certificacion</Text>
            <Text style={s.dato}>{timeConverter(data.timestamp)}</Text>
            <Text>Hash sha-256</Text>
            <Text style={s.dato}>{sha}</Text>
            <Text>Hash keccak256 del documento</Text>
            <Text style={s.dato}>{data.kec}</Text>
            <Text>Hash de la transaccion en la blockchain</Text>
            <Text style={s.dato}>{transactionHash}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
