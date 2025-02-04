export interface Inventaire{
    id : string,
    produitId :string,
    stock : Record<string, number>, // Record<magasinId, stock>
}