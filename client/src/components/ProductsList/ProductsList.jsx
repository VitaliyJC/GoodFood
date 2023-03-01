import React from "react";
import "./ProductsList.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";

const ProductsList = ({ subCats, maxPrice, sort, catId }) => {
  const { data, loading, error } = useFetch(
      `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
          (item) => `&[filters][sub_categories][id][$eq]=${item}`
      )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );

  const filteredValue= useSelector((state) => state.search.inputValue)
console.log('filteredValue', filteredValue)

  const filtredItems = data?.filter((item) =>
    item.attributes.title.toLowerCase().includes(filteredValue.toLowerCase())
  );

  return (
    <div className="list">
      {loading
        ? "loading"
        : filtredItems?.map((item) => <Card item={item} key={item.id} />)}
    </div>
  );
};

export default ProductsList;
