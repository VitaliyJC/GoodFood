import React, { useState } from "react";
import './Product.scss'
import BuyTogether from '../../components/BuyTogether/BuyTogether'
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import plusIcon from "./img/icon-plus.png";
import minusIcon from "./img/icon-minus.png";
import unlikesIcon from '../../images/likes-icon.svg'
import likedIcon from '../../images/addfavorite.svg'
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites } from "../../redux/favoritesReducer";
import { AddToCartBtn } from "../../components/AddToCartBtn/AddToCartBtn";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';


export const ProductPage = () => {
  const favoritesItems = useSelector((state) => state.favorites.products)
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1);
  const id = useParams().id;
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  const selectedCats = data?.attributes?.categories?.data[0]?.id !== 1 ? data?.attributes?.categories?.data[0]?.id : data?.attributes?.categories?.data[1]?.id

  const favoriteObj = {
    id: data?.id,
    title: data?.attributes?.title,
    desc: data?.attributes?.desc,
    price: data?.attributes?.price,
    img: data?.attributes?.img?.data?.attributes?.url,
    totalPriceItem: data?.attributes?.price,
    category: data?.attributes?.categories?.data[0]?.attributes?.title,
    isFavorite: true,
    quantity: 1,
  }

  const isFavorite = favoritesItems.reduce((res, obj) => {
    if (obj.id === Number(id)) {
      return obj['isFavorite']; // возвращаем только одно значение
    } else {
      return res;
    }
  }, false);

  console.log('data', data)
  console.log('category', selectedCats)

  return (
    <div className='product'>
      {error
        ? <Alert severity="error">Something went wrong!</Alert>
        : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <CircularProgress color="success"/>
          </Box>
        ) : (
          <div className='product__content'>
            <a className='product__content__link' href='/catalog'>
              Back to catalog
            </a>
            <div className='product__content__title'>
              <div className='alignLeft'>
                <div className='alignCenter'>
                  <div className='product__content__heading'>{data?.attributes?.title}</div>
                  <div className='product__content__shortLine'></div>
                </div>
                <div className='price_text'>${(Number(data?.attributes?.price)).toFixed(2)}</div>
              </div>
              {addToFavorites && (
                <div className='product__content__boxfavorite' onClick={() =>
                  dispatch(addToFavorites(favoriteObj))}>
                  <img width={'30px'} height={'30px'}
                       src={isFavorite ? likedIcon : unlikesIcon}
                       alt="Unliked"
                  />
                </div>
              )}
            </div>

            <div className='product__content__box'>
              <div className='product__content__boxleft'>
                <img
                  className='product__content__img'
                  src={
                    process.env.REACT_APP_UPLOAD_URL +
                    data?.attributes?.img?.data?.attributes?.url
                  }
                  alt={data?.attributes?.title}
                />

                <div className="count_block">

                  <AddToCartBtn
                    id={data?.id}
                    title={data?.attributes.title}
                    desc={data?.attributes.desc}
                    price={data?.attributes.price}
                    img={data?.attributes.img.data.attributes.url}
                    totalpriceitem={(Number(data?.attributes?.price) * quantity).toFixed(2)}
                    quantity={quantity}
                  />

                  <div className="count__controls">
                    <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))} type="button"
                            className="count_up">
                      <img className="count_up_img" src={minusIcon} alt="Increase"/>
                    </button>
                    <div className="count__box">
                      {quantity}
                    </div>
                    <button onClick={() => setQuantity((prev) => prev + 1)} type="button"
                            className="count_down">
                      <img className="count_down_img" src={plusIcon} alt="Decrease"/>
                    </button>
                  </div>
                </div>
              </div>

              <div className='product__content__boxright'>
                <div className='product__content__text'>
                  <span>Description: {data?.attributes?.desc}</span>
                </div>
                <div className='product__content__text'>
                  <span> Brand: {data?.attributes?.brand}</span>
                </div>
                <div className='product__content__text'>
                  <span>Country: {data?.attributes?.country}</span>
                </div>
                <div className='product__content__text'>
                  <span>Volume: {data?.attributes?.volume_unit}</span>
                </div>
              </div>
            </div>
            {/* нижний блок Покупают вместе - отдельный компонент */}
            <BuyTogether selectedCats={selectedCats}/>
          </div>
        )}
    </div>
  );
};

export default ProductPage
