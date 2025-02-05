import React from "react";
import "./Liste.css";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
export const INVENTAIRE_STORAGE = "inventaires";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Inventaire } from "./../inventaire/Inventaire";
import dayjs from "dayjs";
import { produits } from "../../__fake_data/Produits";
import { magasins } from "../../__fake_data/Magasins";
//import {Inventaire} from "../../models/Inventaire";
//import { Inventaire } from "./../inventaire/Inventaire";
import { MUIDataTableMeta } from "mui-datatables";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

// const columns = ["Name", "Company", "City", "State"];

// const options = {
//   filterType: "checkbox",
// };

type Liste = {
  magasin: {
    id: string;
    nom: string;
    adresse: string;
  };

  produit: [
    {
      id: string;
      nom: string;
      prix: number;
    },
  ];

  nbr_P: number;
  stock: number;
};

//const magasins = Object.keys(inventaire.stock);

function Liste() {
  const columns = [
    {
      name: "date",
      label: "Date inventaire",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value: string) => {
          return dayjs(value).format("YYYY-MM-DD");
        },
      },
    },
    {
      name: "produitId",
      label: "Produit",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value: string) => {
          const produit = produits.find((p) => p.id === value);
          return produit ? `${produit.nom} ${produit.prix} CFA` : "";
        },
      },
    },
    //   {
    // name: "stocks",
    // label: "Magasins et Stock",
    // options: {
    //   filter: false,
    //   sort: false,
    //   customBodyRender: (value, tableMeta) => {
    //     const inventaire = liste_Stat[tableMeta.rowIndex];
    //     return inventaire.magasins
    //       .map((magasin) => `${magasin.nom} : ${magasin.stock} unités`)
    //       .join(" | ");
    //   },
    {
      name: "stocks",
      label: "Magasins et Stock",
      options: {
        filter: false,
        sort: false,
        // customBodyRender: (_: unknown, tableMeta: MUIDataTableMeta) => {
        //   const inventaire = liste_Stat[tableMeta.rowIndex];

        //   if (!inventaire || typeof inventaire.stock !== "object") return "Aucun stock disponible";

        //   return Object.entries(inventaire.stock)
        //     .map(([magasinId, quantite]) => {
        //       const magasin = magasins.find((m) => m.id === magasinId);
        //       return magasin ? `${magasin.nom}: ${quantite} unités` : `Magasin inconnu: ${quantite} unités`;

        //     })
        //     .join("<br />");
        // },
        // customBodyRender: (_: unknown, tableMeta: MUIDataTableMeta) => {
        //   const inventaire = liste_Stat[tableMeta.rowIndex];

        //   return (
        //     <>
        //       {Object.entries(inventaire.stock).map(([magasin, stock]) => (
        //         <div key={magasin}>
        //           {magasin} : {stock} unités
        //         </div>
        //       ))}
        //     </>
        //   );
        // }

        customBodyRender: (_: unknown, tableMeta: MUIDataTableMeta) => {
          const inventaire = liste_Stat[tableMeta.rowIndex];

          if (!inventaire || typeof inventaire.stock !== "object") {
            return 0;
          }

          return (
            <div>
              {Object.entries(inventaire.stock).map(([magasinId, quantite]) => {
                const magasin = magasins.find((m) => m.id === magasinId);
                return (
                  <div key={magasinId}>
                    {magasin
                      ? `${magasin.nom} : ${quantite} unités`
                      : `Magasin inconnu : ${quantite} unités`}
                  </div>
                );
              })}
            </div>
          );
        },
      },
    },

    // {
    //  name: "city",
    //  label: "City",
    //  options: {
    //   filter: true,
    //   sort: false,
    //  }
    // },
  ];

  const [liste_Stat, setListe_Stat] = useState<Inventaire[]>([]);
  console.log(liste_Stat);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data: Liste[] = [
  //       {
  //         magasin: {
  //           id: "M1",
  //           nom: "Magasin 1",
  //           adresse: "adr 1",
  //         },

  //         produit: [
  //           {
  //             id: "P1",
  //             nom: "Produit 1",
  //             prix: 1,
  //           },
  //         ],

  //         nbr_P: 10,
  //         stock: 250,
  //       },

  //       {
  //         magasin: {
  //           id: "M2",
  //           nom: "Magasin 2",
  //           adresse: "adr 2",
  //         },

  //         produit: [
  //           {
  //             id: "P2",
  //             nom: "Produit 2",
  //             prix: 12,
  //           },
  //         ],

  //         nbr_P: 7,
  //         stock: 180,
  //       },

  //       {
  //         magasin: {
  //           id: "M3",
  //           nom: "Magasin 3",
  //           adresse: "adr 3",
  //         },

  //         produit: [
  //           {
  //             id: "P3_1",
  //             nom: "Produit 3",
  //             prix: 123,
  //           },
  //         ],
  //         nbr_P: 17,
  //         stock: 10,
  //       },
  //     ];

  //     setListe_Stat(data);
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const data = localStorage.getItem(INVENTAIRE_STORAGE);
    const formatedData = JSON.parse(data as string);
    setListe_Stat(formatedData as Inventaire[]);
  }, []);

  return (
    <>
      {/* <div className="containerL1">
        <div className="containerL2">
          <h1> Liste statistique</h1>
        </div>
        <div className="containerL3">
          <table border={0} style={{ width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th>Magasins</th>
                <th>Produits</th>
                <th>nbre_Produits</th>
              </tr>
            </thead>
            <tbody>
              {liste_Stat.map((stat) => (
                <tr key={stat.magasin.id}>
                  <td>{stat.magasin.nom}</td>
                  <td>{stat.produit.length}</td>
                  <td>
                    {stat.produit.map((produit) => produit.nom).join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      <Box>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12} lg={12} sm={12}>
            {liste_Stat.length && (
              <MUIDataTable
                title="Liste des inventaires"
                data={liste_Stat}
                columns={columns}
                // options={options}
              />
            )}
          </Grid>
          <Grid item md={12} xs={12} lg={12} sm={12}>
            <Button
              variant="contained"
              onClick={() => navigate("/inventaire")}
              startIcon={<ControlPointIcon />}
            >
              Nouvel inventaire
            </Button>
          </Grid>
          <Grid item md={12} xs={12} lg={12} sm={12} 
            sx={{
              display:"flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",

          }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/inventaire")}
              startIcon={<ModeEditIcon />}
              sx={{position:"absolute"}} 
            >
              Modifier
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Liste;
