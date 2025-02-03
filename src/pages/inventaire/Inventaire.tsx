import React from "react";
import "./Inventaire.css";
import {useState} from "react";
import { 
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";



function Inventaire() {

    type Inventaire = {
        date : string,
        produitId : string,
        stock : Record<string, number>,
    }

    const produits= [
        { id: "P1", name: "Produit 1" },
        { id: "P2", name: "Produit 2" },
        { id: "P3", name: "Produit 3" },
    ];
      
    const magasins = ["Magasin 1", "Magasin 2", "Magasin 3"];

    const  [inventaire, setInventaire] = useState<Inventaire>({
        date : "",
        produitId : "",
        stock : {},
    });

    const handleChangeStock = (magasin: string, stock: number) => {
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

    const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInventaire({
          ...inventaire,
          date: event.target.value,
        });
    };

    const handleSubmit = () => {
        console.log("Inventaire soumis", inventaire);
    }

    const handleStorage = () => {
        localStorage.setItem("inventaire", JSON.stringify(inventaire));
    }


    
    return(
        <>  <div className=" container1">
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
                        onChange = {handleChangeDate}
                    />
                </div>

                <div className="container4">
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">  Produits</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={inventaire.produitId}
                            label="Selectionner un produit"
                            onChange={handleChangeProduit}

  >                         {produits.map((produit) => (
                                    <MenuItem key={produit.id} value={produit.id}>
                                        {produit.name}
                                    </MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                </div>

                {magasins.map((magasin) => (
                    <div className="container5" key={magasin}>
                        <TextField
                            id="demo-helper-text-aligned"
                            label={magasin}
                            onChange={(e) => handleChangeStock(magasin, Number(e.target.value))}
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
                        onClick={() => { handleSubmit(); handleStorage(); }}>
                        Editer
                    </Button>

                </div>
            </div>
        
        </>
    )


};

export default Inventaire;