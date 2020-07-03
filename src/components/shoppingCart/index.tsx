import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ShoppingCart from './shoppingCart';
import { getShoppingCart_fetch, getShoppingCart_success, deleteShoppingCart_fetch, deleteShoppingCart_success } from '../../redux/actions/shoppingCart/shoppingCartActions'

const mapStateToProps = (state: any) => {
    return {
        postOfCart: state.shoppingCart.data,
        screeLoading: state.shoppingCart.loading,
        error: state.shoppingCart.error,
        deleteCorrecty: state.deleteCart.data,
    };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getPost: async (userId: number) => {
            await dispatch(getShoppingCart_fetch());
            dispatch(await getShoppingCart_success(userId));
        },
        deleteCart: async (id: number) => {
            await dispatch(deleteShoppingCart_fetch());
            dispatch(await deleteShoppingCart_success(id));
        },
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShoppingCart));