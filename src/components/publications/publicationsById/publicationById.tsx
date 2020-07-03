import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import Loader from '../../loader';
import Header from '../../index/header'
import './css/index.css';
import Footer from '../../index/footer';
interface props extends RouteComponentProps<any> {
    publicationById: any;
    screenLoading: boolean;
    findById: (id: number) => void;
    searching: (text: any) => void;
    getPostBycategory : (id : number)=> void ;

};
const BPublicationById: React.FC<props> = (props: props) => {
    useEffect(() => {
        const data = async () => {
            await props.findById(props.match.params.id);
        };
        data();
    }, []);
    const HeaderIndex = withRouter(Header);
    let { title, description, image_name, wasPublishedAt, price, user, categories, condition, categoryId } = props.publicationById === undefined ? [] : props.publicationById;
    const userData = user ? user : {};
    const category = categories ? categories : {};
    let { name, phonenumber } = userData;
    let { categorie_name } = category;
    {
        if (props.screenLoading) {
            return (
                <Loader />
            );
        } else {
            return (
                <div className='findByIdP'>
                    <HeaderIndex />
                    <div className=' ' >
                        <div className="container col-12 col-md-9 w-100">
                            <nav aria-label="breadcrumb container ">
                                <ol className="breadcrumb bg-light">
                                    <li className="breadcrumb-item"><Link to='/'>inicio</Link></li>
                                    <li className="breadcrumb-item" onClick={ ()=> props.getPostBycategory(categoryId)}> <Link to={`/category/${categoryId}`}> {categorie_name} </Link> </li>
                                    <li className="breadcrumb-item active" aria-current="page"> {title} </li>
                                </ol>
                            </nav>

                        </div>
                        <div className="d-flex flex-wrap w-100 container col-md-9 " style={{}}>

                            <div id="carouselExampleIndicators" className="carousel slide col-12 col-md-6 " data-ride="carousel">

                                <div className="carousel-inner">
                                    {
                                        image_name === undefined ? null : image_name.map((each: any, index: number) => {
                                            return (
                                                <div key={index} className={index === 0 ? `carousel-item active ` : 'carousel-item'}>
                                                    <div className="w-100 d-flex justify-content-center">
                                                        <img className='imgById' alt='recentPublications' src={`https://tobuy-com-20.herokuapp.com/uploads/${each}`} />
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>

                                <div className="  indicador col-md-10 flex-nowrap">
                                    <ol className="indicators d-flex">
                                        {
                                            image_name === undefined ? null : image_name.map((e: any, i: number) => {
                                                console.log(e);
                                                return (

                                                    <div data-target="#carouselExampleIndicators" key={i} className={'active   '} style={{ position: 'relative', marginLeft: '25%' }}>
                                                        <img src={`https://tobuy-com-20.herokuapp.com/uploads/${e}`} data-target="#carouselExampleIndicators" data-slide-to={i} className={' findIdSub  '} alt="findbyId" style={{ 'position': 'absolute', 'right': '204px' }} width='70px' height='50px' />
                                                    </div>
                                                );
                                            })
                                        }
                                    </ol>
                                </div>
                                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon bg-dark  indicator" aria-hidden="true"></span>
                                    <span className="sr-only ">Previous</span>
                                </a>
                                <a className="carousel-control-next  " href="#carouselExampleIndicators " role="button" data-slide="next">
                                    <span className="carousel-control-next-icon bg-dark indicator" aria-hidden="true"></span>
                                    <span className="sr-only text-danger">next</span>
                                </a>
                            </div>
                            <div className="detallteRight ml-4 d-flex flex-column col-9 col-md-3">
                                <h3 className='mt-3'> ${price} </h3>
                                <div className='d-flex flex-column'>
                                    <h4> {title} </h4>
                                </div>
                                <hr className='w-100 text-dark' />
                                <div className='publicationData'>
                                    <h6 className='mb-2'>Condicion:  {condition} </h6>
                                    <h6 className='mb-2'>Se publico: {wasPublishedAt} </h6>
                                    <h6 className=''> categoria: {categorie_name}</h6>
                                </div>
                                <hr className='w-100 text-dark' />
                                <div className="userData">
                                    <div className='d-flex '>
                                        <i className="fas fa-people-carry w-50" style={{ fontSize: '60px', color: '#3333' }}></i>
                                        <div className='w-50'>
                                            <h3> {name} </h3>
                                            <p>
                                                1+{phonenumber} </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="description  container col-md-9 col-12 ">
                            <h3> Descripcion</h3>
                            <div>
                                {description}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            );
        };
    };
};
export default BPublicationById;