import React, { useEffect } from 'react';
import Header from '../index/header/index';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom'
import Footer from '../index/footer';
import './css/css.css';
interface props extends RouteComponentProps<any> {
    postOfCart: any[];
    screenLoading: boolean;
    error: any[];
    deleteCorrecty: any; 
    getPost: (userId: number) => void;
    deleteCart : (id : number) => void ;
};
const ShoppingCart: React.SFC<props> = (props: props) => {
    const HeaderIndex = withRouter(Header);
    useEffect(() => {
        const getposst = async () => {
            const userData = await JSON.parse(localStorage.getItem('userData')!);
            const id = userData.user.id;
            await props.getPost(id);
        };
        getposst();
    }, [props.deleteCorrecty]);
    const deleteCart = async(id : number )=>{
        await props.deleteCart(id);
        props.history.push('/your-shoppingcart');
    };
    const postOfCart = props.postOfCart === undefined ? [] :props.postOfCart;
    const posty = postOfCart ; 
    const carrito = postOfCart.length ;
    const p = posty.map((p: any, i: number) => {
        const images = p.publication.image_name.split(',');
        return (
            <div className="card mt-2 w-100 SHOPPING " key={i}>
                <div className="card-body d-flex flex-wrap">
                    <img src={`https://tobuy-com-20.herokuapp.com/uploads/${images[0]}`} alt="..." className="img col-12 col-md-4" title='agregar al carrito de compras' height='200px' width='250px'/>
                    <div className="data mt-1 ml-4">
                    <h3 className="card-text"> ${p.publication.price} </h3>
                    <h3 className="card-text"> {p.publication.title} </h3>
                    <Link to={`/publications/${p.publication.id}` } > <button  className="btn btn-primary">ir a la publicacion</button> </Link>
                    <button className='btn btn-danger' onClick={()=> deleteCart(p.id)}> delete </button>
                    </div>
                </div>
            </div>
        );
    });
    return (
        <div className='d-flex flex-column justify-content-between' style={{ height: '100vh' }}>
            <HeaderIndex />
            <div style={{  }} className="container col-md-9 col-12">
                <h2 className='mb-2 cursive'> publicaciones agregadas {carrito}  </h2>
                <div className='mt-4 mb-4' >
                    {p}
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default ShoppingCart;