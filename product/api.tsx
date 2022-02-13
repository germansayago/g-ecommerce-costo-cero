import axios from "axios";
import Papa from 'papaparse'
import { Product } from "./types";

export default {
  list: async(): Promise<Product[]> => {
    return axios
            .get('https://docs.google.com/spreadsheets/d/e/2PACX-1vRblh7cI-PvQD-T-ZW_BWtyHxm3F-plszW8LeMX7Jl3kqjJGiSxhpR987cYgtIAOFV_5zmNvf8Sv-2h/pub?output=csv', { responseType: 'blob'})
            .then(
              (response) =>
                new Promise<Product[]> ((resolve, reject) => {
                  Papa.parse(response.data, {
                    header: true,
                    complete: results => {
                      const products = results.data as Product[]

                      return resolve(products.map(product => ({
                        ...product,
                        price: Number(product.price)
                      })))
                    },
                    error: (error) => reject(error.message)
                  });
                }),
            );
  },
}