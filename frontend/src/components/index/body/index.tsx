import React from 'react';
import './css/publi.css';
import { Zoom } from 'react-slideshow-image';
import { RouteComponentProps, Link } from 'react-router-dom'
import Loader from '../../loader';
import { orderPublication } from '../../../entities/publications/publicationEntitie';
import SearchResult from '../../publications/searchResult_publication';
// import Offerts from '../../VIPofferts';
import Cart from './img/cart.png'
import Swal from 'sweetalert2';
type priceOrdering = 'desc' | 'asc';
interface state {
    currentPage: number,
    postPerPage: number,
    orderDescendente: boolean;
    orderAscendente: boolean;
    orderByPrice?: priceOrdering;
    category: string;
};
interface props extends RouteComponentProps<any> {
    ReducerPublications: () => void;
    getPostBycategory: (categoryId: number) => void;
    postByCategory: any[];
    publications: any[];
    screenLoading: Boolean;
    resultOfSearch: any[];
    postByCategoryFailed: any;
    addCart: (cart: any) => void;
    getCart: (userId: number) => void;
    cartData: any[];
};
class Body extends React.PureComponent<props, state>{
    constructor(props: props) {
        super(props);
        this.state = {
            currentPage: 1,
            postPerPage: 16,
            orderDescendente: false,
            orderAscendente: false,
            category: ''
        };
    };
    handleClick = (e: any) => {
        this.setState({
            currentPage: e.target.value
        });
    };
    category = async (categoryId: number) => {
        await this.props.getPostBycategory(categoryId);
        this.props.history.push(`/category/${categoryId}`);
    };
    filterPost = (orderBy: priceOrdering) => (a: orderPublication, b: orderPublication) => {
        console.log(orderBy);
        const aa: number = a.price;
        const bb: number = b.price;
        return orderBy === 'asc' ? (aa - bb) : (bb - aa);
    };
    activeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        value === 'asc' ? this.setState({ orderByPrice: 'asc' }) : value === 'desc' ? this.setState({ orderByPrice: 'desc' }) : console.log('any');
    };
    addCart = async (post: any) => {
        const userData = JSON.parse(localStorage.getItem('userData')!);
        const userId = userData.user.id;
        const publicationId = post.id;
        await this.props.getCart(userId);
        const dataShoppingCart = this.props.cartData === undefined ? [] : this.props.cartData;
        const d = dataShoppingCart.find(e => e.publicationId === post.id);
        if (d) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'este anuncio ya existe en tu carrito',
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Agregado al carrito correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            const cart = { userId, publicationId };
            await this.props.addCart(cart);
            await this.props.getCart(userId);
        };
    };
    categoryName = (p : any)=>{
        const category = p.category.categorie_name ;
            this.setState({
                ...this.state,
                category
            });
    };
    render() {
        const zoomOutProperties = {
            duration: 9000,
            transitionDuration: 100,
            infinite: true,
            indicators: true,
            scale: 0.4,
            arrows: true
        };
        const publications = this.props.publications == undefined ? [] : this.props.publications;
        const postByCategory = this.props.postByCategory == undefined ? [] : this.props.postByCategory;
        const category = this.props.match.params.categoryId;
        const post: any[] = category ? this.props.postByCategoryFailed ? this.props.postByCategoryFailed : postByCategory : publications;
        const { currentPage, postPerPage } = this.state
        const indexOfLastPost = currentPage * postPerPage;
        const indexOfFirtPost = indexOfLastPost - postPerPage;
        const currenPostPager: any = post.slice(indexOfFirtPost, indexOfLastPost);
        const currenPostPager2: any[] = currenPostPager && category instanceof Object ? [] : currenPostPager;
        const pageNumber = [];
        for (let i = 1; i <= Math.ceil(publications.length / postPerPage); i++) { pageNumber.push(i) };
        const renderPageNumber = pageNumber.map((page, i) => {
            return (
                <li className={this.state.currentPage === page ? `page-item active` : 'page-item'} key={i} aria-current="page">
                    <li
                        className="page-link"
                        key={i}
                        value={page}
                        onClick={this.handleClick}
                    >
                        {page}
                    </li>
                </li>
            );
        });
        const order = this.state.orderByPrice ?
            currenPostPager2.sort(this.filterPost(this.state.orderByPrice)) :
            currenPostPager2;
        const userData = JSON.parse(localStorage.getItem('userData')!);
        const d = order === undefined ? [] : order;
        const p = d.map((p: any, i: number) => {
            {
             this.props.match.params.categoryId &&
             this.categoryName(p);
           

            }
            return (
                <div className="card p col-md-3 col-sm-6  col-6" id='publication' key={i}>
                    {
                        userData &&
                        <div className="dropdown ml-0 d-flex  ">
                            <img src={Cart} className=' shoppingCart dropdown-toggle dropdown-toggle-split' alt='hola' />
                            <div className="dropdown-menu items dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                                <div className="">
                                    <li className="dropdown-item" onClick={() => this.addCart(p)}>
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
                            <h4 className='text-truncate'> precio: ${p.price} </h4>
                            <h5 className=' text-truncate'>  {p.title}  </h5>
                        </div>
                    </div>
                </div>
            );
        });
        // console.log(this.state.category);
        return (
            <div className=''  >
                {/* {
                    this.props.match.params.text || this.props.match.params.categoryId ? console.log('any') :
                        <Offerts />
                } */}
                <br />
                <div className=' ' style={{}}>
                    <div className=" d-flex flex-wrap w-100">
                        {
                            this.props.screenLoading ? <Loader /> :
                                <div className='w-100'>
                                    <div>
                                        {
                                            this.props.match.params.categoryId && <nav aria-label="breadcrumb container ">
                                                <ol className="breadcrumb bg-light">
                                                    <li className="breadcrumb-item"><Link to='/'>inicio</Link></li>
                                                    <li className="breadcrumb-item active" aria-current="page">categoria  </li>
                                                    <li className="breadcrumb-item" > <Link to={`/category/$`}> {this.state.category}  </Link> </li>
                                                </ol>
                                            </nav>
                                        }
                                        <div className="dropdown d-flex" style={{ width: '17%' }}>
                                            <h3 className="toggle btn btn-primary border-0" style={{ fontSize: '20px', backgroundColor: '#ffa35f' }} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Categorias
            </h3>
                                            <div className="dropdown-menu  items" aria-labelledby="dropdownMenuButton">
                                                <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(1)}>
                                                        <i className="mr-2 fas fa-tshirt"></i>
                                                    ropas
                                                    </li>
                                                </div>
                                                <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(2)}>
                                                        <i className=" mr-2 fas fa-house-user" ></i>
                                                    casas y apartamentos
                                                </li>
                                                </div>
                                                {/* <div className="d-flex">
                                                    <li className="dropdown-item" >
                                                        <i className="mr-2 fab fa-critical-role" ></i>
                                                        garments
                                                </li>
                                                </div> */}
                                                <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(3)}>
                                                        <i className="mr-2 fas fa-car"></i>
                                                    Autos y motos
                                                </li>
                                                </div>
                                                <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(4)}>
                                                        <i className=" mr-2 fas fa-dice"></i>
                                                    juegos y video juegos
                                                </li>
                                                </div>
                                                <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(5)}>
                                                        <i className="mr-2 fas fa-volleyball-ball"></i>
                                                    sport
                                                </li>
                                                </div>
                                                <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(5)}>
                                                        <i className=" mr-2 fas fa-mobile-alt"></i>
                                                        computadoras ,celulares, etc...
                                                </li>
                                                </div>
                                                {/* <div className="d-flex">
                                                    <li className="dropdown-item" onClick={() => this.category(6)}>
                                                        <i className=" mr-2 fas fa-laptop"></i>
                                                    computer and laptops
                                                </li>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div >

                                        <hr className='solid' />

                                        <div className='d-flex justify-content-between'>
                                            {
                                                this.props.match.params.text || this.props.match.params.categoryId ? null :
                                                    <h2 className='cursive'>Publicaciones recientes</h2>
                                            }
                                            {this.props.match.params.text ? null : <div className='align-self-center'>
                                                Filtro  <select name="filter" id="" onChange={this.activeFilter}>
                                                    <option>ordenar por</option>
                                                    <option value='asc'>mas baratos</option>
                                                    <option value='desc'>mas caros</option>
                                                </select>
                                            </div>
                                            }
                                        </div>
                                        {
                                            this.props.match.params.text ?

                                                <SearchResult
                                                    addCart={this.addCart}
                                                /> :
                                                <div className='d-flex flex-wrap w-100'>
                                                    {p}
                                                </div>
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                    {this.props.match.params.text ? null : <nav className='d-flex justify-content-center pagination'>
                        <ul className="pagination pagination-sm">
                            {renderPageNumber}
                        </ul>
                    </nav>}
                </div>
            </div>
        );
    };
};
export default Body;