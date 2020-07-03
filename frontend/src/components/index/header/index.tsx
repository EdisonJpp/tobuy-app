import React from 'react';
import './css/index.css';
import Login from '../../login';
import Name from './img/tipo3.png';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Dispatch } from 'redux'
import { searchPublicationSuccess, searchPublicationFetch } from '../../../redux/actions/publications/postActions';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';


interface props extends RouteComponentProps<any> {
  search: (text: any) => void;
  dataCart: any[];
};
interface state {
  text: string;
  scroll: boolean;
};
class HeaderIndex extends React.PureComponent<props, state>{
  constructor(props: props) {
    super(props);
    this.state = {
      text: '',
      scroll: false,
    };
  };
  getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value + name);
    this.setState({
      ...this.state,
      [name]: value
    });
  };
  searching = async () => {
    if (this.state.text !== '') {
      this.props.history.push(`/search/${this.state.text}`);
      await this.props.search(this.state.text);
    } else return null;
  };
  searchToEnter = async (key: any) => {
    if (key.keyCode === 13) {
      this.props.history.push(`/search/${this.state.text}`);
      await this.props.search(this.state.text);
    } else return null;
  };
  componentDidMount = () => {
    document.addEventListener('scroll', () => {
      window.scrollY > 10 ? this.setState({ scroll: true }) : this.setState({ scroll: false });
    });
  };
  alert = () => {
    Swal.fire({
      position: 'top',
      title: '<strong> tienes que iniciar sesion,</strong>',
      icon: 'info',
      html:
        'si no tienes una cuenta <b> registrate </b>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> registarme!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        ' tengo cuenta',
      cancelButtonAriaLabel: 'Thumbs down'
    }).then(r => {
      if (r.value) {
        this.props.history.push('/createUser');
      };
    });
  };
  render() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    return (
      <div className=''>
        <header className={
          // this.state.scroll ?
          //  'scrolled  bg-light' 
          //  : 
          'header bg-light'

        } >
          <nav className="navbar navbar-expand-lg navbar-light container col-md-9 pl-0 pr-0">
            <div className="imgLogoDiv" >

              <Link to='/'>
                <div >
                  <img src='https://tobuy-com-20.herokuapp.com/logo/tipo3.png' alt="" width="100%" height='44px' className='align-self-center' />
                </div>
              </Link>


            </div>
            <div className="dropdown ml-0 d-flex mr-2">
              <button type="button" className="btn btn-dark cat dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu items dropdown-menu-center mt-1" aria-labelledby="dropdownMenuButton">
                <div className="d-flex">
                  <li className="dropdown-item">
                    <i className="far fa-question-circle mr-2"></i>
                                                   ayuda
                                                    </li>
                </div>
                <div className="d-flex">
                  <li className="dropdown-item">
                    sugerencia
                                                </li>
                </div>
                <div className="d-flex">
                  <li className="dropdown-item">
                    sobre nosotros
                                                </li>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center search" >
              <input className="form-control w-100 inputSearch border-1" name='text' onKeyUp={this.searchToEnter} onChange={this.getValue} value={this.state.text} type="text" placeholder="Qué estás buscando?" />
              <button className="btn border-0 searchBTN" onClick={this.searching}><i className="fas fa-search"></i></button>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
              <div className='d-flex '>
                {userData ? <Link to='/user'> <i className="far fa-user-circle align-self-center mr-4"></i> </Link> :
                  <div className="d-flex rigth dropdown">
                    <i className="far fa-user toggle mr-4" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" ></i>
                    <div className="dropdown-menu" id='divHeaderLogin' aria-labelledby="dropdownMenuButton">
                      <Login />
                    </div>
                  </div>}
                <div className='align-self-center '>
                  {userData ? <button onClick={() => this.props.history.push('/create-publication')} className="btn align-self-center  publicar mr-4" > vender! </button>
                    :
                    <button className="btn align-self-center publicar  mr-4" onClick={this.alert}> vender! </button>
                  }
                </div>
                <div className='d-flex align-self-center mr-1'>
                  {userData ?
                    <Link to='/your-shoppingcart'> <i className="fas fa-shopping-cart mr-4  w-100" style={{ fontSize: '30px', color: '#3333' }} > <sup className='badge badge-warning border ' style={{ fontSize: '15px', color: 'white', background: "#a5ebff" }} > {this.props.dataCart ? this.props.dataCart.length : 0}  </sup> </i>  </Link>
                    :
                    <i className="fas fa-blog  blog mr-4" >blog</i>
                  }
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  search: async (text: any) => {
    await dispatch(searchPublicationFetch());
    dispatch(await searchPublicationSuccess(text))
  },
});
const mapStateToProps = (state: any) => {
  return {
    dataCart: state.shoppingCart.data,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderIndex);