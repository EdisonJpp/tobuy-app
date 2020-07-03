import React, { useState } from 'react';
import { Zoom } from 'react-slideshow-image';
import Loader from '../../loader';
import { Link, RouteComponentProps } from 'react-router-dom';
import { orderPublication } from '../../../entities/publications/publicationEntitie';
import Cart from '../../index/body/img/cart.png';
interface props extends RouteComponentProps<any> {
    addCart: (cart: any) => void;
    result: any[];
    screenLoadingOfResult: false;
};
const SearchResult: React.FC<props> = (props: props) => {
    const zoomOutProperties = {
        duration: 9000,
        transitionDuration: 100,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
    };
    const [result, newResutl] = useState({
        orderByPrice: '',
    });
    const filterPost = (orderBy: any) => (a: orderPublication, b: orderPublication) => {
        const aa: number = a.price;
        const bb: number = b.price;
        return orderBy === 'asc' ? (aa - bb) : (bb - aa);
    };
    const activeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        value === 'asc' ? newResutl({ orderByPrice: 'asc' }) : newResutl({ orderByPrice: 'desc' });
    };
    const userData = JSON.parse(localStorage.getItem('userData')!);
    return (
        <div className=''>
            {
                props.result && props.result.length !== 0 && <div className='align-self-center d-flex justify-content-end'>
                    ordenar  <select name="orderByPrice"
                        onChange={activeFilter}
                    >
                        <option>ordenar por</option>
                        <option value='asc'>mas baratos</option>
                        <option value='desc'>mas caros</option>
                    </select>
                </div>
            }
            <div className='d-flex flex-wrap w-100'>
                {
                    props.screenLoadingOfResult && <Loader />
                }
                {props.result && props.result.length === 0 ? <h2>no hay resultados</h2> : props.result && props.result.sort(filterPost(result.orderByPrice)).map((p: any, i: number) => {
                    return (
                        <div className="card p col-md-3 col-sm-6  col-6" id='publication' key={i}>
                            {
                                userData &&
                                <div className="dropdown ml-0 d-flex  ">
                                    <img src={Cart} className=' shoppingCart dropdown-toggle dropdown-toggle-split' alt='hola' />
                                    <div className="dropdown-menu items dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                        <div className="">
                                            <li className="dropdown-item" onClick={() => props.addCart(p)}>
                                                agregar al carrito
                                                                  </li>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="card-body flex-column">
                                <div className="w-100 h-100" >
                                    {
                                        p.image_name.length <= 1 ?
                                            <Link to={`/publications/${p.id}`}> <img className='img  img-fluid' alt='recentPublications' src={`https://tobuy-com-20.herokuapp.com/uploads/${p.image_name[0]}`} /> </Link>
                                            :
                                            <Zoom className='' {...zoomOutProperties} >
                                                {
                                                    p.image_name.map((each: any, index: number) => {
                                                        return (
                                                            <Link to={`/publications/${p.id}`} key={index}>  <img key={index} className='imgH  img-fluid' alt='recentPublications' src={`https://tobuy-com-20.herokuapp.com/uploads/${each}`} />  </Link>
                                                        );
                                                    })
                                                }
                                            </Zoom>
                                    }
                                    <h4 className='text-truncate'> price: ${p.price} </h4>
                                    <h5 className=' text-truncate'>  {p.title}  </h5>
                                </div>
                            </div>
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
};
export default SearchResult;