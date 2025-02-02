import React from "react";
import "./Liste.css";
import { useEffect, useState } from 'react';


type Liste = {
  magasin: {
      id: string;
      nom: string ;
      adresse : string; 
    };

  produit :[{
    id: string;
    nom: string ;
    prix : number;

  }];

  nbr_P: number;
  stock: number;
};

function Liste () {

    const [liste_Stat, setListe_Stat] = useState<Liste[]>([]);

    useEffect(() => {
      const fetchData = async () => {
        const data: Liste[] = [
          { 
            magasin: { 
            id: "M1", 
            nom: "Magasin 1", 
            adresse: "adr 1" }, 

            produit :[{
            id: "P1",
            nom: "Produit 1" ,
            prix : 1,
            }],

            nbr_P: 10,
            stock: 250 },

          { 
            magasin: { 
              id: "M2", 
              nom: "Magasin 2", 
              adresse: "adr 2" 
            },
            
            produit :[{
              id: "P2",
              nom: "Produit 2" ,
              prix : 12,
            }],
            
            nbr_P: 7, 
            stock: 180 
          },

          {
            magasin: { 
              id: "M3", 
              nom: "Magasin 3", 
              adresse: "adr 3"
            },
            
            produit :[{
              id: "P3_1",
              nom: "Produit 3" ,
              prix : 123,
            },
            // {
            //   id: "P3_2",
            //   nom: "Produit 3" ,
            //   prix : 1233,
            // }
            ],
            nbr_P: 17, 
            stock: 10 
          },
        ];

        setListe_Stat(data);
      };
  
      fetchData();
    }, []);

  return (
    <div className="containerL1">
      <div className="containerL2">
        <h1>  Liste statistique</h1>
      </div>
      <div className="containerL3" >
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
        
      
    </div>
  );
};

export default Liste;
