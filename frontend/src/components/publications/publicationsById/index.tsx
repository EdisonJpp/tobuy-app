// import customAxios from '../../../config/axios';
import { connect } from 'react-redux';
import BPublicationById from './publicationById';
import { Dispatch } from 'redux';
import { withRouter  } from 'react-router-dom'
import { publicationById_success, publicationById_fetch ,postByCategory_fetch, postByCategory_success } from '../../../redux/actions/publications/postActions';

      
const mapStateToProps =  (state: any) => {
    return {
        screenLoading : state.publicationsById.loading ,
        publicationById: state.publicationsById.data,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => ({
    findById: async (id : number) => {
        await dispatch(publicationById_fetch());
        dispatch(await publicationById_success(id));
    },
    getPostBycategory: async (categoryId: number) => {
        await dispatch(postByCategory_fetch());
        dispatch(await postByCategory_success(categoryId));
    },
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BPublicationById));