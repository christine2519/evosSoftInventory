import React from "react";
import "./Inventaire.css";
import { useState } from "react";
import { useNavigate, UseNavigate} from "react-router-dom";
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

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from 'dayjs';

import { SelectChangeEvent } from "@mui/material";
import { produits } from "../../__fake_data/Produits";
import { magasins } from "../../__fake_data/magasins";

export const INVENTAIRE_STORAGE = "inventaires";

export type Inventaire = {
    date: string;
    produitId: string;
    stock: Record<string, number>;
  };
function Inventaire() {
  const navigate = useNavigate();
  

  //   const produits = [
  //     { id: "P1", name: "Produit 1" },
  //     { id: "P2", name: "Produit 2" },
  //     { id: "P3", name: "Produit 3" },
  //   ];

  //   const magasins = ["Magasin 1", "Magasin 2", "Magasin 3"];

  const [inventaire, setInventaire] = useState<Inventaire>({
    date: "",
    produitId: "",
    stock: {},
  });

  console.log({inventaire});

  const handleChangeStock = (magasin: string, stock: number) => {
    console.log({magasin, stock})
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

  const handleChangeDate = (date: Dayjs) => {
    setInventaire({
      ...inventaire,
      date: dayjs(date).toISOString()
    });
  };

  const handleSubmit = () => {
    // console.log("Inventaire soumis", inventaire);

    const prevInventaires = localStorage.getItem(INVENTAIRE_STORAGE);
    const parsedData = JSON.parse(prevInventaires as string) as Inventaire[];
    console.log({parsedData})

    navigate("/liste")

    const newInventaires = [...parsedData || [], inventaire]
    // Avant de sauvegarger, on doit mapper les inventaires,  
    console.log({newInventaires})
    localStorage.setItem(INVENTAIRE_STORAGE, JSON.stringify(newInventaires));

    setInventaire((prev) => ({
        date: prev.date,
        produitId: '',
        stock: {}
    }))
  };

//   const handleStorage = () => {
//     localStorage.setItem(INVENTAIRE_STORAGE, JSON.stringify(inventaire));
//   };

  return (
    <>
      {" "}
      {/* <div className=" container1">
        <div className="container2">
          <h1> Inventaire </h1>
        </div>

        <div className="container7">
          <div className="container3">
            <label htmlFor="date">Date :</label>
            <input
              type="date"
              id="date"
              value={inventaire.date}
              onChange={handleChangeDate}
            />
          </div>

          <div className="container4">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label"> Produits</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={inventaire.produitId}
                label="Selectionner un produit"
                onChange={handleChangeProduit}
              >
                {" "}
                {produits.map((produit) => (
                  <MenuItem key={produit.id} value={produit.id}>
                    {produit.nom}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {magasins.map((magasin) => (
            <div className="container5" key={magasin.id}>
              <TextField
                id="demo-helper-text-aligned"
                label={magasin.nom}
                onChange={(e) =>
                  handleChangeStock(magasin.id, Number(e.target.value))
                }
              />
              <TextField
                id="demo-helper-text-aligned-no-helper"
                label="stock"
              />
            </div>
          ))}
        </div>

        <div className="container6">
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleSubmit();
              handleStorage();
            }}
          >
            Editer
          </Button>
        </div>
      </div> */}
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
          <CardHeader title="Inventaire" />
          <Divider />
          <CardContent sx={{backgroundColor: (theme) => theme.palette.primary.main + 10}}>
            {/* <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography variant="h5">Intentaire</Typography>
        </Box> */}
            <Grid container spacing={2}>
              <Grid item md={12} xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Selectionnez la date" onChange={(e) => handleChangeDate(e!)}/>
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item md={5} xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="select-produit"> Produits</InputLabel>
                  <Select
                    value={inventaire.produitId}
                    label="Selectionner un produit"
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
                          label={`Stock de ${magasin.nom}`}
                          size="small"
                          type="number"
                          // margin="normal"
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
          <CardActionArea>
            <Button onClick={() => handleSubmit()}>Sauvegarder</Button>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
}

export default Inventaire;
