import React from "react";
import "./Inventaire.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Divider,
} from "@mui/material";
import { useTranslation} from "react-i18next";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

import { SelectChangeEvent } from "@mui/material";
import { produits } from "../../__fake_data/Prouits";
import { magasins } from "../../__fake_data/Magasins";

export const INVENTAIRE_STORAGE = "inventaires";

export type Inventaire = {
  date: string;
  produitId: string;
  stock: Record<string, number>;
};
function Inventaire() {
  const navigate = useNavigate();
  const { t } = useTranslation(); 

  const [inventaire, setInventaire] = useState<Inventaire>({
    date: "",
    produitId: "",
    stock: {},
  });

  console.log({ inventaire });

  const handleChangeStock = (magasin: string, stock: number) => {
    console.log({ magasin, stock });
    setInventaire((prevInventaire) => ({
      ...prevInventaire,
      stock: {
        ...prevInventaire.stock,
        [magasin]: stock,
      },
    }));
  };

  const handleChangeProduit = (event: SelectChangeEvent<string>) => {
    setInventaire({
      ...inventaire,
      produitId: event.target.value,
    });
  };
  const handleChangeDate = (date: Dayjs | null) => {
    if (!date) return;
    setInventaire({
      ...inventaire,
      date: date.toISOString(),
    });
  };

  

  const handleSubmit = () => {
    const prevInventaires = localStorage.getItem(INVENTAIRE_STORAGE);
    const parsedData = JSON.parse(prevInventaires as string) as Inventaire[];
    console.log({ parsedData });
    

    navigate("/liste");

    const newInventaires = [...(parsedData || []), inventaire];

    console.log({ newInventaires });
    localStorage.setItem(INVENTAIRE_STORAGE, JSON.stringify(newInventaires));

    setInventaire((prev) => ({
      date: prev.date,
      produitId: "",
      stock: {},
    }));
  };

  return (
    <>
      {" "}
      <Box
        sx={{
          height: "100vh",
          width: "100%",
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          paddingBlock: "auto",
        }}
      >
        <Card>
          <CardHeader title= {t("Inventaire")} />
          <Divider />
          <CardContent
            sx={{ backgroundColor: (theme) => theme.palette.primary.main + 10 }}
          >
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label= {t("Selectionnez la date")}
                      onChange={(e) => handleChangeDate(e!)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={5} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-produit"> Produits</InputLabel>
                  <Select
                    value={inventaire.produitId}
                    label={t("Selectionner un produit")}
                    onChange={handleChangeProduit}
                  >
                    {produits.map((produit) => (
                      <MenuItem key={produit.id} value={produit.id}>
                        {produit.nom}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={7} xs={12}>
                {inventaire.produitId && (
                  <Grid container spacing={1}>
                    {magasins.map((magasin) => (
                      <Grid
                        item
                        md={12}
                        xs={12}
                        sm={12}
                        lg={12}
                        key={magasin.id}
                      >
                        <TextField
                          id="demo-helper-text-aligned"
                          label={magasin.nom}
                           disabled
                          size="small"
                        />
                        <TextField
                          id="demo-helper-text-aligned-no-helper"
                          label= {`Stock de ${magasin.nom}`}
                          size="small"
                          type="number"
                          
                          sx={{ marginInline: 1 }}
                          onChange={(e) =>
                            handleChangeStock(
                              magasin.id,
                              Number(e.target.value)
                            )
                          }
                        />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <CardActionArea component="div">
            <Button onClick={() => handleSubmit()}>{t("Sauvegarder")}</Button>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
}

export default Inventaire;
