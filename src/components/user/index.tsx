import { connect } from 'react-redux';
import { Dispatch } from 'redux' ;
import { withRouter } from 'react-router-dom'
import Perfil from './perfil/perfil';
import {myPublications_fetch ,myPublications_success ,deletePost_fetch ,deletePost_success } from '../../redux/actions/publications/postActions';
import {  editUserFetch , editUserSuccess} from "../../redux/actions/users/userActions";
const mapStateToProps = (state : any) =>{
    return{
        myPublications : state.myPublications.data,
        screenLoading  : state.myPublications.loading ,
        screenLoadingDelete : state.deletePost.loading,
        deleteSucces : state.deletePost.data, 
    };
};
const mapDispatchToProps = ( dispatch: Dispatch)=>{
    return{
        myPublicationF :  async(users_id : number ) =>{
            await dispatch(myPublications_fetch());
            dispatch(await myPublications_success(users_id));
        },
        deleteMyPost : async ( id : number )=>{
            await dispatch(deletePost_fetch());
            dispatch(await deletePost_success(id));
        },
        editUserFunction : async( user : any) =>{
            await dispatch(editUserFetch());
            dispatch(await editUserSuccess(user));
        },
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Perfil));


