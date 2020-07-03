import React, { useState, useEffect } from 'react';
import '../css/index.css'
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import Header from '../../index/header'
import Footer from '../../index/footer';
import Swal from 'sweetalert2';
import './css/css.css';
import Loader from '../../loader';
import EditUser from '../editUser';
import EditPassword from '../editpassword/editPassword';
import { Zoom } from 'react-slideshow-image';

interface props extends RouteComponentProps<any> {
    myPublicationF: (users_id: number) => void;
    deleteMyPost: (id: number) => void;
    myPublications: any;
    screenLoading: boolean;
    screenLoadingDelete: boolean;
    editUserFunction: (user: any) => void;
    deleteSucces: any;
};

const User: React.FC<props> = (props: props) => {
    const [user, userF]: any = useState({
        users_id: 0
    });
    useEffect(() => {
        const getPost = async () => {
            const userData = JSON.parse(localStorage.getItem('userData')!);
            const users_id = userData.user.id;
            userF({
                ...user,
                users_id: users_id,
            });
            await props.myPublicationF(users_id);
        };
        getPost();
    }, [props.screenLoadingDelete]);
    const logout = () => {
        localStorage.removeItem('userData');
        props.history.push('/');
    };
    const deletePost = (id: number) => {
        Swal.fire({
            title: 'quieres eliminar tu anuncio?',
            text: "no hay vuelta atras!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ffa35f',
            cancelButtonColor: '#6b747d',
            confirmButtonText: 'sí, eliminar!'
        }).then(async (result) => {
            if (result.value) {
                Swal.fire(
                    'eliminado correctamente!',
                    'tu publicacion ha sido eliminada.',
                    'success'
                );
                await props.deleteMyPost(id);
                const userData = JSON.parse(localStorage.getItem('userData')!);
                const users_id = userData.user.id;
                props.history.push('/user');
                await props.myPublicationF(users_id);
            };
        });
    };
    const mypublications = props.myPublications === undefined ? {} : props.myPublications;
    const { publications, name, lastname, phonenumber, gender, username, id }: any = mypublications;
    // const image = publications && publications.map(( p : any  , i : number ) => p.image_name.split(',') );

    const zoomOutProperties = {
        duration: 9000,
        transitionDuration: 100,
        infinite: true,
        indicators: true,
        scale: 0.4,
        arrows: true
    };
    const HeaderIndex = withRouter(Header);
    return (
        <div className='d-flex flex-column justify-content-between' style={{ height: '100vh' }} >
            <HeaderIndex />
            <div className="body container col-md-9 mt-4" >
                {
                    props.match.params.edit ?
                        <EditUser
                            editUserFunction={props.editUserFunction}
                            username={username}
                            name={name}
                            lastname={lastname}
                            phonenumber={phonenumber}
                            gender={gender}
                            id={id}
                            myPublicationF={props.myPublicationF}
                        />
                        :
                        props.match.params.editP ? <EditPassword editUserFunction={props.editUserFunction} /> :
                            props.screenLoading ? <Loader /> :
                                <div className="user ">
                                    <div className="card">
                                        <div className="card-header">
                                            Configuración
</div>
                                        <div className="card-body d-flex justify-content-between">

                                            {/* <img src={`https://tobuy-com-20.herokuapp.com/profile/${profilePicture}`} alt="profile" width='100px' height='80px'/> */}
                                            <div>
                                                <h5 className="card-title"> {name + ' ' + lastname}     </h5>
                                                <Link to={`/user/password/${id}`}>Cambiar contraseña</Link>
                                            </div>
                                            <div className='d-flex flex-column w-50 align-items-end'>
                                                <button className='btn btn-secondary w-50' onClick={() => props.history.push(`/user/${'edit'}`)}> editar</button>
                                                <button className=' btn btn-secondary w-50 mt-2' onClick={logout}> Cerrar Sesión </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                }
                <br />
                <br />
                {props.screenLoadingDelete && <Loader />}
                <div className="d-flex justify-content-between ">
                    <h3>Mis Publicaciones</h3>
                    {
                        props.match.params.delete ? <button className="btn btn-danger" onClick={() => props.history.push(`/user`)} > cancelar</button>
                            :
                            <button className="btn btn-secondary" onClick={() => props.history.push(`/user/delete/post`)} >Eliminar publicación</button>
                    }
                </div>
                <div className="d-flex flex-wrap ">
                    {
                        publications && publications.map((p: any, i: number) => {
                            //  const image_name: any[]  =  p.image_name && p.image_name.split(',');
                            return (
                                <div className="card p col-md-3 col-sm-6  col-6  " id='publication' key={i}>
                                    <div className="card-body flex-column">
                                        {
                                            props.match.params.delete && <i className="far fa-trash-alt color-danger deletePost" onClick={() => deletePost(p.id)}></i>
                                        }
                                        <div className="slide-container  w-100 h-100" >

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
                                            {/* <Link to={`/publications/${p.id}`}>  <img key={i} className='img  img-fluid' alt='recentPublications' src={`http://localhost:5000/uploads/${p.image_name[0]}`} />  </Link> */}
                                            <h4 className='text-truncate'> Precio: ${p.price} </h4>
                                            <h5 className='text-truncate'>  {p.title}  </h5>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default User; 