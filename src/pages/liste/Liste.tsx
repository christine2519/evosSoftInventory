import React from "react";
import "./Liste.css";
import { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
export const INVENTAIRE_STORAGE = "inventaires";
import { Box, Button, Grid,Select } from "@mui/material";
import { useNavigate } from "react-router";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Inventaire } from "./../inventaire/Inventaire";
import dayjs from "dayjs";
import { produits } from "../../__fake_data/Prouits.ts";
import { magasins } from "../../__fake_data/Magasins.ts";
import MenuItem from "@mui/material/MenuItem";
import { MUIDataTableMeta } from "mui-datatables";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useTranslation } from "react-i18next";

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

function Liste() {

  const { i18n, t } = useTranslation();

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newLang = event.target.value as string;
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
  };
  const columns = [
    {
      name: "date",
      label: t("Date inventaire"),
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

    {
      name: "stocks",
      label: t("Magasins et Stock"),
      options: {
        filter: false,
        sort: false,

        customBodyRender: (_: unknown, tableMeta: MUIDataTableMeta) => {
          const inventaire = liste_Stat[tableMeta.rowIndex];

          if (!inventaire || typeof inventaire.stock !== "object") {
            return 0;
          }

          if (
            !inventaire ||
            !inventaire.stock ||
            typeof inventaire.stock !== "object"
          ) {
            return "Aucun stock";
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
  ];

  const [liste_Stat, setListe_Stat] = useState<Inventaire[]>([]);
  console.log(liste_Stat);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem(INVENTAIRE_STORAGE);
    if (data) {
      // try {
        const formatedData = JSON.parse(data as string);
        setListe_Stat(formatedData as Inventaire[]);
    //   } catch (error) {
    //     console.error("Erreur lors du parsing de l'inventaire :", error);
    //   }
     }
  }, []);

  

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item md={12} xs={12} lg={12} sm={12}>
            {liste_Stat.length > 0 && (
              <MUIDataTable
                title="Liste des inventaires"
                data={liste_Stat}
                columns={columns}
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
          <Grid
            item
            md={12}
            xs={12}
            lg={12}
            sm={12}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/inventaire")}
              startIcon={<ModeEditIcon />}
              sx={{ position: "absolute" }}
            >
              Modifier
            </Button>
          </Grid>
        </Grid>

        <Select value={i18n.language} onChange={handleLanguageChange}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="fr">Français</MenuItem>
        </Select>
      </Box>
    </>
  );
}

export default Liste;
